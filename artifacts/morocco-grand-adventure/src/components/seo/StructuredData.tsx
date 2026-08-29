import { useEffect } from 'react';

const SCRIPT_ID_PREFIX = 'structured-data-';
const DATA_ATTR = 'data-structured-data';
const SITE_URL = 'https://www.moroccograndadventure.com';
const BRAND = 'Morocco Grand Adventure';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const ORGANIZATION_SAME_AS = [
  'https://www.instagram.com/morocco_grand_adventure/',
  'https://youtube.com/@moroccograndadventure',
  'https://www.tiktok.com/@morocco.grand.adv',
  'https://www.facebook.com/share/1DFzDX72P3/',
  'https://wa.me/message/QAFZ3RKJDNH4B1',
];

type JsonLd = Record<string, unknown>;

function upsertJsonLd(id: string, data: JsonLd | JsonLd[]) {
  const fullId = `${SCRIPT_ID_PREFIX}${id}`;
  document.head.querySelectorAll(`script[${DATA_ATTR}="${fullId}"]`).forEach((n) => n.remove());
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = fullId;
  script.setAttribute(DATA_ATTR, fullId);
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
function removeJsonLd(id: string) {
  const fullId = `${SCRIPT_ID_PREFIX}${id}`;
  document.head.querySelectorAll(`script[${DATA_ATTR}="${fullId}"]`).forEach((n) => n.remove());
}

/** Single canonical business entity used by all page schemas and the static head. */
export function buildOrganizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org', '@type': 'TravelAgency', '@id': ORGANIZATION_ID,
    name: BRAND, alternateName: 'Morocco Grand Adventure Tours', url: SITE_URL,
    logo: `${SITE_URL}/logo-official.png`, image: `${SITE_URL}/images/hero/desert-pano.jpg`,
    description: 'Morocco Grand Adventure creates private Morocco journeys across the Sahara Desert, imperial cities, Atlas Mountains, and destinations featured on the site.',
    founder: { '@type': 'Person', name: 'Mohamed Bou Ghrara' },
    address: { '@type': 'PostalAddress', streetAddress: 'Merzouga', addressLocality: 'Merzouga', addressRegion: 'Errachidia Province', addressCountry: 'MA' },
    geo: { '@type': 'GeoCoordinates', latitude: 31.0988, longitude: -4.0134 },
    telephone: '+212 699 846 818', email: 'moroccograndadventure@gmail.com',
    sameAs: ORGANIZATION_SAME_AS,
    areaServed: { '@type': 'Country', name: 'Morocco' },
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', telephone: '+212 699 846 818', email: 'moroccograndadventure@gmail.com', areaServed: 'MA' },
  };
}

function normalizeLang(lang?: string): string {
  const BCP47: Record<string, string> = { en:'en',fr:'fr',es:'es',it:'it',de:'de',nl:'nl',pt:'pt',zh:'zh',ja:'ja',ko:'ko',ar:'ar' };
  return (lang && BCP47[lang]) || lang || 'en';
}

export function buildAboutPageSchema(guides: { name: string; role: string; image: string }[], lang?: string): JsonLd[] {
  const l = normalizeLang(lang); const aboutUrl = `${SITE_URL}/${l}/about`;
  return [
    { '@context':'https://schema.org','@type':'AboutPage','@id':`${aboutUrl}#webpage`,url:aboutUrl,inLanguage:l,name:'About Us — Meet Your Local Berber Guides',isPartOf:{'@id':`${SITE_URL}/${l}#website`},mainEntity:{'@id':ORGANIZATION_ID} },
    ...guides.map((g) => ({ '@context':'https://schema.org','@type':'Person','@id':`${aboutUrl}#${g.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`,name:g.name,jobTitle:g.role,worksFor:{'@id':ORGANIZATION_ID},image:`${SITE_URL}${g.image}` })),
    buildBreadcrumb([{name:'Home',path:'/'},{name:'About',path:'/about'}],lang),
  ];
}

export function buildBreadcrumb(crumbs: { name: string; path: string }[], lang?: string): JsonLd {
  const l=normalizeLang(lang);
  return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,name:c.name,item:`${SITE_URL}/${l}${c.path==='/'?'':c.path}`.replace(/\/$/,'')||`${SITE_URL}/${l}`}))};
}

