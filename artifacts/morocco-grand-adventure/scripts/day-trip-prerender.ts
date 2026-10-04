import * as fs from 'node:fs';
import * as path from 'node:path';

const SITE_URL = 'https://www.moroccograndadventure.com';
const LANGS = ['en','fr','es','it','de','nl','pt','zh','ja','ko','ar'];
const ROOT = path.resolve('dist');

const copy: Record<string,{title:string;description:string;h1:string;sub:string;h2:string;h2sub:string}> = {
  en:{title:'Build Your Day Trip in Morocco — One-Day Experiences',description:'Plan a personalized one-day Morocco experience with same-day return. Choose your departure, destination, date and preferences.',h1:'Build Your Day Trip',sub:'One-day experience · Same-day return',h2:'Request a Personalized Quote',h2sub:'Choose your departure city, destination, date, travelers and preferences. We will review your request personally.'},
  fr:{title:'Créer votre excursion à la journée au Maroc',description:'Planifiez une expérience personnalisée d’une journée au Maroc avec retour le jour même.',h1:'Créer votre excursion à la journée',sub:'Expérience d’une journée · Retour le jour même',h2:'Demander un devis personnalisé',h2sub:'Choisissez votre ville de départ, votre destination, la date, le nombre de voyageurs et vos préférences. Nous étudierons votre demande personnellement.'},
  es:{title:'Crea tu excursión de un día en Marruecos',description:'Planifica una experiencia personalizada de un día en Marruecos con regreso el mismo día.',h1:'Crea tu excursión de un día',sub:'Experiencia de un día · Regreso el mismo día',h2:'Solicitar un presupuesto personalizado',h2sub:'Elige tu ciudad de salida, destino, fecha, número de viajeros y preferencias. Revisaremos tu solicitud personalmente.'},
  it:{title:'Crea la tua escursione di un giorno in Marocco',description:'Organizza un’esperienza personalizzata di un giorno in Marocco con rientro in giornata.',h1:'Crea la tua escursione di un giorno',sub:'Esperienza di un giorno · Rientro in giornata',h2:'Richiedi un preventivo personalizzato',h2sub:'Scegli la città di partenza, la destinazione, la data, il numero di viaggiatori e le preferenze. Valuteremo la tua richiesta personalmente.'},
  de:{title:'Tagesausflug in Marokko zusammenstellen',description:'Planen Sie ein persönliches Tageserlebnis in Marokko mit Rückkehr am selben Tag.',h1:'Tagesausflug zusammenstellen',sub:'Tageserlebnis · Rückkehr am selben Tag',h2:'Persönliches Angebot anfragen',h2sub:'Wählen Sie Abfahrtsort, Ziel, Datum, Reisendenzahl und Ihre Wünsche. Wir prüfen Ihre Anfrage persönlich.'},
  nl:{title:'Bouw je dagtrip in Marokko',description:'Plan een persoonlijke eendaagse ervaring in Marokko met terugkeer op dezelfde dag.',h1:'Bouw je dagtrip',sub:'Eendaagse ervaring · Dezelfde dag terug',h2:'Persoonlijke offerte aanvragen',h2sub:'Kies je vertrekstad, bestemming, datum, aantal reizigers en voorkeuren. We bekijken je aanvraag persoonlijk.'},
  pt:{title:'Crie a sua excursão de um dia em Marrocos',description:'Planeie uma experiência personalizada de um dia em Marrocos com regresso no mesmo dia.',h1:'Crie a sua excursão de um dia',sub:'Experiência de um dia · Regresso no mesmo dia',h2:'Pedir orçamento personalizado',h2sub:'Escolha a cidade de partida, o destino, a data, o número de viajantes e as preferências. Analisaremos o seu pedido pessoalmente.'},
  zh:{title:'定制您的摩洛哥一日游',description:'规划个性化摩洛哥一日体验，当天往返并由我们确认路线和报价。',h1:'定制您的摩洛哥一日游',sub:'一日体验 · 当天往返',h2:'申请个性化报价',h2sub:'选择您的出发城市、目的地、日期、人数和偏好。我们会亲自审核您的请求。'},
  ja:{title:'モロッコの日帰り旅行を作る',description:'当日帰着のモロッコ一日体験を個別に計画できます。',h1:'日帰り旅行を作る',sub:'1日体験 · 当日帰着',h2:'個別見積もりを依頼',h2sub:'出発都市、目的地、日付、人数、ご希望を選択してください。ご依頼は個別に確認いたします。'},
  ko:{title:'모로코 맞춤 당일 여행 만들기',description:'당일 귀환이 가능한 모로코 맞춤형 하루 여행을 계획하세요.',h1:'나만의 당일 여행 만들기',sub:'하루 체험 · 당일 귀환',h2:'맞춤 견적 요청',h2sub:'출발 도시, 목적지, 날짜, 인원수 및 선호 사항을 선택하세요. 요청을 직접 확인해 드립니다.'},
  ar:{title:'صمّم رحلتك اليومية في المغرب — تجربة ليوم واحد',description:'خطط لتجربة خاصة ليوم واحد في المغرب مع العودة في اليوم نفسه واطلب عرض سعر مخصص.',h1:'صمّم رحلتك اليومية',sub:'تجربة ليوم واحد · العودة في اليوم نفسه',h2:'اطلب عرض سعر مخصص',h2sub:'اختر مدينة الانطلاق والوجهة والتاريخ وعدد المسافرين وتفضيلاتك. سنراجع طلبك شخصيًا.'},
};

function esc(s:string){return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
for(const lang of LANGS){
  const src=path.join(ROOT,lang,'day-trips','index.html');
  if(!fs.existsSync(src)) throw new Error(`[day-trip-prerender] Missing ${src}. The normal prerender must generate /day-trips first.`);
  const out=path.join(ROOT,lang,'build-your-day-trip','index.html');
  let html=fs.readFileSync(src,'utf8'); const c=copy[lang] ?? copy.en; const url=`${SITE_URL}/${lang}/build-your-day-trip`;
  html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(c.title)} — Morocco Grand Adventure</title>`);
  html=html.replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/,`$1${esc(c.description)}$2`);
  html=html.replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/,`$1${url}$2`);
  html=html.replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/,`$1${url}$2`);
  html=html.replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/,`$1${esc(c.title)} — Morocco Grand Adventure$2`);
  html=html.replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/,`$1${esc(c.description)}$2`);
  html=html.replace(/(<meta name="twitter:title" content=")[^"]*("\s*\/?>)/,`$1${esc(c.title)} — Morocco Grand Adventure$2`);
  html=html.replace(/(<meta name="twitter:description" content=")[^"]*("\s*\/?>)/,`$1${esc(c.description)}$2`);
  html=html.replace(/(<link rel="alternate" hreflang="([^"]+)" href=")[^"]*("\s*\/?>)/g,(_m,_a,alternateLang,_b)=>`${_a}${SITE_URL}/${alternateLang === 'x-default' ? 'en' : alternateLang}/build-your-day-trip${_b}`);
  html=html.replace(/<div id="root">[\s\S]*?<\/div>/,`<div id="root"><main><h1>${esc(c.h1)}</h1><p>${esc(c.sub)}</p><p>${esc(c.description)}</p><h2>${esc(c.h2)}</h2><p>${esc(c.h2sub)}</p></main></div>`);
  fs.mkdirSync(path.dirname(out),{recursive:true}); fs.writeFileSync(out,html,'utf8');
  console.log(`[day-trip-prerender] wrote ${lang}/build-your-day-trip/index.html`);
}
