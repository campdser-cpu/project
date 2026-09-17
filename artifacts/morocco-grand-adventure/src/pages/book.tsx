import { FormEvent, useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, Mail, MessageCircle, ShieldCheck, Users } from 'lucide-react';
import { useLocation } from 'wouter';
import { Layout } from '../components/layout/Layout';
import { contactInfo } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { BOOK_COPY } from '@/data/book-copy';


export default function Book() {
  const { lang } = useLanguage();
  const [, navigate] = useLocation();
  const c = BOOK_COPY[lang] ?? BOOK_COPY.en;
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const initialTrip = params.get('tour') || params.get('experience') || '';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [trip, setTrip] = useState(initialTrip);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const whatsappHref = useMemo(() => {
    const text = [
      'Booking request — Book Now, Pay Later',
      `Name: ${name || 'Not provided'}`,
      `Email: ${email || 'Not provided'}`,
      `Phone: ${phone || 'Not provided'}`,
      `Date: ${date || 'Flexible'}`,
      `Travelers: ${travelers}`,
      `Tour / experience: ${trip || 'To be discussed'}`,
      `Message: ${message || 'None'}`,
    ].join('\n');
    return `${contactInfo.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [name, email, phone, date, travelers, trip, message]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: name.trim().split(/\s+/)[0],
          lastName: name.trim().split(/\s+/).slice(1).join(' '),
          email: email.trim(),
          phone: phone.trim(),
          travelDates: date,
          travelers: String(travelers),
          destinations: '',
          tourInterest: trip,
          accommodation: '',
          message: `BOOK NOW — PAY LATER\n\n${message.trim()}`,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) throw new Error(data.error || 'Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return <Layout><main dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-background pt-32 pb-24"><div className="container mx-auto max-w-2xl px-4"><div className="bg-card border border-border rounded-[2rem] shadow-xl p-8 md:p-12 text-center"><CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6"/><h1 className="font-serif text-4xl md:text-5xl text-foreground mb-5">{c.successTitle}</h1><p className="text-muted-foreground text-lg leading-relaxed mb-8">{c.successText}</p><div className="flex flex-col sm:flex-row gap-3 justify-center"><a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 font-bold text-[#0d2b1d]"><MessageCircle className="w-5 h-5"/>{c.successWhatsapp}</a><button onClick={() => navigate('/')} className="rounded-xl border-2 border-foreground px-6 py-4 font-bold text-foreground">Home</button></div></div></div></main></Layout>;
  }

  return <Layout><main dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-background pt-32 pb-24"><div className="container mx-auto max-w-5xl px-4"><header className="text-center mb-12"><span className="text-primary text-sm font-bold tracking-[0.2em] uppercase">{c.badge}</span><h1 className="mt-4 font-serif text-4xl md:text-6xl text-foreground">{c.title}</h1><p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{c.subtitle}</p><p className="mt-5 max-w-3xl mx-auto rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-foreground">{c.promise}</p></header>
    <div className="grid lg:grid-cols-[1.25fr_.75fr] gap-8 items-start">
      <form onSubmit={submit} className="bg-card border border-border rounded-[2rem] shadow-xl p-6 md:p-10 space-y-7">
        <div className="grid md:grid-cols-2 gap-5">
          <Field label={c.name} required><input value={name} onChange={e=>setName(e.target.value)} required autoComplete="name" className={inputClass} /></Field>
          <Field label={c.email} required><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email" className={inputClass} /></Field>
          <Field label={c.phone}><input value={phone} onChange={e=>setPhone(e.target.value)} autoComplete="tel" className={inputClass} /></Field>
          <Field label={c.date}><div className="relative"><CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary"/><input type="date" min={new Date().toISOString().slice(0,10)} value={date} onChange={e=>setDate(e.target.value)} className={`${inputClass} pl-12`} /></div></Field>
          <Field label={c.travelers}><div className="relative"><Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary"/><input type="number" min={1} max={50} value={travelers} onChange={e=>setTravelers(Math.max(1, Math.min(50, Number(e.target.value))))} className={`${inputClass} pl-12`} /></div></Field>
          <Field label={c.trip}><input value={trip} onChange={e=>setTrip(e.target.value)} placeholder="e.g. 3-Day Sahara Tour" className={inputClass}/></Field>
        </div>
        <Field label={c.message}><textarea value={message} onChange={e=>setMessage(e.target.value)} rows={5} placeholder={c.messagePlaceholder} className={`${inputClass} resize-y`} /></Field>
        {status === 'error' && <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-foreground">{c.error}<div className="mt-3"><a href={whatsappHref} target="_blank" rel="noreferrer" className="font-bold text-primary underline">{c.whatsapp}</a></div></div>}
        <button type="submit" disabled={status === 'sending'} className="w-full rounded-xl bg-primary text-primary-foreground px-6 py-4 text-lg font-bold shadow-lg hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:cursor-wait">{status === 'sending' ? 'Sending…' : c.submit}</button>
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-[#0d2b1d] px-6 py-4 font-bold"><MessageCircle className="w-5 h-5"/>{c.whatsapp}</a>
      </form>

      <aside className="space-y-5 lg:sticky lg:top-28">
        <div className="bg-card border border-border rounded-[2rem] p-7 shadow-lg"><div className="flex items-center gap-3 mb-4"><ShieldCheck className="w-6 h-6 text-primary"/><h2 className="font-serif text-2xl text-foreground">{c.payLaterTitle}</h2></div><p className="text-muted-foreground leading-relaxed">{c.payLaterText}</p><ul className="mt-6 space-y-3">{c.trust.map(item=><li key={item} className="flex gap-3 text-sm text-foreground"><CheckCircle2 className="w-5 h-5 text-primary shrink-0"/>{item}</li>)}</ul></div>
        <div className="bg-foreground text-background rounded-[2rem] p-7"><div className="flex items-center gap-3 mb-3"><Mail className="w-5 h-5 text-primary"/><span className="font-bold">{contactInfo.email}</span></div><p className="text-background/70 text-sm">We confirm the booking details before asking for payment.</p></div>
      </aside>
    </div>
  </div></main></Layout>;
}

const inputClass = 'w-full bg-background border border-border rounded-xl px-4 py-3.5 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors';
function Field({ label, required, children }: { label:string; required?:boolean; children:React.ReactNode }) { return <label className="block"><span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{label}{required ? ' *' : ''}</span>{children}</label>; }