export function buildTourSchema(tour: {id:string;name:string;description?:string;image:string;price:string;duration:string;highlights?:string[];faq?:{question:string;answer:string}[];itineraryDays?:{day:number;title:string;desc:string}[]},urlSlug?:string,lang?:string): JsonLd[] {
  const l=normalizeLang(lang); const url=`${SITE_URL}/${l}/tours/${urlSlug??tour.id}`;
  const schemas:JsonLd[]=[{'@context':'https://schema.org','@type':'TouristTrip','@id':`${url}#tour`,name:tour.name,description:tour.description??tour.name,image:`${SITE_URL}${tour.image}`,url,provider:{'@id':ORGANIZATION_ID},offers:{'@type':'Offer','@id':`${url}#offer`,price:tour.price,priceCurrency:'EUR',availability:'https://schema.org/InStock',url},itinerary:(tour.itineraryDays??[]).map(d=>({'@type':'ItemList',name:`Day ${d.day}: ${d.title}`,description:d.desc})),touristDestination:(tour.highlights??[]).map(h=>({'@type':'TouristDestination',name:h})),inLanguage:l}];
  if(tour.faq?.length) schemas.push(buildFaqSchema(tour.faq));
  schemas.push(buildBreadcrumb([{name:'Home',path:'/'},{name:'Tours',path:'/tours'},{name:tour.name,path:`/tours/${tour.id}`}],lang));
  return schemas;
}

export function buildDestinationSchema(dest:{id:string;name:string;description:string;image:string;region:string;coords:{lat:number;lng:number};highlights:string[];bestTime:string},lang?:string):JsonLd[]{
  const l=normalizeLang(lang); const url=`${SITE_URL}/${l}/destinations/${dest.id}`;
  return [{'@context':'https://schema.org','@type':'TouristAttraction','@id':`${url}#destination`,name:dest.name,description:dest.description,image:`${SITE_URL}${dest.image}`,url,inLanguage:l,geo:{'@type':'GeoCoordinates',latitude:dest.coords.lat,longitude:dest.coords.lng},address:{'@type':'PostalAddress',addressRegion:dest.region,addressCountry:'MA'},touristType:dest.highlights,bestTimeToVisit:dest.bestTime,containedInPlace:{'@type':'Country',name:'Morocco'},provider:{'@id':ORGANIZATION_ID}},buildBreadcrumb([{name:'Home',path:'/'},{name:'Destinations',path:'/destinations'},{name:dest.name,path:`/destinations/${dest.id}`}],lang)];
}

export function buildFaqSchema(faqs:{question:string;answer:string}[]):JsonLd{return{'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))};}
export function buildReviewSchema(reviews:{name:string;text:string;rating:number}[],itemName:string,itemUrl:string):JsonLd{return{'@context':'https://schema.org','@type':'ItemList',itemListElement:reviews.map((r,i)=>({'@type':'Review',position:i+1,author:{'@type':'Person',name:r.name},reviewBody:r.text,reviewRating:{'@type':'Rating',ratingValue:r.rating,bestRating:5},itemReviewed:{'@type':'TouristTrip',name:itemName,url:itemUrl}}))};}
export function buildBlogPostSchema(post:{slug:string;title:string;description:string;date:string;image:string;author?:string},lang:string):JsonLd[]{const l=normalizeLang(lang);const url=`${SITE_URL}/${l}/blog/${post.slug}`;return[{'@context':'https://schema.org','@type':'BlogPosting','@id':`${url}#blog-post`,mainEntityOfPage:{'@type':'WebPage','@id':url},headline:post.title,description:post.description,image:`${SITE_URL}${post.image}`,datePublished:post.date,dateModified:post.date,author:{'@type':'Organization',name:post.author??BRAND,url:SITE_URL},publisher:{'@type':'Organization','@id':ORGANIZATION_ID,name:BRAND,logo:{'@type':'ImageObject',url:`${SITE_URL}/logo-official.png`}},inLanguage:l},buildBreadcrumb([{name:BRAND,path:'/'},{name:'Blog',path:'/blog'},{name:post.title,path:`/blog/${post.slug}`}],lang)];}

type StructuredDataProps={id:string;data:JsonLd|JsonLd[]};
export function StructuredData({id,data}:StructuredDataProps){useEffect(()=>{const blocks=Array.isArray(data)?data:[data];blocks.forEach((block,i)=>upsertJsonLd(blocks.length>1?`${id}-${i}`:id,block));return()=>{blocks.forEach((_,i)=>removeJsonLd(blocks.length>1?`${id}-${i}`:id));};},[id,data]);return null;}
