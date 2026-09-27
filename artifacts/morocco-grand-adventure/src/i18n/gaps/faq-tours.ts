// ─────────────────────────────────────────────────────────────────────────────
// /tours and /desert-tours FAQ gap completions (tours_faq_q1-4/a1-4,
// dt2_faq_q1-4/a1-4). English lives in locales/en.ts; these were English-only
// until this batch, falling back silently for every non-English locale.
// Scoped to the four priority languages only (ES/IT/DE/NL) — the remaining
// locales (fr/pt/zh/ja/ko/ar) keep falling back to English until a dedicated
// localization pass covers them.
//
// Every answer here preserves the exact facts already published in the
// English source: private-only tours, the real 2-14 day range, the real
// departure-city lists (5 for /tours, 4 for /desert-tours — Tangier is
// deliberately absent from the desert-tours answer, matching the English
// source), the same booking process, and the same Merzouga desert-camp detail.
// Nothing here adds a price, guarantee, policy, or availability claim beyond
// what the English source already states.
// ─────────────────────────────────────────────────────────────────────────────

export const faqToursGaps: Partial<Record<string, Record<string, string>>> = {
  es: {
    tours_faq_q1: '¿Sus tours por Marruecos son privados o me uno a un grupo?',
    tours_faq_a1: 'Cada tour es privado para su propio grupo — nunca se une a un grupo compartido con otros viajeros.',
    tours_faq_q2: '¿Cuántos días duran sus tours por Marruecos?',
    tours_faq_a2: 'Nuestros itinerarios privados van de 2 a 14 días, para que pueda elegir una escapada corta al desierto o una ruta más larga por todo el país.',
    tours_faq_q3: '¿Desde qué ciudades puedo empezar mi tour?',
    tours_faq_a3: 'Organizamos tours privados con salida desde Marrakech, Fez, Casablanca, Agadir y Tánger.',
    tours_faq_q4: '¿Cómo funciona la reserva?',
    tours_faq_a4: 'Escríbanos con sus fechas y el tamaño de su grupo; confirmamos con usted el itinerario y el precio exactos, y solo paga una vez que todo esté acordado.',
    dt2_faq_q1: '¿El tour al desierto es privado o compartido con otros viajeros?',
    dt2_faq_a1: 'Cada tour al desierto es privado, solo para su grupo — no se le agrupará con viajeros que no conoce.',
    dt2_faq_q2: '¿Qué incluye una noche en el desierto del Sahara?',
    dt2_faq_a2: 'La mayoría de nuestras rutas al Sahara incluyen un paseo en camello hacia las dunas y una noche en un campamento del desierto cerca de Merzouga — las inclusiones exactas se confirman en su itinerario privado antes de reservar.',
    dt2_faq_q3: '¿Desde qué ciudades salen los tours al desierto?',
    dt2_faq_a3: 'Nuestras rutas al desierto del Sahara salen desde Marrakech, Fez, Casablanca y Agadir.',
    dt2_faq_q4: '¿Necesito un viaje largo para ver el desierto?',
    dt2_faq_a4: 'No — algunas de nuestras rutas al desierto duran tan solo 2 días desde Marrakech, mientras que otras continúan durante una semana o más por el sur. Le ayudaremos a elegir la duración adecuada.',
  },
  it: {
    tours_faq_q1: 'I vostri tour in Marocco sono privati o mi unisco a un gruppo?',
    tours_faq_a1: 'Ogni tour è privato per il vostro gruppo — non vi unirete mai a un gruppo condiviso con altri viaggiatori.',
    tours_faq_q2: 'Quanto durano i vostri tour in Marocco?',
    tours_faq_a2: "I nostri itinerari privati vanno da 2 a 14 giorni, così potete scegliere una breve escursione nel deserto o un percorso più lungo attraverso il paese.",
    tours_faq_q3: 'Da quali città posso partire per il mio tour?',
    tours_faq_a3: 'Organizziamo tour privati in partenza da Marrakech, Fès, Casablanca, Agadir e Tangeri.',
    tours_faq_q4: 'Come funziona la prenotazione?',
    tours_faq_a4: "Scriveteci con le vostre date e la dimensione del gruppo; confermeremo con voi l'itinerario e il prezzo esatti, e pagherete solo una volta che tutto sarà concordato.",
    dt2_faq_q1: 'Il tour nel deserto è privato o condiviso con altri viaggiatori?',
    dt2_faq_a1: 'Ogni tour nel deserto è privato, solo per il vostro gruppo — non sarete raggruppati con viaggiatori che non conoscete.',
    dt2_faq_q2: 'Cosa è incluso in una notte nel deserto del Sahara?',
    dt2_faq_a2: 'La maggior parte dei nostri percorsi nel Sahara include un trekking in cammello verso le dune e una notte in un campo tendato nel deserto vicino a Merzouga — le inclusioni esatte vengono confermate nel vostro itinerario privato prima della prenotazione.',
    dt2_faq_q3: 'Da quali città partono i tour nel deserto?',
    dt2_faq_a3: 'I nostri percorsi nel deserto del Sahara partono da Marrakech, Fès, Casablanca e Agadir.',
    dt2_faq_q4: 'Ho bisogno di un viaggio lungo per vedere il deserto?',
    dt2_faq_a4: 'No — alcuni dei nostri percorsi nel deserto durano anche solo 2 giorni da Marrakech, mentre altri proseguono per una settimana o più attraverso il sud. Vi aiuteremo a scegliere la durata giusta.',
  },
  de: {
    tours_faq_q1: 'Sind Ihre Marokko-Touren privat, oder schließe ich mich einer Gruppe an?',
    tours_faq_a1: 'Jede Tour ist privat für Ihre eigene Reisegruppe — Sie schließen sich nie einer gemeinsamen Gruppe mit anderen Reisenden an.',
    tours_faq_q2: 'Wie viele Tage dauern Ihre Marokko-Touren?',
    tours_faq_a2: 'Unsere privaten Reiserouten dauern zwischen 2 und 14 Tagen, sodass Sie zwischen einem kurzen Wüstenausflug und einer längeren Route durch das ganze Land wählen können.',
    tours_faq_q3: 'Von welchen Städten aus kann ich meine Tour beginnen?',
    tours_faq_a3: 'Wir bieten private Touren ab Marrakesch, Fès, Casablanca, Agadir und Tanger an.',
    tours_faq_q4: 'Wie funktioniert die Buchung?',
    tours_faq_a4: 'Schreiben Sie uns Ihre Reisedaten und Gruppengröße; wir bestätigen mit Ihnen die genaue Reiseroute und den Preis, und Sie zahlen erst, wenn alles vereinbart ist.',
    dt2_faq_q1: 'Ist die Wüstentour privat oder wird sie mit anderen Reisenden geteilt?',
    dt2_faq_a1: 'Jede Wüstentour ist ausschließlich privat für Ihre Gruppe — Sie werden nicht mit Ihnen unbekannten Reisenden zusammengelegt.',
    dt2_faq_q2: 'Was ist in einer Nacht in der Sahara-Wüste enthalten?',
    dt2_faq_a2: 'Die meisten unserer Sahara-Routen beinhalten einen Kamelritt in die Dünen und eine Übernachtung in einem Wüstencamp bei Merzouga — die genauen Leistungen werden vor der Buchung in Ihrer privaten Reiseroute bestätigt.',
    dt2_faq_q3: 'Von welchen Städten starten die Wüstentouren?',
    dt2_faq_a3: 'Unsere Sahara-Wüstenrouten starten ab Marrakesch, Fès, Casablanca und Agadir.',
    dt2_faq_q4: 'Brauche ich eine lange Reise, um die Wüste zu sehen?',
    dt2_faq_a4: 'Nein — einige unserer Wüstenrouten dauern nur 2 Tage ab Marrakesch, während andere eine Woche oder länger durch den Süden führen. Wir helfen Ihnen, die passende Dauer zu wählen.',
  },
  nl: {
    tours_faq_q1: 'Zijn jullie Marokko-rondreizen privé, of sluit ik me aan bij een groep?',
    tours_faq_a1: 'Elke rondreis is privé voor uw eigen gezelschap — u sluit zich nooit aan bij een gedeelde groep met andere reizigers.',
    tours_faq_q2: 'Hoeveel dagen duren jullie Marokko-rondreizen?',
    tours_faq_a2: 'Onze privé-reisroutes duren van 2 tot 14 dagen, zodat u kunt kiezen voor een korte woestijntrip of een langere route door het hele land.',
    tours_faq_q3: 'Vanuit welke steden kan ik mijn rondreis beginnen?',
    tours_faq_a3: 'Wij organiseren privérondreizen vanuit Marrakech, Fès, Casablanca, Agadir en Tanger.',
    tours_faq_q4: 'Hoe werkt het boeken?',
    tours_faq_a4: 'Stuur ons uw reisdata en groepsgrootte; we bevestigen samen met u de exacte reisroute en prijs, en u betaalt pas zodra alles is overeengekomen.',
    dt2_faq_q1: 'Is de woestijntour privé, of gedeeld met andere reizigers?',
    dt2_faq_a1: 'Elke woestijntour is uitsluitend privé voor uw groep — u wordt niet samengevoegd met reizigers die u niet kent.',
    dt2_faq_q2: 'Wat is inbegrepen in een nacht in de Sahara-woestijn?',
    dt2_faq_a2: 'De meeste van onze Sahara-routes omvatten een kameeltocht de duinen in en een overnachting in een woestijnkamp bij Merzouga — de exacte inclusies worden vóór het boeken bevestigd in uw privé-reisroute.',
    dt2_faq_q3: 'Vanuit welke steden vertrekken de woestijntours?',
    dt2_faq_a3: 'Onze Sahara-woestijnroutes vertrekken vanuit Marrakech, Fès, Casablanca en Agadir.',
    dt2_faq_q4: 'Heb ik een lange reis nodig om de woestijn te zien?',
    dt2_faq_a4: 'Nee — sommige van onze woestijnroutes duren slechts 2 dagen vanuit Marrakech, terwijl andere een week of langer door het zuiden gaan. Wij helpen u de juiste duur te kiezen.',
  },
};
