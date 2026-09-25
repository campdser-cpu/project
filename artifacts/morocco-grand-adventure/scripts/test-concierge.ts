// Deterministic tests for the concierge endpoint's request handling, the
// hardening invariants added in this pass, and the generated knowledge
// file's structural integrity — everything that does NOT require a live
// Anthropic API call, which no credentials exist for in this environment.
// The "not configured" and "model not allowed" fallback paths are exercised
// directly (no mocking needed — both short-circuit before any network call),
// and the timeout path is exercised with a mocked fetch that never resolves
// on its own, so the abort behavior is verified for real, not just asserted
// to exist in the code.
import assert from 'node:assert/strict';
import { handleConcierge, sanitizeHistory, resolveModel, enforceStateInvariants, RESPOND_TOOL } from '../../../api/concierge';
import { tours } from '../src/data/content';
import knowledge from '../../../api/concierge-knowledge.json';

function req(body: unknown, init: Partial<{ method: string; headers: Record<string, string> }> = {}): Request {
  const payload = body === undefined ? undefined : JSON.stringify(body);
  return new Request('http://localhost/api/concierge', {
    method: init.method ?? 'POST',
    headers: { 'Content-Type': 'application/json', origin: 'http://localhost', host: 'localhost', ...init.headers },
    body: payload,
  });
}

// ── sanitizeHistory ──────────────────────────────────────────────────────────
assert.deepEqual(sanitizeHistory(undefined), []);
assert.deepEqual(sanitizeHistory('not an array'), []);
assert.deepEqual(sanitizeHistory([{ role: 'user', content: 'hi' }]), [{ role: 'user', content: 'hi' }]);
assert.deepEqual(sanitizeHistory([{ role: 'system', content: 'x' }]), [], 'drops unknown roles');
assert.deepEqual(sanitizeHistory([{ role: 'user', content: 42 }]), [], 'drops non-string content');
{
  const long = Array.from({ length: 20 }, (_, i) => ({ role: 'user' as const, content: `msg ${i}` }));
  const out = sanitizeHistory(long);
  assert.equal(out.length, 8, 'caps history to the last 8 turns');
  assert.equal(out[0].content, 'msg 12');
}
{
  const overlong = [{ role: 'user' as const, content: 'x'.repeat(5000) }];
  assert.equal(sanitizeHistory(overlong)[0].content.length, 1000, 'caps each message length');
}

// ── Tool strictness (structural — the actual schema sent to Anthropic) ──────
assert.equal(RESPOND_TOOL.strict, true, 'strict mode must stay enabled on the forced tool');
assert.equal(RESPOND_TOOL.input_schema.additionalProperties, false);
assert.deepEqual([...RESPOND_TOOL.input_schema.required].sort(), ['answer', 'state', 'suggest_whatsapp', 'tour_ids']);

// ── resolveModel — the allowlist guard ───────────────────────────────────────
assert.equal(resolveModel(undefined), 'claude-sonnet-5', 'default must stay claude-sonnet-5');
assert.equal(resolveModel('claude-opus-5'), 'claude-opus-5');
assert.equal(resolveModel('claude-sonnet-4-6'), 'claude-sonnet-4-6');
assert.equal(resolveModel('claude-haiku-4-5'), 'claude-haiku-4-5');
assert.equal(resolveModel('claude-fable-5-1'), null, 'Fable 5.1 rejects forced tool_choice with a 400 — must never be allowed through');
assert.equal(resolveModel('claude-mythos-5-1'), null);
assert.equal(resolveModel('claude-fable-5'), null, 'not verified against this request shape — conservatively excluded');
assert.equal(resolveModel('gpt-4'), null, 'unrecognized model must fail safe, never attempt a request');

// ── enforceStateInvariants — the mechanical price-hallucination guard ───────
const IMPERIAL_ID = '7-day-imperial-cities-sahara-escape';
assert.equal(enforceStateInvariants('Two people pay €805 per person.', 'known', [IMPERIAL_ID]), 'known', 'a real published figure must survive');
assert.equal(enforceStateInvariants('Two people pay 805 EUR per person.', 'known', [IMPERIAL_ID]), 'known', 'EUR-suffix form must also match');
assert.equal(enforceStateInvariants('Two people pay €999 per person.', 'known', [IMPERIAL_ID]), 'contact_required', 'a figure that matches no real price must be downgraded, not passed through as certain');
assert.equal(enforceStateInvariants('Yes, the camel trek is included.', 'known', [IMPERIAL_ID]), 'known', 'answers with no price mentioned at all must be untouched');
assert.equal(enforceStateInvariants('It is about 250 km of driving.', 'known', [IMPERIAL_ID]), 'known', 'a bare distance number must never false-trigger the price guard');
assert.equal(enforceStateInvariants('Two people pay €999.', 'contact_required', [IMPERIAL_ID]), 'contact_required', 'already-downgraded states are left alone');
assert.equal(enforceStateInvariants('Solo travelers pay €1135.', 'known', [IMPERIAL_ID]), 'known', 'the solo price must also count as a real figure');

// ── handleConcierge — request handling (no API key configured here) ─────────
const optionsRes = await handleConcierge(req(undefined, { method: 'OPTIONS' }));
assert.equal(optionsRes.status, 204);
assert.equal(optionsRes.headers.get('Access-Control-Allow-Origin'), 'http://localhost');

