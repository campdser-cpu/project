import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type Message = {
  id: string;
  type: 'user' | 'bot';
  text: string;
};

export function AIAssistant() {
  const { t } = useLanguage();

  const QUICK_REPLIES = [
    t('ai_quick_plan'),
    t('ai_quick_sahara'),
    t('ai_quick_honeymoon'),
    t('ai_quick_family')
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: '1', type: 'bot', text: t('ai_greeting') }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // AI response based on keywords
    setTimeout(() => {
      const lower = text.toLowerCase();
      let responseText: string;

      if (lower.includes('7') || lower.includes('seven') || lower.includes('week')) {
        responseText = t('ai_resp_7day');
      } else if (lower.includes('sahara') || lower.includes('desert') || lower.includes('best time')) {
        responseText = t('ai_resp_sahara_time');
      } else if (lower.includes('honey') || lower.includes('romance') || lower.includes('wedding') || lower.includes('couple')) {
        responseText = t('ai_resp_honeymoon');
      } else if (lower.includes('famil') || lower.includes('child') || lower.includes('kid')) {
        responseText = t('ai_resp_family');
      } else {
        // Check quick reply matches
        const quick7 = t('ai_quick_plan').toLowerCase();
        const quickSahara = t('ai_quick_sahara').toLowerCase();
        const quickHoney = t('ai_quick_honeymoon').toLowerCase();
        const quickFamily = t('ai_quick_family').toLowerCase();

        if (lower.includes(quick7) || text === t('ai_quick_plan')) {
          responseText = t('ai_resp_7day');
        } else if (lower.includes(quickSahara) || text === t('ai_quick_sahara')) {
          responseText = t('ai_resp_sahara_time');
        } else if (lower.includes(quickHoney) || text === t('ai_quick_honeymoon')) {
          responseText = t('ai_resp_honeymoon');
        } else if (lower.includes(quickFamily) || text === t('ai_quick_family')) {
          responseText = t('ai_resp_family');
        } else {
          responseText = t('ai_resp_default');
        }
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'bot', text: responseText }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
          onClick={() => setIsOpen(prev => !prev)}
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

      {/* Chat Panel */}
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
            {/* Header */}
            <div className="bg-primary p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-bold text-primary-foreground text-sm">{t('ai_title')}</p>
                <p className="text-primary-foreground/70 text-xs">{t('ai_subtitle')}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'bot' ? 'bg-primary/10' : 'bg-muted'}`}>
                    {msg.type === 'bot' ? <Bot className="w-4 h-4 text-primary" /> : <User className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.type === 'bot'
                      ? 'bg-muted text-foreground rounded-tl-none'
                      : 'bg-primary text-primary-foreground rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    {[0, 1, 2].map(i => (
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

            {/* Quick Replies */}
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

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
              className="p-4 pt-2 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('ai_placeholder')}
                className="flex-1 bg-muted text-foreground placeholder-muted-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0"
                aria-label={t('ai_send')}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
