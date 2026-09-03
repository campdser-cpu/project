import assert from 'node:assert/strict';
import handler, { validateInquiry } from '../../../api/inquiry';

const valid = {
  firstName: 'Test Traveler',
  lastName: 'Example',
  email: 'traveler@example.com',
  phone: '+212 699 846 818',
  travelDates: '2026-10-10',
  travelers: '2',
  destinations: 'Marrakech and Merzouga',
  tourInterest: '3-day Sahara tour',
  accommodation: 'Private room',
  message: 'Controlled validation test',
};

const good = validateInquiry(valid);
assert.equal(good.ok, true);
if (good.ok) assert.equal(good.data.email, valid.email);

const badEmail = validateInquiry({ ...valid, email: 'not-an-email' });
assert.equal(badEmail.ok, false);

const badPhone = validateInquiry({ ...valid, phone: 'abc' });
assert.equal(badPhone.ok, false);

const tooLong = validateInquiry({ ...valid, message: 'x'.repeat(2001) });
assert.equal(tooLong.ok, false);

const options = await handler.fetch(new Request('https://example.test/api/inquiry', { method: 'OPTIONS' }));
assert.equal(options.status, 204);

const get = await handler.fetch(new Request('https://example.test/api/inquiry', { method: 'GET' }));
assert.equal(get.status, 405);

const malformed = await handler.fetch(new Request('https://example.test/api/inquiry', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: '{bad',
}));
assert.equal(malformed.status, 400);

const invalid = await handler.fetch(new Request('https://example.test/api/inquiry', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ ...valid, email: 'bad' }),
}));
assert.equal(invalid.status, 400);

const honeypot = await handler.fetch(new Request('https://example.test/api/inquiry', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ ...valid, website: 'spam-bot' }),
}));
assert.equal(honeypot.status, 400);

console.log('Inquiry deterministic tests: PASS');