const getRes = await handleConcierge(req(undefined, { method: 'GET' }));
assert.equal(getRes.status, 405);

const emptyRes = await handleConcierge(req({ message: '   ' }));
assert.equal(emptyRes.status, 400);

const hugeMessage = { message: 'x'.repeat(50_000) };
const hugeRes = await handleConcierge(req(hugeMessage, { headers: { 'content-length': String(JSON.stringify(hugeMessage).length) } }));
assert.equal(hugeRes.status, 413);

// No ANTHROPIC_API_KEY in this environment → the graceful "not configured"
// fallback must fire, never a crash and never a raw error to the client.
delete process.env.ANTHROPIC_API_KEY;
const notConfigured = await handleConcierge(req({ message: 'Does the 3-day Marrakech tour include lunch?' }));
assert.equal(notConfigured.status, 503);
const notConfiguredBody = await notConfigured.json();
assert.equal(notConfiguredBody.success, false);
assert.equal(notConfiguredBody.state, 'contact_required');
assert.equal(notConfiguredBody.suggestWhatsapp, true);
assert.ok(typeof notConfiguredBody.answer === 'string' && notConfiguredBody.answer.length > 0);
assert.ok(!('contact' in notConfiguredBody), 'the unused contact field must be removed from the response entirely');
// Never leak internals in the fallback.
assert.ok(!JSON.stringify(notConfiguredBody).match(/api[_-]?key/i));

// ── Model guard fires before any network attempt (no fetch mock needed —
// if this reached fetch() with a fake key, it would hang or error 502, not
// come back as a clean 503 as asserted below) ────────────────────────────
{
  process.env.ANTHROPIC_API_KEY = 'test-key-not-real';
  process.env.ANTHROPIC_MODEL = 'claude-fable-5-1';
  const res = await handleConcierge(req({ message: 'test' }));
  delete process.env.ANTHROPIC_MODEL;
  delete process.env.ANTHROPIC_API_KEY;
  assert.equal(res.status, 503, 'a disallowed model must be refused before any request is sent');
  const body = await res.json();
  assert.equal(body.state, 'contact_required');
  assert.ok(!('contact' in body));
}

// ── Timeout protection — real abort behavior, not just code inspection.
// Mocks fetch to hang forever except when the AbortSignal fires, exactly like
// a genuinely slow upstream would once aborted, and uses a 50ms override so
// the test runs in well under a second instead of the real 25s default. ────
{
  process.env.ANTHROPIC_API_KEY = 'test-key-not-real';
  process.env.ANTHROPIC_TIMEOUT_MS = '50';
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: RequestInfo | URL, init?: RequestInit) =>
    new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => {
        const err = new Error('This operation was aborted');
        err.name = 'AbortError';
        reject(err);
      });
    })) as typeof fetch;

  const start = Date.now();
  const res = await handleConcierge(req({ message: 'How much driving is the 3-day Marrakech tour?' }));
  const elapsed = Date.now() - start;

  globalThis.fetch = originalFetch;
  delete process.env.ANTHROPIC_TIMEOUT_MS;
  delete process.env.ANTHROPIC_API_KEY;

  assert.equal(res.status, 504, 'a timed-out upstream call must surface as a clean, bounded fallback status, not hang indefinitely');
  assert.ok(elapsed < 2000, `must abort near the configured 50ms override, not the real 25s production default (took ${elapsed}ms)`);
  const body = await res.json();
  assert.equal(body.success, false);
  assert.equal(body.state, 'contact_required');
  assert.ok(!('contact' in body));
  assert.ok(!JSON.stringify(body).match(/AbortError|aborted|timeout/i), 'raw timeout/error detail must never reach the client, only the server log');
}

// ── concierge-knowledge.json — structural integrity vs. canonical data ──────
assert.equal(knowledge.tours.length, tours.length, 'knowledge file is stale — regenerate with scripts/build-concierge-knowledge.ts');
const knowledgeIds = new Set(knowledge.tours.map((t) => t.id));
for (const t of tours) assert.ok(knowledgeIds.has(t.id), `knowledge file is missing tour ${t.id}`);

const imperial = knowledge.tours.find((t) => t.id === IMPERIAL_ID);
assert.ok(imperial);
assert.equal(imperial!.nights, 6);
assert.equal(imperial!.meals.length, 6, '3 Days/2 Nights style duration must never leak an extra meal night');
assert.deepEqual(
  imperial!.meals.map((m) => m.dinner),
  ['included', 'included', 'included', 'unspecified', 'unspecified', 'unspecified'],
);
assert.equal(imperial!.pricing.published, true);
if (imperial!.pricing.published) assert.equal(imperial!.pricing.perPersonByPartySize['2'], 805);

const sahara3 = knowledge.tours.find((t) => t.id === '3-day-sahara-marrakech');
assert.ok(sahara3);
assert.equal(sahara3!.meals.length, 2, 'a 3-day/2-night tour must have exactly two meal nights, never three');
assert.ok(sahara3!.notIncluded.length > 0, 'the flagship tour’s exclusions must be present, not silently empty');

console.log(`Concierge regression: PASS (request handling + hardening invariants + knowledge integrity, ${knowledge.tours.length} tours)`);
