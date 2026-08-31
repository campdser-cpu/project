import { FormEvent, useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, Mail, MessageCircle, ShieldCheck, Users } from 'lucide-react';
import { useLocation } from 'wouter';
import { Layout } from '../components/layout/Layout';
import { contactInfo } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';

type Copy = {
  badge: string;
  title: string;
  subtitle: string;
  promise: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  travelers: string;
  trip: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  whatsapp: string;
  payLaterTitle: string;
  payLaterText: string;
  trust: string[];
  successTitle: string;
  successText: string;
  successWhatsapp: string;
  error: string;
};

const COPY: Record<string, Copy> = {
  en: { badge:'DIRECT BOOKING', title:'Book Now — Pay Later', subtitle:'Secure your trip request directly with Morocco Grand Adventure.', promise:'No payment is taken at this step. We first confirm your dates, route, travelers and final price with you. Payment instructions are sent after confirmation.', name:'Full name', email:'Email address', phone:'WhatsApp / phone', date:'Preferred travel date', travelers:'Travelers', trip:'Tour or experience', message:'Anything else?', messagePlaceholder:'Tell us what you want to book, your departure city, or anything important about your trip.', submit:'Request My Booking', whatsapp:'Book via WhatsApp', payLaterTitle:'How Pay Later works', payLaterText:'1. Send your booking request. 2. We confirm the route, dates and price. 3. You receive payment instructions. 4. You pay after the details are confirmed.', trust:['No payment required to send a request','Human confirmation before payment','WhatsApp support from Morocco'], successTitle:'Booking request received', successText:'Thank you. Your request has been sent to Morocco Grand Adventure. We will confirm the details before any payment is requested.', successWhatsapp:'Continue on WhatsApp', error:'We could not send the request right now. Please use WhatsApp instead.' },
  fr: { badge:'RÉSERVATION DIRECTE', title:'Réservez maintenant — Payez plus tard', subtitle:'Envoyez votre demande directement à Morocco Grand Adventure.', promise:'Aucun paiement n’est demandé à cette étape. Nous confirmons d’abord les dates, l’itinéraire, le nombre de voyageurs et le prix final. Les instructions de paiement sont envoyées après confirmation.', name:'Nom complet', email:'Adresse e-mail', phone:'WhatsApp / téléphone', date:'Date de voyage souhaitée', travelers:'Voyageurs', trip:'Circuit ou expérience', message:'Autre information', messagePlaceholder:'Indiquez ce que vous souhaitez réserver, votre ville de départ ou toute information importante.', submit:'Demander ma réservation', whatsapp:'Réserver via WhatsApp', payLaterTitle:'Comment fonctionne le paiement plus tard', payLaterText:'1. Envoyez votre demande. 2. Nous confirmons l’itinéraire, les dates et le prix. 3. Vous recevez les instructions de paiement. 4. Vous payez après confirmation.', trust:['Aucun paiement pour envoyer la demande','Confirmation humaine avant paiement','Assistance WhatsApp depuis le Maroc'], successTitle:'Demande reçue', successText:'Merci. Votre demande a été envoyée à Morocco Grand Adventure. Nous confirmerons les détails avant toute demande de paiement.', successWhatsapp:'Continuer sur WhatsApp', error:'La demande n’a pas pu être envoyée. Utilisez WhatsApp pour nous contacter.' },
  es: { badge:'RESERVA DIRECTAMENTE', title:'Reserva ahora — Paga después', subtitle:'Envía tu solicitud directamente a Morocco Grand Adventure.', promise:'No se realiza ningún pago en este paso. Primero confirmamos fechas, ruta, viajeros y precio final. Las instrucciones de pago se envían después de la confirmación.', name:'Nombre completo', email:'Correo electrónico', phone:'WhatsApp / teléfono', date:'Fecha de viaje preferida', travelers:'Viajeros', trip:'Tour o experiencia', message:'Información adicional', messagePlaceholder:'Cuéntanos qué quieres reservar, tu ciudad de salida o cualquier detalle importante.', submit:'Solicitar mi reserva', whatsapp:'Reservar por WhatsApp', payLaterTitle:'Cómo funciona Paga después', payLaterText:'1. Envía tu solicitud. 2. Confirmamos ruta, fechas y precio. 3. Recibes las instrucciones de pago. 4. Pagas después de confirmar los detalles.', trust:['Sin pago para enviar la solicitud','Confirmación personal antes del pago','Atención por WhatsApp desde Marruecos'], successTitle:'Solicitud recibida', successText:'Gracias. Tu solicitud ha sido enviada a Morocco Grand Adventure. Confirmaremos los detalles antes de solicitar cualquier pago.', successWhatsapp:'Continuar por WhatsApp', error:'No hemos podido enviar la solicitud. Usa WhatsApp para contactarnos.' },
  it: { badge:'PRENOTAZIONE DIRETTA', title:'Prenota ora — Paga dopo', subtitle:'Invia la tua richiesta direttamente a Morocco Grand Adventure.', promise:'Nessun pagamento viene richiesto in questa fase. Prima confermiamo date, itinerario, viaggiatori e prezzo finale. Le istruzioni di pagamento arrivano dopo la conferma.', name:'Nome completo', email:'Email', phone:'WhatsApp / telefono', date:'Data di viaggio preferita', travelers:'Viaggiatori', trip:'Tour o esperienza', message:'Altre informazioni', messagePlaceholder:'Dicci cosa vuoi prenotare, la città di partenza o qualsiasi dettaglio importante.', submit:'Richiedi la mia prenotazione', whatsapp:'Prenota su WhatsApp', payLaterTitle:'Come funziona Paga dopo', payLaterText:'1. Invia la richiesta. 2. Confermiamo percorso, date e prezzo. 3. Ricevi le istruzioni di pagamento. 4. Paghi dopo la conferma.', trust:['Nessun pagamento per inviare la richiesta','Conferma personale prima del pagamento','Assistenza WhatsApp dal Marocco'], successTitle:'Richiesta ricevuta', successText:'Grazie. La richiesta è stata inviata a Morocco Grand Adventure. Confermeremo i dettagli prima di richiedere qualsiasi pagamento.', successWhatsapp:'Continua su WhatsApp', error:'Non è stato possibile inviare la richiesta. Contattaci su WhatsApp.' },
  de: { badge:'DIREKT BUCHEN', title:'Jetzt buchen — später bezahlen', subtitle:'Senden Sie Ihre Anfrage direkt an Morocco Grand Adventure.', promise:'In diesem Schritt ist keine Zahlung erforderlich. Wir bestätigen zuerst Reisedaten, Route, Reisende und den endgültigen Preis. Zahlungsinformationen erhalten Sie nach der Bestätigung.', name:'Vollständiger Name', email:'E-Mail-Adresse', phone:'WhatsApp / Telefon', date:'Gewünschtes Reisedatum', travelers:'Reisende', trip:'Tour oder Erlebnis', message:'Weitere Informationen', messagePlaceholder:'Was möchten Sie buchen, von wo starten Sie oder was sollten wir wissen?', submit:'Meine Buchung anfragen', whatsapp:'Über WhatsApp buchen', payLaterTitle:'So funktioniert später bezahlen', payLaterText:'1. Anfrage senden. 2. Route, Datum und Preis bestätigen. 3. Zahlungsinformationen erhalten. 4. Nach Bestätigung bezahlen.', trust:['Keine Zahlung zum Absenden nötig','Persönliche Bestätigung vor Zahlung','WhatsApp-Support aus Marokko'], successTitle:'Anfrage erhalten', successText:'Vielen Dank. Ihre Anfrage wurde an Morocco Grand Adventure gesendet. Wir bestätigen die Details vor einer Zahlungsaufforderung.', successWhatsapp:'Auf WhatsApp fortfahren', error:'Die Anfrage konnte nicht gesendet werden. Bitte kontaktieren Sie uns über WhatsApp.' },
  nl: { badge:'DIRECT BOEKEN', title:'Boek nu — betaal later', subtitle:'Stuur je aanvraag rechtstreeks naar Morocco Grand Adventure.', promise:'Je hoeft nu niets te betalen. We bevestigen eerst de datum, route, reizigers en uiteindelijke prijs. Daarna ontvang je de betaalinstructies.', name:'Volledige naam', email:'E-mailadres', phone:'WhatsApp / telefoon', date:'Gewenste reisdatum', travelers:'Reizigers', trip:'Tour of ervaring', message:'Extra informatie', messagePlaceholder:'Wat wil je boeken, waar vertrek je en wat moeten we weten?', submit:'Mijn boeking aanvragen', whatsapp:'Boeken via WhatsApp', payLaterTitle:'Zo werkt later betalen', payLaterText:'1. Stuur je aanvraag. 2. We bevestigen route, datum en prijs. 3. Je ontvangt betaalinstructies. 4. Je betaalt na bevestiging.', trust:['Geen betaling nodig om een aanvraag te sturen','Persoonlijke bevestiging vóór betaling','WhatsApp-support vanuit Marokko'], successTitle:'Aanvraag ontvangen', successText:'Bedankt. Je aanvraag is naar Morocco Grand Adventure gestuurd. We bevestigen de details voordat betaling wordt gevraagd.', successWhatsapp:'Doorgaan via WhatsApp', error:'We konden de aanvraag niet versturen. Neem contact op via WhatsApp.' },
  pt: { badge:'RESERVA DIRETA', title:'Reserve agora — Pague depois', subtitle:'Envie o seu pedido diretamente para Morocco Grand Adventure.', promise:'Não é necessário pagar nesta etapa. Primeiro confirmamos datas, percurso, viajantes e preço final. As instruções de pagamento são enviadas após a confirmação.', name:'Nome completo', email:'E-mail', phone:'WhatsApp / telefone', date:'Data de viagem preferida', travelers:'Viajantes', trip:'Circuito ou experiência', message:'Informações adicionais', messagePlaceholder:'Diga-nos o que pretende reservar, a cidade de partida ou qualquer detalhe importante.', submit:'Pedir a minha reserva', whatsapp:'Reservar pelo WhatsApp', payLaterTitle:'Como funciona Pagar depois', payLaterText:'1. Envie o pedido. 2. Confirmamos percurso, datas e preço. 3. Recebe as instruções de pagamento. 4. Paga após a confirmação.', trust:['Sem pagamento para enviar o pedido','Confirmação pessoal antes do pagamento','Suporte por WhatsApp a partir de Marrocos'], successTitle:'Pedido recebido', successText:'Obrigado. O seu pedido foi enviado para Morocco Grand Adventure. Confirmaremos os detalhes antes de solicitar qualquer pagamento.', successWhatsapp:'Continuar no WhatsApp', error:'Não foi possível enviar o pedido. Contacte-nos pelo WhatsApp.' },
  zh: { badge:'直接预订', title:'立即预订 — 稍后付款', subtitle:'直接向 Morocco Grand Adventure 提交您的旅行预订请求。', promise:'提交此请求无需付款。我们会先确认日期、路线、人数和最终价格，确认后再发送付款说明。', name:'姓名', email:'电子邮箱', phone:'WhatsApp / 电话', date:'期望出行日期', travelers:'人数', trip:'旅行或体验', message:'其他需求', messagePlaceholder:'告诉我们您想预订什么、出发城市以及任何重要需求。', submit:'提交预订请求', whatsapp:'通过 WhatsApp 预订', payLaterTitle:'稍后付款如何运作', payLaterText:'1. 提交请求。2. 确认路线、日期和价格。3. 收到付款说明。4. 确认后付款。', trust:['提交请求无需付款','付款前由人工确认','来自摩洛哥的 WhatsApp 支持'], successTitle:'已收到预订请求', successText:'感谢您。您的请求已发送给 Morocco Grand Adventure。我们会在要求付款前确认所有细节。', successWhatsapp:'继续使用 WhatsApp', error:'暂时无法发送请求，请通过 WhatsApp 联系我们。' },
  ja: { badge:'直接予約', title:'今すぐ予約 — お支払いは後で', subtitle:'Morocco Grand Adventure に直接予約リクエストを送信します。', promise:'この段階で支払いは必要ありません。日程、ルート、人数、最終料金を確認してから支払い方法をご案内します。', name:'氏名', email:'メールアドレス', phone:'WhatsApp / 電話', date:'希望旅行日', travelers:'旅行者', trip:'ツアーまたは体験', message:'その他', messagePlaceholder:'予約したい内容、出発地、重要な希望などを入力してください。', submit:'予約をリクエスト', whatsapp:'WhatsAppで予約', payLaterTitle:'後払いの流れ', payLaterText:'1. リクエスト送信。2. ルート、日程、料金を確認。3. 支払い方法をご案内。4. 確認後にお支払い。', trust:['リクエスト送信時の支払い不要','支払い前にスタッフが確認','モロッコからWhatsAppサポート'], successTitle:'予約リクエストを受け取りました', successText:'ありがとうございます。Morocco Grand Adventure にリクエストが送信されました。お支払い前に詳細を確認します。', successWhatsapp:'WhatsAppで続ける', error:'送信できませんでした。WhatsAppからお問い合わせください。' },
  ko: { badge:'직접 예약', title:'지금 예약 — 나중에 결제', subtitle:'Morocco Grand Adventure에 직접 여행 예약 요청을 보내세요.', promise:'이 단계에서는 결제가 필요하지 않습니다. 날짜, 경로, 인원과 최종 가격을 확인한 후 결제 안내를 보내드립니다.', name:'이름', email:'이메일', phone:'WhatsApp / 전화', date:'희망 여행 날짜', travelers:'여행자', trip:'투어 또는 체험', message:'추가 요청', messagePlaceholder:'예약하고 싶은 내용, 출발 도시 또는 중요한 요청을 알려주세요.', submit:'예약 요청 보내기', whatsapp:'WhatsApp으로 예약', payLaterTitle:'나중에 결제하는 방법', payLaterText:'1. 요청을 보냅니다. 2. 경로, 날짜와 가격을 확인합니다. 3. 결제 안내를 받습니다. 4. 확인 후 결제합니다.', trust:['요청 제출 시 결제 없음','결제 전 담당자 확인','모로코 현지 WhatsApp 지원'], successTitle:'예약 요청을 받았습니다', successText:'감사합니다. Morocco Grand Adventure에 요청이 전달되었습니다. 결제를 요청하기 전에 세부 사항을 확인합니다.', successWhatsapp:'WhatsApp으로 계속', error:'요청을 보낼 수 없습니다. WhatsApp으로 문의해 주세요.' },
  ar: { badge:'حجز مباشر', title:'احجز الآن — ادفع لاحقًا', subtitle:'أرسل طلب حجزك مباشرة إلى Morocco Grand Adventure.', promise:'لا يتم طلب أي دفع في هذه الخطوة. نؤكد أولًا التاريخ والمسار وعدد المسافرين والسعر النهائي، ثم نرسل لك تعليمات الدفع بعد التأكيد.', name:'الاسم الكامل', email:'البريد الإلكتروني', phone:'واتساب / الهاتف', date:'تاريخ السفر المفضل', travelers:'عدد المسافرين', trip:'الجولة أو التجربة', message:'معلومات إضافية', messagePlaceholder:'أخبرنا بما تريد حجزه، مدينة الانطلاق وأي تفاصيل مهمة.', submit:'أرسل طلب الحجز', whatsapp:'احجز عبر واتساب', payLaterTitle:'كيف يعمل الدفع لاحقًا', payLaterText:'1. أرسل طلبك. 2. نؤكد المسار والتاريخ والسعر. 3. نرسل لك تعليمات الدفع. 4. تدفع بعد تأكيد التفاصيل.', trust:['لا يوجد دفع عند إرسال الطلب','تأكيد شخصي قبل الدفع','دعم عبر واتساب من المغرب'], successTitle:'تم استلام طلب الحجز', successText:'شكرًا لك. تم إرسال طلبك إلى Morocco Grand Adventure. سنؤكد التفاصيل قبل طلب أي دفعة.', successWhatsapp:'المتابعة عبر واتساب', error:'تعذر إرسال الطلب الآن. يرجى التواصل معنا عبر واتساب.' },
};

export default function Book() {
  const { lang } = useLanguage();
  const [, navigate] = useLocation();
  const c = COPY[lang] ?? COPY.en;
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
    return <Layout><main dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-background pt-32 pb-24"><div className="container mx-auto max-w-2xl px-4"><div className="bg-card border border-border rounded-[2rem] shadow-xl p-8 md:p-12 text-center"><CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6"/><h1 className="font-serif text-4xl md:text-5xl text-foreground mb-5">{c.successTitle}</h1><p className="text-muted-foreground text-lg leading-relaxed mb-8">{c.successText}</p><div className="flex flex-col sm:flex-row gap-3 justify-center"><a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 font-bold text-white"><MessageCircle className="w-5 h-5"/>{c.successWhatsapp}</a><button onClick={() => navigate('/')} className="rounded-xl border-2 border-foreground px-6 py-4 font-bold text-foreground">Home</button></div></div></div></main></Layout>;
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
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white px-6 py-4 font-bold"><MessageCircle className="w-5 h-5"/>{c.whatsapp}</a>
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
