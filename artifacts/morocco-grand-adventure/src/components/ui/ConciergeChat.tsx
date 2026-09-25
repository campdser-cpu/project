// ─────────────────────────────────────────────────────────────────────────────
// Concierge Chat — the real Morocco Grand Adventure travel concierge.
//
// This replaces the old AIAssistant.tsx, which was a client-side keyword
// matcher with five hardcoded canned replies (not an AI, and it said so
// nowhere). Every reply here comes from POST /api/concierge, which answers
// only from concierge-knowledge.json — a generated snapshot of the tour
// catalog's own canonical data (see scripts/build-concierge-knowledge.ts).
//
// The client never renders anything the server didn't already validate:
// tourIds are checked against the real tours array before a "View tour" chip
// is shown, and the WhatsApp handoff always uses this site's own contactInfo,
// never a value echoed back from the API response.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { MessageSquare, X, Send, User, Bot, ArrowRight } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { useLanguage } from '@/contexts/LanguageContext';
import { tours } from '@/data/content';
import { waPromoLink } from '@/lib/promo';
import { trackEvent } from '@/lib/analytics';

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env.VITE_API_URL) || '/api';
const TOUR_NAME_BY_ID = new Map(tours.map((t) => [t.id, t.name]));

type ConciergeState = 'known' | 'contact_required' | 'not_supported';

type Message = {
  id: string;
  type: 'user' | 'bot';
  text: string;
  state?: ConciergeState;
  tourIds?: string[];
  suggestWhatsapp?: boolean;
};

export function ConciergeChat() {
  const { t, lang } = useLanguage();

  const QUICK_REPLIES = [t('ai_quick_plan'), t('ai_quick_sahara'), t('ai_quick_honeymoon'), t('ai_quick_family')];

  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [{ id: '1', type: 'bot', text: t('ai_greeting') }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const openChat = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && !hasOpened) {
        setHasOpened(true);
        trackEvent('concierge_open');
      }
      return next;
    });
  };

  const whatsappHref = (context: string) =>
    waPromoLink(`Hello Morocco Grand Adventure, I was chatting with your concierge about: "${context}". Could you help me with the details?`);

  async function handleSend(text: string) {
    const question = text.trim();
    if (!question || isTyping) return;

    const userMsg: Message = { id: `${Date.now()}-u`, type: 'user', text: question };
    const history = messages
      .filter((m) => m.id !== '1')
      .slice(-8)
      .map((m) => ({ role: m.type === 'user' ? ('user' as const) : ('assistant' as const), content: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    trackEvent('concierge_question');

    try {
      const res = await fetch(`${API_BASE}/concierge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, lang, history }),
      });
      const data = await res.json().catch(() => null);

      if (data && typeof data.answer === 'string') {
        const state: ConciergeState = ['known', 'contact_required', 'not_supported'].includes(data.state) ? data.state : 'contact_required';
        const tourIds: string[] = Array.isArray(data.tourIds) ? data.tourIds.filter((id: unknown) => typeof id === 'string' && TOUR_NAME_BY_ID.has(id)) : [];
        setMessages((prev) => [
          ...prev,
          { id: `${Date.now()}-b`, type: 'bot', text: data.answer, state, tourIds, suggestWhatsapp: Boolean(data.suggestWhatsapp) },
        ]);
        trackEvent('concierge_answer', { state, tour_count: tourIds.length });
      } else {
        throw new Error('malformed response');
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-b`, type: 'bot', text: t('ai_resp_default'), state: 'contact_required', suggestWhatsapp: true },
      ]);
      trackEvent('concierge_error');
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <>
      {/* Floating Button — hidden below lg: it would sit directly over
          StickyBookingCTA's own bottom-bar buttons at the same bottom-6
          offset on phones, and that bar already covers WhatsApp/call/booking. */}
      <div className="fixed bottom-6 left-6 z-50 hidden lg:block">
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
          onClick={openChat}
          className="w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:bg-primary/90 transition-colors"
          aria-label={t('ai_open')}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-7 h-7" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MessageSquare className="w-7 h-7" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-28 left-6 z-50 w-[calc(100vw-3rem)] sm:w-96 bg-background border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: '70vh' }}
          >
            <div className="bg-primary p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-primary-foreground text-sm">{t('ai_title')}</p>
                <p className="text-primary-foreground/70 text-xs">{t('ai_subtitle')}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div className={`flex gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'bot' ? 'bg-primary/10' : 'bg-muted'}`}>
                      {msg.type === 'bot' ? <Bot className="w-4 h-4 text-primary" aria-hidden="true" /> : <User className="w-4 h-4 text-muted-foreground" aria-hidden="true" />}
                    </div>
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.type === 'bot' ? 'bg-muted text-foreground rounded-tl-none' : 'bg-primary text-primary-foreground rounded-tr-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  {msg.type === 'bot' && (msg.tourIds?.length || msg.suggestWhatsapp) && (
                    <div className="mt-2 ml-9 flex flex-wrap gap-2">
                      {msg.tourIds?.map((id) => (
                        <Link
                          key={id}
                          href={`/tours/${id}`}
                          onClick={() => trackEvent('concierge_tour_click', { tour: id })}
                          className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-foreground hover:border-primary transition-colors"
                        >
                          {TOUR_NAME_BY_ID.get(id)} <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </Link>
                      ))}
                      {msg.suggestWhatsapp && (
                        <a
                          href={whatsappHref([...messages].reverse().find((m) => m.type === 'user' && messages.indexOf(m) < messages.indexOf(msg))?.text ?? msg.text)}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => trackEvent('concierge_whatsapp_click')}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-bold text-[#0d2b1d] hover:bg-[#128C7E] transition-colors"
                        >
                          <SiWhatsapp className="h-3.5 w-3.5" aria-hidden="true" /> {t('wa_book_now')}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" aria-hidden="true" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex gap-2 flex-wrap">
                {QUICK_REPLIES.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(reply)}
                    className="text-xs bg-muted text-foreground px-3 py-1.5 rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="p-4 pt-2 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('ai_placeholder')}
                disabled={isTyping}
                className="flex-1 bg-muted text-foreground placeholder-muted-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0 disabled:opacity-50"
                aria-label={t('ai_send')}
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
