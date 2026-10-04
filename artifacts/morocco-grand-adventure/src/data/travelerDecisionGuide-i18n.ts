// French TravelerDecisionGuide content (Phase 6E).
// Complete per-locale overlay using the canonical segment architecture.
// Each answer defines its OWN segment ordering for natural French —
// word order is NOT inherited from English. Canonical hrefs preserved.
import type { TravelerDecisionContent } from './travelerDecisionGuide';

export const travelerDecisionGuideFr: TravelerDecisionContent = {
  eyebrow: 'Avant de r\u00e9server',
  title: 'Les questions des voyageurs qui viennent pour la premi\u00e8re fois',
  intro:
    'Si c\u2019est votre premier voyage au Maroc, voici les questions pratiques auxquelles nous voudrions des r\u00e9ponses claires avant de d\u00e9penser le moindre euro. Nous y r\u00e9pondons honn\u00eatement, et chaque r\u00e9ponse vous renvoie vers la page pour aller plus loin.',
  items: [
    {
      q: 'Combien de jours faut-il vraiment pr\u00e9voir pour le Maroc ?',
      a: [
        {
          type: 'text',
          text: 'Pour un premier voyage, il y a une grande diff\u00e9rence entre voir l\u2019essentiel et vouloir tout voir. Un s\u00e9jour court fonctionne tr\u00e8s bien si vous vous concentrez sur une seule r\u00e9gion ; un s\u00e9jour plus long laisse le temps de d\u00e9couvrir les villes, les montagnes et le Sahara sans transformer chaque journ\u00e9e en transfert. Si vous connaissez d\u00e9j\u00e0 vos dates, utilisez notre ',
        },
        { type: 'link', text: 'cr\u00e9ateur de voyage', to: '/trip-builder' },
        { type: 'text', text: ' et dites-nous ce qui compte le plus pour vous.' },
      ],
    },
    {
      q: 'Marrakech \u2013 Merzouga : est-ce un simple transfert rapide ?',
      a: [
        {
          type: 'text',
          text: 'Non. C\u2019est un vrai voyage en soi, et le traiter comme un simple transfert d\u2019un point \u00e0 un autre peut g\u00e2cher le rythme des vacances. La bonne question est plut\u00f4t comment profiter de la route : l\u2019Atlas, A\u00eft Ben Haddou, la vall\u00e9e du Dad\u00e8s et Todra transforment le trajet en une partie du voyage. Notre ',
        },
        { type: 'link', text: 'guide Marrakech \u2013 Merzouga', to: '/blog/marrakech-to-merzouga-roadtrip' },
        { type: 'text', text: ' explique la r\u00e9alit\u00e9 pratique.' },
      ],
    },
    {
      q: 'Quelle est la diff\u00e9rence entre Merzouga et l\u2019Erg Chebbi ?',
      a: [
        {
          type: 'text',
          text: 'Merzouga est le village et la base touristique ; l\u2019Erg Chebbi est le massif de dunes qui l\u2019entoure. Concr\u00e8tement, les voyageurs s\u00e9journent ou arrivent \u00e0 Merzouga, puis entrent dans les dunes pour les activit\u00e9s dans le d\u00e9sert. Commencez par le ',
        },
        { type: 'link', text: 'guide de Merzouga', to: '/merzouga-guide' },
        { type: 'text', text: ' puis d\u00e9couvrez notre exp\u00e9rience de ' },
        { type: 'link', text: 'randonn\u00e9e \u00e0 dos de dromadaire', to: '/camel-trekking' },
        { type: 'text', text: '.' },
      ],
    },
    {
      q: 'Faut-il choisir un circuit tout pr\u00eat ou cr\u00e9er son propre voyage ?',
      a: [
        {
          type: 'text',
          text: 'Choisissez un circuit tout pr\u00eat quand l\u2019itin\u00e9raire et le rythme vous conviennent d\u00e9j\u00e0. Choisissez ',
        },
        { type: 'link', text: 'Cr\u00e9ez votre voyage', to: '/trip-builder' },
        {
          type: 'text',
          text: ' quand vos dates, vos centres d\u2019int\u00e9r\u00eat ou votre ville de d\u00e9part demandent une combinaison diff\u00e9rente. Nous ne pr\u00e9tendons jamais qu\u2019un itin\u00e9raire g\u00e9n\u00e9rique est sur mesure quand ce n\u2019est pas le cas. L\u2019outil s\u2019adresse aux voyages de plusieurs jours ; ',
        },
        { type: 'link', text: 'Cr\u00e9ez votre excursion d\u2019un jour', to: '/build-your-day-trip' },
        { type: 'text', text: ' est r\u00e9serv\u00e9 aux demandes d\u2019une seule journ\u00e9e.' },
      ],
    },
    {
      q: 'Le Sahara convient-il aux familles ?',
      a: [
        {
          type: 'text',
          text: 'Oui, c\u2019est possible, mais le choix du bon itin\u00e9raire compte bien plus qu\u2019une \u00e9tiquette g\u00e9n\u00e9rique \u00ab adapt\u00e9 aux familles \u00bb. Les parents doivent v\u00e9rifier les journ\u00e9es de route, la marche, l\u2019intensit\u00e9 des activit\u00e9s, les repas et le lieu de la nuit. Commencez par nos ',
        },
        { type: 'link', text: 'circuits au Maroc', to: '/tours' },
        { type: 'text', text: ' et demandez-nous de clarifier l\u2019itin\u00e9raire avant de r\u00e9server.' },
      ],
    },
    {
      q: 'Que faut-il attendre d\u2019une nuit dans le d\u00e9sert ?',
      a: [
        {
          type: 'text',
          text: 'Une nuit dans le d\u00e9sert n\u2019est pas un simple h\u00f4tel d\u00e9plac\u00e9 dans les dunes. Attendez-vous \u00e0 un changement de d\u00e9cor : grands espaces, temp\u00e9rature diff\u00e9rente apr\u00e8s le coucher du soleil, environnement \u00e9pur\u00e9 et soir\u00e9e au rythme lent. Lisez la page du ',
        },
        { type: 'link', text: 'camp de luxe dans le d\u00e9sert', to: '/luxury-camp' },
        {
          type: 'text',
          text: ' pour comprendre l\u2019esprit de l\u2019exp\u00e9rience, et interrogez-nous sur tout \u00e9quipement important pour vous avant de r\u00e9server.',
        },
      ],
    },
    {
      q: 'Quelle est la meilleure p\u00e9riode pour visiter le Sahara ?',
      a: [
        {
          type: 'text',
          text: 'Il n\u2019existe pas un mois parfait unique pour tous les voyageurs, mais le printemps et l\u2019automne sont g\u00e9n\u00e9ralement les saisons les plus favorables dans le sud du Sahara. Le bon choix d\u00e9pend aussi de vos pr\u00e9f\u00e9rences : journ\u00e9es plus chaudes, nuits plus fra\u00eeches ou calendrier pr\u00e9cis. Nous conseillons de comparer la saison avec votre confort et votre itin\u00e9raire plut\u00f4t que de vous fier \u00e0 un seul \u00ab meilleur mois \u00bb.',
        },
      ],
    },
    {
      q: 'Faut-il pr\u00e9voir des esp\u00e8ces au Maroc si l\u2019on a une carte bancaire ?',
      a: [
        {
          type: 'text',
          text: 'Prenez votre carte, mais ne misez pas tout votre voyage sur le paiement par carte. Les distributeurs sont r\u00e9pandus et les cartes Visa/Mastercard sont accept\u00e9es dans de nombreux h\u00f4tels ainsi que dans certains restaurants, boutiques et stations-service, mais certaines situations exigent des dirhams marocains. Gardez une r\u00e9serve d\u2019esp\u00e8ces pratique et v\u00e9rifiez les d\u00e9tails de paiement importants avant de quitter la ville.',
        },
      ],
    },
  ],
  links: 'Prochaines \u00e9tapes utiles',
  linksList: [
    ['/tours', 'Comparer les circuits au Maroc'],
    ['/destinations', 'Explorer les destinations'],
    ['/day-trips', 'Comprendre les excursions d\u2019un jour'],
    ['/contact', 'Parler \u00e0 une vraie personne'],
  ],
};

export const travelerDecisionGuideEs: TravelerDecisionContent = {
  eyebrow: 'Antes de reservar',
  title: 'Preguntas habituales de quien visita Marruecos por primera vez',
  intro: 'Si Marruecos es nuevo para ti, estas son las preguntas pr\u00e1cticas que nos gustar\u00eda ver respondidas antes de gastar dinero en un viaje. Mantenemos las respuestas honestas y enlazamos cada una con la p\u00e1gina donde puedes profundizar.',
  items: [
    {
      q: '\u00bfCu\u00e1ntos d\u00edas necesito realmente para Marruecos?',
      a: [
        { type: 'text', text: 'En una primera visita hay una gran diferencia entre ver lo esencial e intentar verlo todo. Un viaje corto puede funcionar muy bien si te centras en una sola regi\u00f3n; uno m\u00e1s largo te da tiempo para ciudades, monta\u00f1as y el S\u00e1hara sin convertir cada d\u00eda en un simple traslado. Si ya tienes tus fechas, usa nuestro ' },
        { type: 'link', text: 'creador de viajes', to: '/trip-builder' },
        { type: 'text', text: ' y dinos qu\u00e9 es lo m\u00e1s importante para ti.' },
      ],
    },
    {
      q: '\u00bfIr de Marrakech a Merzouga es un traslado r\u00e1pido?',
      a: [
        { type: 'text', text: 'No. Es un trayecto considerable, y tratarlo como un simple traslado de un punto a otro puede hacer que el viaje se sienta apresurado. La pregunta correcta es c\u00f3mo aprovechar la ruta: el Atlas, A\u00eft Ben Haddou, la zona del Dad\u00e8s y Todra pueden convertir el trayecto en parte de la experiencia. Nuestra ' },
        { type: 'link', text: 'gu\u00eda de Marrakech\u2013Merzouga', to: '/blog/marrakech-to-merzouga-roadtrip' },
        { type: 'text', text: ' explica la realidad pr\u00e1ctica.' },
      ],
    },
    {
      q: '\u00bfCu\u00e1l es la diferencia entre Merzouga y Erg Chebbi?',
      a: [
        { type: 'text', text: 'Merzouga es la localidad y la base tur\u00edstica; Erg Chebbi es el campo de dunas que la rodea. En la pr\u00e1ctica, los viajeros suelen alojarse o llegar a Merzouga y despu\u00e9s entrar en las dunas para las actividades del desierto. Empieza con la ' },
        { type: 'link', text: 'Gu\u00eda de Merzouga', to: '/merzouga-guide' },
        { type: 'text', text: ' y despu\u00e9s descubre nuestra experiencia de ' },
        { type: 'link', text: 'paseo en camello', to: '/camel-trekking' },
        { type: 'text', text: '.' },
      ],
    },
    {
      q: '\u00bfElijo un tour ya hecho o dise\u00f1o el m\u00edo?',
      a: [
        { type: 'text', text: 'Elige un tour ya hecho cuando la ruta y el ritmo ya se ajusten a lo que buscas. Elige ' },
        { type: 'link', text: 'Dise\u00f1a tu Viaje', to: '/trip-builder' },
        { type: 'text', text: ' cuando tus fechas, intereses o punto de partida necesiten una combinaci\u00f3n distinta. Nunca deber\u00edamos hacer pasar un itinerario gen\u00e9rico por algo personalizado cuando no lo es. El creador de viajes es para trayectos de varios d\u00edas; ' },
        { type: 'link', text: 'Crea tu Excursi\u00f3n de un D\u00eda', to: '/build-your-day-trip' },
        { type: 'text', text: ' es espec\u00edficamente para solicitudes de un solo d\u00eda.' },
      ],
    },
    {
      q: '\u00bfEs el S\u00e1hara c\u00f3modo para familias?',
      a: [
        { type: 'text', text: 'Puede serlo, pero elegir la ruta adecuada importa m\u00e1s que una etiqueta gen\u00e9rica de "apto para familias". Los padres deber\u00edan fijarse en los d\u00edas de conducci\u00f3n, la cantidad de caminata, la intensidad de las actividades, las comidas y d\u00f3nde se pasa la noche. Empieza con nuestros ' },
        { type: 'link', text: 'tours por Marruecos', to: '/tours' },
        { type: 'text', text: ' y p\u00eddenos que aclaremos la ruta antes de reservar.' },
      ],
    },
    {
      q: '\u00bfQu\u00e9 puedo esperar de una noche en el desierto?',
      a: [
        { type: 'text', text: 'Una noche en el desierto no es simplemente un hotel trasladado a las dunas. Espera un cambio de entorno: espacio abierto, un cambio de temperatura tras el atardecer, un entorno limitado y una noche mucho m\u00e1s tranquila. Lee la p\u00e1gina del ' },
        { type: 'link', text: 'Campamento de Lujo en el Desierto', to: '/luxury-camp' },
        { type: 'text', text: ' para saber qu\u00e9 tipo de experiencia es, y preg\u00fantanos por cualquier servicio que te importe antes de reservar.' },
      ],
    },
    {
      q: '\u00bfCu\u00e1ndo es un buen momento para visitar el S\u00e1hara?',
      a: [
        { type: 'text', text: 'No hay un mes perfecto \u00fanico para todos los viajeros, pero la primavera y el oto\u00f1o suelen ser las temporadas m\u00e1s favorables para el sur del S\u00e1hara. La elecci\u00f3n correcta tambi\u00e9n depende de si prefieres d\u00edas m\u00e1s c\u00e1lidos, noches m\u00e1s frescas o un calendario concreto. Recomendamos comparar la temporada con tu propia comodidad e itinerario en lugar de confiar en un \u00fanico "mejor mes".' },
      ],
    },
    {
      q: '\u00bfNecesito efectivo en Marruecos si tengo tarjeta bancaria?',
      a: [
        { type: 'text', text: 'Lleva una tarjeta, pero no planifiques todo el viaje contando con pagar siempre con ella. Los cajeros autom\u00e1ticos son abundantes y Visa/Mastercard se aceptan en muchos hoteles y en algunos restaurantes, tiendas y gasolineras, aunque algunas situaciones todav\u00eda requieren d\u00edrhams marroqu\u00edes. Mant\u00e9n una reserva de efectivo pr\u00e1ctica y confirma los detalles de pago importantes antes de salir de la ciudad.' },
      ],
    },
  ],
  links: 'Pr\u00f3ximos pasos \u00fatiles',
  linksList: [
    ['/tours', 'Comparar tours por Marruecos'],
    ['/destinations', 'Explorar destinos'],
    ['/day-trips', 'Entender las excursiones de un d\u00eda'],
    ['/contact', 'Habla con una persona real'],
  ],
};

export const travelerDecisionGuideIt: TravelerDecisionContent = {
  eyebrow: 'Prima di prenotare',
  title: 'Domande frequenti di chi visita il Marocco per la prima volta',
  intro: 'Se il Marocco \u00e8 una novit\u00e0 per voi, queste sono le domande pratiche a cui vorremmo avere risposta prima di spendere denaro per un viaggio. Manteniamo le risposte oneste e colleghiamo ciascuna alla pagina dove approfondire.',
  items: [
    {
      q: 'Quanti giorni servono davvero per il Marocco?',
      a: [
        { type: 'text', text: 'Per una prima visita c\'\u00e8 una grande differenza tra vedere i punti principali e voler vedere tutto. Un viaggio pi\u00f9 breve pu\u00f2 funzionare bene se ci si concentra su una sola regione; uno pi\u00f9 lungo d\u00e0 il tempo per citt\u00e0, montagne e Sahara senza trasformare ogni giorno in un trasferimento. Se avete gi\u00e0 le date, usate il nostro ' },
        { type: 'link', text: 'costruttore di viaggi', to: '/trip-builder' },
        { type: 'text', text: ' e diteci cosa conta di pi\u00f9 per voi.' },
      ],
    },
    {
      q: 'Da Marrakech a Merzouga \u00e8 un trasferimento rapido?',
      a: [
        { type: 'text', text: 'No. \u00c8 un viaggio consistente, e trattarlo come un semplice trasferimento punto a punto pu\u00f2 far sembrare la vacanza frettolosa. La domanda giusta \u00e8 come usare il percorso: l\'Atlante, A\u00eft Ben Haddou, la zona del Dades e Todra possono trasformare il tragitto in parte dell\'esperienza. La nostra ' },
        { type: 'link', text: 'guida Marrakech\u2013Merzouga', to: '/blog/marrakech-to-merzouga-roadtrip' },
        { type: 'text', text: ' spiega la realt\u00e0 pratica.' },
      ],
    },
    {
      q: 'Qual \u00e8 la differenza tra Merzouga ed Erg Chebbi?',
      a: [
        { type: 'text', text: 'Merzouga \u00e8 il paese e la base turistica; Erg Chebbi \u00e8 il campo di dune che lo circonda. In pratica, i viaggiatori di solito soggiornano o arrivano a Merzouga e poi entrano nelle dune per le attivit\u00e0 nel deserto. Iniziate con la ' },
        { type: 'link', text: 'Guida di Merzouga', to: '/merzouga-guide' },
        { type: 'text', text: ' e poi scoprite la nostra esperienza di ' },
        { type: 'link', text: 'trekking in dromedario', to: '/camel-trekking' },
        { type: 'text', text: '.' },
      ],
    },
    {
      q: 'Scelgo un tour gi\u00e0 pronto o costruisco il mio?',
      a: [
        { type: 'text', text: 'Scegliete un tour gi\u00e0 pronto quando l\'itinerario e il ritmo vi convengono gi\u00e0. Scegliete ' },
        { type: 'link', text: 'Progetta il Tuo Viaggio', to: '/trip-builder' },
        { type: 'text', text: ' quando le vostre date, interessi o punto di partenza richiedono una combinazione diversa. Non dovremmo mai far passare un itinerario generico per personalizzato quando non lo \u00e8. Il costruttore \u00e8 per viaggi di pi\u00f9 giorni; ' },
        { type: 'link', text: 'Crea la Tua Gita di un Giorno', to: '/build-your-day-trip' },
        { type: 'text', text: ' \u00e8 specifico per richieste di un solo giorno.' },
      ],
    },
    {
      q: 'Il Sahara \u00e8 comodo per le famiglie?',
      a: [
        { type: 'text', text: 'Pu\u00f2 esserlo, ma scegliere il percorso giusto conta pi\u00f9 di un\'etichetta generica "adatto alle famiglie". I genitori dovrebbero valutare i giorni di guida, la quantit\u00e0 di camminata, l\'intensit\u00e0 delle attivit\u00e0, i pasti e dove si passa la notte. Iniziate con i nostri ' },
        { type: 'link', text: 'tour del Marocco', to: '/tours' },
        { type: 'text', text: ' e chiedeteci di chiarire il percorso prima di prenotare.' },
      ],
    },
    {
      q: 'Cosa aspettarsi da una notte nel deserto?',
      a: [
        { type: 'text', text: 'Una notte nel deserto non \u00e8 semplicemente un hotel spostato tra le dune. Aspettatevi un cambio di ambiente: spazio aperto, un cambiamento di temperatura dopo il tramonto, un contesto limitato e una serata molto pi\u00f9 lenta. Leggete la pagina del ' },
        { type: 'link', text: 'Campo di Lusso nel Deserto', to: '/luxury-camp' },
        { type: 'text', text: ' per capire che tipo di esperienza sar\u00e0, e chiedeteci di qualsiasi servizio importante per voi prima di prenotare.' },
      ],
    },
    {
      q: 'Quando \u00e8 un buon momento per visitare il Sahara?',
      a: [
        { type: 'text', text: 'Non esiste un unico mese perfetto per tutti i viaggiatori, ma primavera e autunno sono generalmente le stagioni pi\u00f9 favorevoli per il Sahara meridionale. La scelta giusta dipende anche dal preferire giornate pi\u00f9 calde, notti pi\u00f9 fresche o un calendario specifico. Consigliamo di confrontare la stagione con il vostro comfort e il vostro itinerario invece di affidarvi a un unico "mese migliore".' },
      ],
    },
    {
      q: 'Serve contante in Marocco se ho una carta bancaria?',
      a: [
        { type: 'text', text: 'Portate una carta, ma non pianificate l\'intero viaggio contando solo sui pagamenti con carta. I bancomat sono diffusi e Visa/Mastercard sono accettate in molti hotel e in alcuni ristoranti, negozi e stazioni di servizio, mentre alcune situazioni richiedono ancora dirham marocchini. Mantenete una riserva di contante pratica e confermate i dettagli di pagamento importanti prima di lasciare la citt\u00e0.' },
      ],
    },
  ],
  links: 'Prossimi passi utili',
  linksList: [
    ['/tours', 'Confronta i tour del Marocco'],
    ['/destinations', 'Esplora le destinazioni'],
    ['/day-trips', 'Scopri le gite di un giorno'],
    ['/contact', 'Parla con una persona reale'],
  ],
};

export const travelerDecisionGuideDe: TravelerDecisionContent = {
  eyebrow: 'Vor der Buchung',
  title: 'Fragen, die Erstbesucher meist haben',
  intro: 'Wenn Marokko f\u00fcr Sie neu ist, sind dies die praktischen Fragen, die wir vor der Buchung einer Reise beantwortet haben m\u00f6chten. Wir halten die Antworten ehrlich und verlinken jede mit der Seite, auf der Sie mehr erfahren.',
  items: [
    {
      q: 'Wie viele Tage brauche ich wirklich f\u00fcr Marokko?',
      a: [
        { type: 'text', text: 'Bei einem ersten Besuch gibt es einen gro\u00dfen Unterschied zwischen dem Sehen der Highlights und dem Versuch, alles zu sehen. Eine k\u00fcrzere Reise kann gut funktionieren, wenn Sie sich auf eine Region konzentrieren; eine l\u00e4ngere Reise gibt Zeit f\u00fcr St\u00e4dte, Berge und die Sahara, ohne jeden Tag zu einem Transfer zu machen. Wenn Sie Ihre Termine schon kennen, nutzen Sie unseren ' },
        { type: 'link', text: 'Reiseplaner', to: '/trip-builder' },
        { type: 'text', text: ' und sagen Sie uns, was Ihnen am wichtigsten ist.' },
      ],
    },
    {
      q: 'Ist Marrakesch nach Merzouga ein schneller Transfer?',
      a: [
        { type: 'text', text: 'Nein. Es ist eine betr\u00e4chtliche Reise, und sie als einfachen Punkt-zu-Punkt-Transfer zu behandeln, kann den Urlaub hektisch wirken lassen. Die bessere Frage ist, wie man die Route nutzt: der Atlas, A\u00eft Ben Haddou, das Dad\u00e8s-Gebiet und Todra k\u00f6nnen die Fahrt zu einem Teil des Erlebnisses machen. Unser ' },
        { type: 'link', text: 'Marrakesch\u2013Merzouga-Guide', to: '/blog/marrakech-to-merzouga-roadtrip' },
        { type: 'text', text: ' erkl\u00e4rt die praktische Realit\u00e4t.' },
      ],
    },
    {
      q: 'Was ist der Unterschied zwischen Merzouga und Erg Chebbi?',
      a: [
        { type: 'text', text: 'Merzouga ist die Siedlung und touristische Basis; Erg Chebbi ist das D\u00fcnenfeld darum herum. In der Praxis \u00fcbernachten oder kommen Reisende meist in Merzouga an und gehen dann in die D\u00fcnen f\u00fcr W\u00fcstenaktivit\u00e4ten. Beginnen Sie mit dem ' },
        { type: 'link', text: 'Merzouga-Guide', to: '/merzouga-guide' },
        { type: 'text', text: ' und entdecken Sie dann unser ' },
        { type: 'link', text: 'Kamelreiten', to: '/camel-trekking' },
        { type: 'text', text: '-Erlebnis.' },
      ],
    },
    {
      q: 'Soll ich eine fertige Tour w\u00e4hlen oder meine eigene erstellen?',
      a: [
        { type: 'text', text: 'W\u00e4hlen Sie eine fertige Tour, wenn Route und Tempo bereits zu Ihnen passen. W\u00e4hlen Sie ' },
        { type: 'link', text: 'Reise Gestalten', to: '/trip-builder' },
        { type: 'text', text: ', wenn Ihre Termine, Interessen oder Ihr Ausgangspunkt eine andere Kombination erfordern. Wir sollten niemals vorgeben, dass eine generische Reiseroute pers\u00f6nlich ist, wenn sie es nicht ist. Der Planer ist f\u00fcr mehrt\u00e4gige Reisen; ' },
        { type: 'link', text: 'Ihren Tagesausflug Gestalten', to: '/build-your-day-trip' },
        { type: 'text', text: ' ist speziell f\u00fcr eint\u00e4gige Anfragen.' },
      ],
    },
    {
      q: 'Ist die Sahara f\u00fcr Familien angenehm?',
      a: [
        { type: 'text', text: 'Das kann sie sein, aber die richtige Route ist wichtiger als ein generisches \u201efamilienfreundlich"-Label. Eltern sollten auf Fahrtage, Gehstrecken, Aktivit\u00e4tsintensit\u00e4t, Essensregelungen und den Ort der \u00dcbernachtung achten. Beginnen Sie mit unseren ' },
        { type: 'link', text: 'Marokko-Touren', to: '/tours' },
        { type: 'text', text: ' und lassen Sie sich die Route vor der Buchung erkl\u00e4ren.' },
      ],
    },
    {
      q: 'Was ist von einer Nacht in der W\u00fcste zu erwarten?',
      a: [
        { type: 'text', text: 'Eine W\u00fcstennacht ist nicht einfach ein in die D\u00fcnen verlegtes Hotel. Erwarten Sie einen Umgebungswechsel: offenen Raum, eine andere Temperatur nach Sonnenuntergang, eine begrenzte Umgebung und einen deutlich ruhigeren Abend. Lesen Sie die Seite zum ' },
        { type: 'link', text: 'Luxus-W\u00fcstencamp', to: '/luxury-camp' },
        { type: 'text', text: ', um zu wissen, was das Erlebnis sein soll, und fragen Sie uns vor der Buchung nach jeder Ausstattung, die Ihnen wichtig ist.' },
      ],
    },
    {
      q: 'Wann ist eine gute Zeit f\u00fcr einen Besuch der Sahara?',
      a: [
        { type: 'text', text: 'Es gibt keinen einzigen perfekten Monat f\u00fcr jeden Reisenden, aber Fr\u00fchling und Herbst sind in der s\u00fcdlichen Sahara meist die g\u00fcnstigsten Jahreszeiten. Die richtige Wahl h\u00e4ngt auch davon ab, ob Sie w\u00e4rmere Tage, k\u00fchlere N\u00e4chte oder einen bestimmten Reiseplan bevorzugen. Wir empfehlen, die Jahreszeit mit Ihrem eigenen Komfort und Ihrer Reiseroute zu vergleichen, statt sich auf einen einzigen \u201ebesten Monat" zu verlassen.' },
      ],
    },
    {
      q: 'Brauche ich Bargeld in Marokko, wenn ich eine Bankkarte habe?',
      a: [
        { type: 'text', text: 'Nehmen Sie eine Karte mit, planen Sie die ganze Reise aber nicht allein um Kartenzahlungen herum. Geldautomaten sind weit verbreitet, und Visa/Mastercard werden in vielen Hotels sowie einigen Restaurants, Gesch\u00e4ften und Tankstellen akzeptiert, w\u00e4hrend manche Situationen weiterhin marokkanische Dirham erfordern. Behalten Sie eine praktische Bargeldreserve und kl\u00e4ren Sie wichtige Zahlungsdetails, bevor Sie die Stadt verlassen.' },
      ],
    },
  ],
  links: 'N\u00fctzliche n\u00e4chste Schritte',
  linksList: [
    ['/tours', 'Marokko-Touren vergleichen'],
    ['/destinations', 'Reiseziele entdecken'],
    ['/day-trips', 'Tagesausfl\u00fcge verstehen'],
    ['/contact', 'Mit einer echten Person sprechen'],
  ],
};

export const travelerDecisionGuideNl: TravelerDecisionContent = {
  eyebrow: 'Voor u boekt',
  title: 'Vragen die een eerste bezoeker meestal heeft',
  intro: 'Als Marokko nieuw voor u is, zijn dit de praktische vragen waarop wij graag antwoord zouden willen voordat we geld uitgeven aan een reis. We houden de antwoorden eerlijk en verwijzen elk antwoord naar de pagina waar u meer kunt lezen.',
  items: [
    {
      q: 'Hoeveel dagen heb ik echt nodig voor Marokko?',
      a: [
        { type: 'text', text: 'Bij een eerste bezoek is er een groot verschil tussen de hoogtepunten zien en alles willen zien. Een kortere reis kan goed werken als u zich op \u00e9\u00e9n regio richt; een langere reis geeft tijd voor steden, bergen en de Sahara zonder elke dag in een verplaatsing te veranderen. Als u uw data al kent, gebruik dan onze ' },
        { type: 'link', text: 'reisplanner', to: '/trip-builder' },
        { type: 'text', text: ' en laat ons weten wat voor u het belangrijkst is.' },
      ],
    },
    {
      q: 'Is Marrakech naar Merzouga een snelle verplaatsing?',
      a: [
        { type: 'text', text: 'Nee. Het is een aanzienlijke reis, en het als een eenvoudige verplaatsing van punt A naar B behandelen kan de vakantie gehaast laten aanvoelen. De betere vraag is hoe u de route gebruikt: de Atlas, A\u00eft Ben Haddou, het Dad\u00e8s-gebied en Todra kunnen de rit onderdeel maken van de ervaring. Onze ' },
        { type: 'link', text: 'Marrakech\u2013Merzouga-gids', to: '/blog/marrakech-to-merzouga-roadtrip' },
        { type: 'text', text: ' legt de praktische realiteit uit.' },
      ],
    },
    {
      q: 'Wat is het verschil tussen Merzouga en Erg Chebbi?',
      a: [
        { type: 'text', text: 'Merzouga is het dorp en de toeristische basis; Erg Chebbi is het duinveld daaromheen. In de praktijk verblijven of arriveren reizigers meestal bij Merzouga en gaan dan de duinen in voor woestijnactiviteiten. Begin met de ' },
        { type: 'link', text: 'Merzouga-gids', to: '/merzouga-guide' },
        { type: 'text', text: ' en ontdek daarna onze ' },
        { type: 'link', text: 'kameeltrekking', to: '/camel-trekking' },
        { type: 'text', text: '-ervaring.' },
      ],
    },
    {
      q: 'Kies ik een kant-en-klare reis of stel ik mijn eigen reis samen?',
      a: [
        { type: 'text', text: 'Kies een kant-en-klare reis wanneer de route en het tempo u al goed passen. Kies ' },
        { type: 'link', text: 'Stel Uw Reis Samen', to: '/trip-builder' },
        { type: 'text', text: ' wanneer uw data, interesses of vertrekpunt een andere combinatie nodig hebben. We mogen nooit doen alsof een generiek reisschema persoonlijk is als dat niet zo is. De samensteller is voor meerdaagse reizen; ' },
        { type: 'link', text: 'Stel Uw Dagtrip Samen', to: '/build-your-day-trip' },
        { type: 'text', text: ' is specifiek voor eendaagse aanvragen.' },
      ],
    },
    {
      q: 'Is de Sahara comfortabel voor gezinnen?',
      a: [
        { type: 'text', text: 'Dat kan, maar de juiste route kiezen is belangrijker dan een algemeen "gezinsvriendelijk" label. Ouders moeten letten op rijdagen, de hoeveelheid wandelen, de intensiteit van activiteiten, maaltijdregelingen en waar de overnachting plaatsvindt. Begin met onze ' },
        { type: 'link', text: 'Marokko-reizen', to: '/tours' },
        { type: 'text', text: ' en vraag ons de route te verduidelijken voordat u boekt.' },
      ],
    },
    {
      q: 'Wat kan ik verwachten van een nacht in de woestijn?',
      a: [
        { type: 'text', text: 'Een woestijnnacht is niet simpelweg een hotel dat naar de duinen is verplaatst. Verwacht een verandering van omgeving: open ruimte, een andere temperatuur na zonsondergang, een beperkte omgeving en een veel rustiger avond. Lees de pagina over het ' },
        { type: 'link', text: 'Luxe Woestijnkamp', to: '/luxury-camp' },
        { type: 'text', text: ' zodat u weet wat de ervaring bedoeld is te zijn, en vraag ons naar elke voorziening die voor u belangrijk is voordat u boekt.' },
      ],
    },
    {
      q: 'Wanneer is een goede tijd om de Sahara te bezoeken?',
      a: [
        { type: 'text', text: 'Er is geen enkele perfecte maand voor elke reiziger, maar lente en herfst zijn over het algemeen de meest gunstige seizoenen voor de zuidelijke Sahara. De juiste keuze hangt ook af van of u warmere dagen, koelere nachten of een specifiek schema verkiest. Wij raden aan het seizoen te vergelijken met uw eigen comfort en reisschema in plaats van te vertrouwen op \u00e9\u00e9n enkele "beste maand".' },
      ],
    },
    {
      q: 'Heb ik contant geld nodig in Marokko als ik een bankkaart heb?',
      a: [
        { type: 'text', text: 'Neem een kaart mee, maar plan niet uw hele reis rond kaartbetalingen. Geldautomaten zijn wijdverspreid en Visa/Mastercard worden geaccepteerd door veel hotels en sommige restaurants, winkels en benzinestations, terwijl sommige situaties nog Marokkaanse dirham vereisen. Houd een praktische contante reserve aan en bevestig belangrijke betalingsdetails voordat u de stad verlaat.' },
      ],
    },
  ],
  links: 'Nuttige volgende stappen',
  linksList: [
    ['/tours', 'Vergelijk Marokko-reizen'],
    ['/destinations', 'Ontdek bestemmingen'],
    ['/day-trips', 'Begrijp dagtrips'],
    ['/contact', 'Spreek met een echte persoon'],
  ],
};

export const travelerDecisionGuidePt: TravelerDecisionContent = {
  eyebrow: 'Antes de reservar',
  title: 'Perguntas que quem visita Marrocos por primeira vez costuma ter',
  intro: 'Se Marrocos \u00e9 novidade para si, estas s\u00e3o as perguntas pr\u00e1ticas que gostar\u00edamos de ver respondidas antes de gastar dinheiro numa viagem. Mantemos as respostas honestas e associamos cada uma \u00e0 p\u00e1gina onde pode saber mais.',
  items: [
    {
      q: 'Quantos dias preciso realmente para Marrocos?',
      a: [
        { type: 'text', text: 'Numa primeira visita h\u00e1 uma grande diferen\u00e7a entre ver os destaques e tentar ver tudo. Uma viagem mais curta pode funcionar bem se se concentrar numa \u00fanica regi\u00e3o; uma mais longa d\u00e1 tempo para cidades, montanhas e o Saara sem transformar cada dia numa transfer\u00eancia. Se j\u00e1 tem as suas datas, use o nosso ' },
        { type: 'link', text: 'criador de viagens', to: '/trip-builder' },
        { type: 'text', text: ' e diga-nos o que \u00e9 mais importante para si.' },
      ],
    },
    {
      q: 'Marraquexe a Merzouga \u00e9 uma transfer\u00eancia r\u00e1pida?',
      a: [
        { type: 'text', text: 'N\u00e3o. \u00c9 uma viagem consider\u00e1vel, e trat\u00e1-la como uma simples transfer\u00eancia de ponto a ponto pode fazer com que as f\u00e9rias pare\u00e7am apressadas. A melhor pergunta \u00e9 como aproveitar o percurso: o Atlas, A\u00eft Ben Haddou, a zona do Dad\u00e8s e Todra podem transformar o trajeto em parte da experi\u00eancia. O nosso ' },
        { type: 'link', text: 'guia Marraquexe\u2013Merzouga', to: '/blog/marrakech-to-merzouga-roadtrip' },
        { type: 'text', text: ' explica a realidade pr\u00e1tica.' },
      ],
    },
    {
      q: 'Qual \u00e9 a diferen\u00e7a entre Merzouga e Erg Chebbi?',
      a: [
        { type: 'text', text: 'Merzouga \u00e9 a localidade e a base tur\u00edstica; Erg Chebbi \u00e9 o campo de dunas em seu redor. Na pr\u00e1tica, os viajantes costumam ficar ou chegar a Merzouga e depois entrar nas dunas para as atividades do deserto. Comece com o ' },
        { type: 'link', text: 'Guia de Merzouga', to: '/merzouga-guide' },
        { type: 'text', text: ' e depois descubra a nossa experi\u00eancia de ' },
        { type: 'link', text: 'passeio de camelo', to: '/camel-trekking' },
        { type: 'text', text: '.' },
      ],
    },
    {
      q: 'Escolho uma viagem j\u00e1 feita ou crio a minha pr\u00f3pria?',
      a: [
        { type: 'text', text: 'Escolha uma viagem j\u00e1 feita quando o percurso e o ritmo j\u00e1 lhe convierem. Escolha ' },
        { type: 'link', text: 'Crie a Sua Viagem', to: '/trip-builder' },
        { type: 'text', text: ' quando as suas datas, interesses ou ponto de partida precisarem de uma combina\u00e7\u00e3o diferente. Nunca devemos fazer passar um itiner\u00e1rio gen\u00e9rico por personalizado quando n\u00e3o o \u00e9. O criador \u00e9 para viagens de v\u00e1rios dias; ' },
        { type: 'link', text: 'Crie a Sua Excurs\u00e3o de um Dia', to: '/build-your-day-trip' },
        { type: 'text', text: ' \u00e9 especificamente para pedidos de um \u00fanico dia.' },
      ],
    },
    {
      q: 'O Saara \u00e9 confort\u00e1vel para fam\u00edlias?',
      a: [
        { type: 'text', text: 'Pode ser, mas escolher o percurso certo importa mais do que uma etiqueta gen\u00e9rica de "adequado para fam\u00edlias". Os pais devem olhar para os dias de condu\u00e7\u00e3o, a quantidade de caminhada, a intensidade das atividades, as refei\u00e7\u00f5es e onde se passa a noite. Comece com as nossas ' },
        { type: 'link', text: 'viagens a Marrocos', to: '/tours' },
        { type: 'text', text: ' e pe\u00e7a-nos para esclarecer o percurso antes de reservar.' },
      ],
    },
    {
      q: 'O que devo esperar de uma noite no deserto?',
      a: [
        { type: 'text', text: 'Uma noite no deserto n\u00e3o \u00e9 simplesmente um hotel transferido para as dunas. Espere uma mudan\u00e7a de ambiente: espa\u00e7o aberto, uma temperatura diferente ap\u00f3s o p\u00f4r do sol, um ambiente limitado e uma noite muito mais tranquila. Leia a p\u00e1gina do ' },
        { type: 'link', text: 'Acampamento de Luxo no Deserto', to: '/luxury-camp' },
        { type: 'text', text: ' para saber que tipo de experi\u00eancia \u00e9, e pergunte-nos sobre qualquer comodidade importante para si antes de reservar.' },
      ],
    },
    {
      q: 'Quando \u00e9 uma boa altura para visitar o Saara?',
      a: [
        { type: 'text', text: 'N\u00e3o h\u00e1 um \u00fanico m\u00eas perfeito para todos os viajantes, mas a primavera e o outono s\u00e3o geralmente as esta\u00e7\u00f5es mais favor\u00e1veis para o Saara meridional. A escolha certa tamb\u00e9m depende de preferir dias mais quentes, noites mais frescas ou um calend\u00e1rio espec\u00edfico. Recomendamos comparar a esta\u00e7\u00e3o com o seu pr\u00f3prio conforto e itiner\u00e1rio em vez de confiar num \u00fanico "melhor m\u00eas".' },
      ],
    },
    {
      q: 'Preciso de dinheiro em Marrocos se tiver cart\u00e3o banc\u00e1rio?',
      a: [
        { type: 'text', text: 'Leve um cart\u00e3o, mas n\u00e3o planeie toda a viagem contando apenas com pagamentos por cart\u00e3o. Os multibancos s\u00e3o abundantes e Visa/Mastercard s\u00e3o aceites em muitos hot\u00e9is e em alguns restaurantes, lojas e postos de combust\u00edvel, embora algumas situa\u00e7\u00f5es ainda exijam dirhams marroquinos. Mantenha uma reserva de dinheiro pr\u00e1tica e confirme detalhes de pagamento importantes antes de deixar a cidade.' },
      ],
    },
  ],
  links: 'Pr\u00f3ximos passos \u00fateis',
  linksList: [
    ['/tours', 'Comparar viagens a Marrocos'],
    ['/destinations', 'Explorar destinos'],
    ['/day-trips', 'Entender as excurs\u00f5es de um dia'],
    ['/contact', 'Fale com uma pessoa real'],
  ],
};

export const travelerDecisionGuideZh: TravelerDecisionContent = {
  eyebrow: '\u9884\u8ba2\u4e4b\u524d',
  title: '\u9996\u6b21\u5230\u8bbf\u8005\u901a\u5e38\u4f1a\u95ee\u7684\u95ee\u9898',
  intro: '\u5982\u679c\u4f60\u5bf9\u6469\u6d1b\u54e5\u8fd8\u4e0d\u719f\u6089\uff0c\u4ee5\u4e0b\u662f\u6211\u4eec\u8ba4\u4e3a\u5728\u82b1\u94b1\u51fa\u884c\u4e4b\u524d\u5e94\u8be5\u5f04\u6e05\u695a\u7684\u5b9e\u9645\u95ee\u9898\u3002\u6211\u4eec\u4f1a\u7ed9\u51fa\u8bda\u5b9e\u7684\u7b54\u6848\uff0c\u5e76\u5728\u6bcf\u4e2a\u7b54\u6848\u4e2d\u94fe\u63a5\u5230\u53ef\u4ee5\u8fdb\u4e00\u6b65\u4e86\u89e3\u7684\u9875\u9762\u3002',
  items: [
    {
      q: '\u53bb\u6469\u6d1b\u54e5\u5230\u5e95\u9700\u8981\u51e0\u5929\uff1f',
      a: [
        { type: 'text', text: '\u5bf9\u4e8e\u7b2c\u4e00\u6b21\u9020\u8bbf\uff0c\u770b\u91cd\u70b9\u548c\u60f3\u770b\u904d\u4e00\u5207\u4e4b\u95f4\u6709\u5f88\u5927\u533a\u522b\u3002\u5982\u679c\u53ea\u4e13\u6ce8\u4e00\u4e2a\u5730\u533a\uff0c\u8f83\u77ed\u7684\u884c\u7a0b\u4e5f\u80fd\u5f88\u7cbe\u5f69\uff1b\u66f4\u957f\u7684\u884c\u7a0b\u5219\u80fd\u8ba9\u4f60\u6709\u65f6\u95f4\u6e38\u89c8\u57ce\u5e02\u3001\u5c71\u8109\u548c\u6492\u54c8\u62c9\uff0c\u800c\u4e0d\u5fc5\u628a\u6bcf\u4e00\u5929\u90fd\u53d8\u6210\u8d76\u8def\u3002\u5982\u679c\u4f60\u5df2\u7ecf\u786e\u5b9a\u4e86\u65e5\u671f\uff0c\u53ef\u4ee5\u4f7f\u7528\u6211\u4eec\u7684' },
        { type: 'link', text: '\u884c\u7a0b\u89c4\u5212\u5de5\u5177', to: '/trip-builder' },
        { type: 'text', text: '\uff0c\u544a\u8bc9\u6211\u4eec\u4f60\u6700\u770b\u91cd\u4ec0\u4e48\u3002' },
      ],
    },
    {
      q: '\u4ece\u9a6c\u62c9\u5580\u4ec0\u5230\u6885\u5c14\u7956\u5361\u662f\u5feb\u901f\u8f6c\u573a\u5417\uff1f',
      a: [
        { type: 'text', text: '\u4e0d\u662f\u3002\u8fd9\u662f\u4e00\u6bb5\u76f8\u5f53\u957f\u7684\u8def\u7a0b\uff0c\u5982\u679c\u628a\u5b83\u5f53\u4f5c\u7b80\u5355\u7684\u70b9\u5bf9\u70b9\u8f6c\u573a\uff0c\u6574\u6bb5\u884c\u7a0b\u4f1a\u663e\u5f97\u5f88\u4ed3\u4fc3\u3002\u66f4\u503c\u5f97\u95ee\u7684\u662f\u5982\u4f55\u5229\u7528\u8fd9\u6bb5\u8def\u2014\u2014\u963f\u7279\u62c9\u65af\u5c71\u8109\u3001\u827e\u672c\u54c8\u675c\u3001\u8fbe\u5fb7\u65af\u5730\u533a\u548c\u6258\u5fb7\u62c9\u90fd\u53ef\u4ee5\u8ba9\u8fd9\u6bb5\u8f66\u7a0b\u672c\u8eab\u6210\u4e3a\u4f53\u9a8c\u7684\u4e00\u90e8\u5206\u3002\u6211\u4eec\u7684' },
        { type: 'link', text: '\u9a6c\u62c9\u5580\u4ec0\u2014\u6885\u5c14\u7956\u5361\u8def\u7ebf\u6307\u5357', to: '/blog/marrakech-to-merzouga-roadtrip' },
        { type: 'text', text: '\u8bf4\u660e\u4e86\u5b9e\u9645\u60c5\u51b5\u3002' },
      ],
    },
    {
      q: '\u6885\u5c14\u7956\u5361\u548c\u5384\u5c14\u683c\u5207\u6bd4\u6709\u4ec0\u4e48\u533a\u522b\uff1f',
      a: [
        { type: 'text', text: '\u6885\u5c14\u7956\u5361\u662f\u57ce\u9547\u548c\u65c5\u6e38\u57fa\u5730\uff1b\u5384\u5c14\u683c\u5207\u6bd4\u5219\u662f\u5b83\u5468\u56f4\u7684\u6c99\u4e18\u5730\u5e26\u3002\u5b9e\u9645\u4e0a\uff0c\u65c5\u884c\u8005\u901a\u5e38\u4f1a\u5728\u6885\u5c14\u7956\u5361\u4f4f\u5bbf\u6216\u62b5\u8fbe\uff0c\u7136\u540e\u518d\u8fdb\u5165\u6c99\u4e18\u533a\u57df\u8fdb\u884c\u6c99\u6f20\u6d3b\u52a8\u3002\u5148\u770b\u770b' },
        { type: 'link', text: '\u6885\u5c14\u7956\u5361\u6307\u5357', to: '/merzouga-guide' },
        { type: 'text', text: '\uff0c\u7136\u540e\u518d\u4e86\u89e3\u6211\u4eec\u7684' },
        { type: 'link', text: '\u9a91\u9a86\u9a7c', to: '/camel-trekking' },
        { type: 'text', text: '\u4f53\u9a8c\u3002' },
      ],
    },
    {
      q: '\u5e94\u8be5\u9009\u62e9\u73b0\u6210\u7684\u65c5\u884c\u56e2\uff0c\u8fd8\u662f\u81ea\u5df1\u5b9a\u5236\u884c\u7a0b\uff1f',
      a: [
        { type: 'text', text: '\u5982\u679c\u8def\u7ebf\u548c\u8282\u594f\u5df2\u7ecf\u9002\u5408\u4f60\uff0c\u5c31\u9009\u62e9\u73b0\u6210\u7684\u65c5\u884c\u56e2\u3002\u5982\u679c\u4f60\u7684\u65e5\u671f\u3001\u5174\u8da3\u6216\u51fa\u53d1\u5730\u9700\u8981\u4e0d\u540c\u7684\u7ec4\u5408\u65b9\u5f0f\uff0c\u5c31\u9009\u62e9' },
        { type: 'link', text: '\u5b9a\u5236\u4f60\u7684\u884c\u7a0b', to: '/trip-builder' },
        { type: 'text', text: '\u3002\u6211\u4eec\u7edd\u4e0d\u4f1a\u628a\u4e00\u4e2a\u901a\u7528\u884c\u7a0b\u5305\u88c5\u6210\u4e2a\u6027\u5316\u65b9\u6848\u3002\u8be5\u5de5\u5177\u9002\u7528\u4e8e\u591a\u65e5\u884c\u7a0b\uff1b' },
        { type: 'link', text: '\u5b9a\u5236\u4f60\u7684\u4e00\u65e5\u6e38', to: '/build-your-day-trip' },
        { type: 'text', text: '\u5219\u4e13\u4e3a\u5355\u65e5\u9700\u6c42\u8bbe\u8ba1\u3002' },
      ],
    },
    {
      q: '\u6492\u54c8\u62c9\u9002\u5408\u5e26\u7740\u5bb6\u4eba\u4e00\u8d77\u53bb\u5417\uff1f',
      a: [
        { type: 'text', text: '\u662f\u53ef\u4ee5\u7684\uff0c\u4f46\u9009\u5bf9\u8def\u7ebf\u6bd4\u4e00\u4e2a\u6cdb\u6cdb\u7684"\u9002\u5408\u5bb6\u5ead"\u6807\u7b7e\u66f4\u91cd\u8981\u3002\u5bb6\u957f\u5e94\u8be5\u5173\u6ce8\u884c\u8f66\u5929\u6570\u3001\u6b65\u884c\u91cf\u3001\u6d3b\u52a8\u5f3a\u5ea6\u3001\u7528\u9910\u5b89\u6392\u4ee5\u53ca\u591c\u5bbf\u5730\u70b9\u3002\u53ef\u4ee5\u5148\u770b\u770b\u6211\u4eec\u7684' },
        { type: 'link', text: '\u6469\u6d1b\u54e5\u65c5\u884c\u56e2', to: '/tours' },
        { type: 'text', text: '\uff0c\u9884\u8ba2\u524d\u8bf7\u6211\u4eec\u8bf4\u6e05\u695a\u5177\u4f53\u8def\u7ebf\u3002' },
      ],
    },
    {
      q: '\u5728\u6c99\u6f20\u8fc7\u591c\u5e94\u8be5\u671f\u5f85\u4ec0\u4e48\uff1f',
      a: [
        { type: 'text', text: '\u6c99\u6f20\u4e4b\u591c\u4e0d\u53ea\u662f\u628a\u9152\u5e97\u642c\u8fdb\u4e86\u6c99\u4e18\u3002\u4f60\u4f1a\u4f53\u9a8c\u5230\u73af\u5883\u7684\u8f6c\u53d8\uff1a\u5f00\u9614\u7684\u7a7a\u95f4\u3001\u65e5\u843d\u540e\u6c14\u6e29\u7684\u53d8\u5316\u3001\u6709\u9650\u7684\u5468\u8fb9\u8bbe\u65bd\uff0c\u4ee5\u53ca\u4e00\u4e2a\u8282\u594f\u6162\u5f97\u591a\u7684\u591c\u665a\u3002\u8bf7\u5148\u9605\u8bfb' },
        { type: 'link', text: '\u8c6a\u534e\u6c99\u6f20\u8425\u5730', to: '/luxury-camp' },
        { type: 'text', text: '\u9875\u9762\uff0c\u4e86\u89e3\u8fd9\u6bb5\u4f53\u9a8c\u7684\u672c\u610f\uff0c\u5e76\u5728\u9884\u8ba2\u524d\u5411\u6211\u4eec\u8be2\u95ee\u4efb\u4f55\u4f60\u5728\u610f\u7684\u8bbe\u65bd\u7ec6\u8282\u3002' },
      ],
    },
    {
      q: '\u4ec0\u4e48\u65f6\u5019\u662f\u6e38\u89c8\u6492\u54c8\u62c9\u7684\u597d\u65f6\u673a\uff1f',
      a: [
        { type: 'text', text: '\u5e76\u4e0d\u5b58\u5728\u9002\u5408\u6240\u6709\u65c5\u884c\u8005\u7684\u5355\u4e00\u5b8c\u7f8e\u6708\u4efd\uff0c\u4f46\u6625\u5b63\u548c\u79cb\u5b63\u901a\u5e38\u662f\u6492\u54c8\u62c9\u5357\u90e8\u8f83\u4e3a\u7406\u60f3\u7684\u5b63\u8282\u3002\u5177\u4f53\u9009\u62e9\u8fd8\u53d6\u51b3\u4e8e\u4f60\u66f4\u504f\u597d\u708e\u70ed\u7684\u767d\u5929\u3001\u51c9\u723d\u7684\u591c\u665a\uff0c\u8fd8\u662f\u67d0\u4e2a\u7279\u5b9a\u7684\u884c\u7a0b\u5b89\u6392\u3002\u6211\u4eec\u5efa\u8bae\u628a\u5b63\u8282\u4e0e\u4f60\u81ea\u5df1\u7684\u8212\u9002\u5ea6\u548c\u884c\u7a0b\u7ed3\u5408\u8d77\u6765\u6bd4\u8f83\uff0c\u800c\u4e0d\u662f\u4f9d\u8d56\u67d0\u4e2a\u5355\u4e00\u7684"\u6700\u4f73\u6708\u4efd"\u3002' },
      ],
    },
    {
      q: '\u5982\u679c\u6211\u6709\u94f6\u884c\u5361\uff0c\u5728\u6469\u6d1b\u54e5\u8fd8\u9700\u8981\u73b0\u91d1\u5417\uff1f',
      a: [
        { type: 'text', text: '\u53ef\u4ee5\u5e26\u4e00\u5f20\u94f6\u884c\u5361\uff0c\u4f46\u4e0d\u8981\u628a\u6574\u6bb5\u884c\u7a0b\u5b8c\u5168\u4f9d\u8d56\u5237\u5361\u652f\u4ed8\u3002\u81ea\u52a8\u53d6\u6b3e\u673a\u5206\u5e03\u5e7f\u6cdb\uff0cVisa/\u4e07\u4e8b\u8fbe\u5361\u5728\u8bb8\u591a\u9152\u5e97\u4ee5\u53ca\u90e8\u5206\u9910\u5385\u3001\u5546\u5e97\u548c\u52a0\u6cb9\u7ad9\u90fd\u53ef\u4ee5\u4f7f\u7528\uff0c\u4f46\u6709\u4e9b\u573a\u5408\u4ecd\u7136\u9700\u8981\u6469\u6d1b\u54e5\u8fea\u62c9\u59c6\u3002\u5efa\u8bae\u968f\u8eab\u4fdd\u7559\u4e00\u4e9b\u5b9e\u7528\u7684\u73b0\u91d1\u50a8\u5907\uff0c\u5e76\u5728\u79bb\u5f00\u57ce\u5e02\u524d\u786e\u8ba4\u91cd\u8981\u7684\u652f\u4ed8\u7ec6\u8282\u3002' },
      ],
    },
  ],
  links: '\u63a5\u4e0b\u6765\u53ef\u4ee5\u505a\u7684\u4e8b',
  linksList: [
    ['/tours', '\u6bd4\u8f83\u6469\u6d1b\u54e5\u65c5\u884c\u56e2'],
    ['/destinations', '\u63a2\u7d22\u76ee\u7684\u5730'],
    ['/day-trips', '\u4e86\u89e3\u4e00\u65e5\u6e38'],
    ['/contact', '\u4e0e\u771f\u4eba\u5ba2\u670d\u4ea4\u6d41'],
  ],
};

export const travelerDecisionGuideJa: TravelerDecisionContent = {
  eyebrow: '\u4e88\u7d04\u306e\u524d\u306b',
  title: '\u521d\u3081\u3066\u30e2\u30ed\u30c3\u30b3\u3092\u8a2a\u308c\u308b\u65b9\u304b\u3089\u3088\u304f\u3044\u305f\u3060\u304f\u8cea\u554f',
  intro: '\u30e2\u30ed\u30c3\u30b3\u304c\u521d\u3081\u3066\u306e\u65b9\u306e\u305f\u3081\u306b\u3001\u65c5\u884c\u306b\u304a\u91d1\u3092\u4f7f\u3046\u524d\u306b\u660e\u78ba\u306b\u3057\u3066\u304a\u304d\u305f\u3044\u5b9f\u7528\u7684\u306a\u8cea\u554f\u3092\u307e\u3068\u3081\u307e\u3057\u305f\u3002\u56de\u7b54\u306f\u6b63\u76f4\u3067\u3042\u308b\u3053\u3068\u3092\u5fc3\u304c\u3051\u3001\u305d\u308c\u305e\u308c\u3055\u3089\u306b\u8a73\u3057\u304f\u77e5\u308b\u305f\u3081\u306e\u30da\u30fc\u30b8\u3078\u30ea\u30f3\u30af\u3057\u3066\u3044\u307e\u3059\u3002',
  items: [
    {
      q: '\u30e2\u30ed\u30c3\u30b3\u306b\u306f\u5b9f\u969b\u4f55\u65e5\u5fc5\u8981\u3067\u3059\u304b\uff1f',
      a: [
        { type: 'text', text: '\u521d\u3081\u3066\u306e\u8a2a\u554f\u3067\u306f\u3001\u898b\u3069\u3053\u308d\u3092\u898b\u308b\u3053\u3068\u3068\u3059\u3079\u3066\u3092\u898b\u3088\u3046\u3068\u3059\u308b\u3053\u3068\u306e\u9593\u306b\u5927\u304d\u306a\u9055\u3044\u304c\u3042\u308a\u307e\u3059\u30021\u3064\u306e\u5730\u57df\u306b\u96c6\u4e2d\u3059\u308b\u306a\u3089\u77ed\u3044\u65c5\u7a0b\u3067\u3082\u5341\u5206\u6e80\u8db3\u3067\u304d\u307e\u3059\u3057\u3001\u9577\u3044\u65c5\u7a0b\u306a\u3089\u90fd\u5e02\u3001\u5c71\u3001\u30b5\u30cf\u30e9\u3092\u5de1\u308b\u6642\u9593\u3092\u3001\u6bce\u65e5\u3092\u79fb\u52d5\u3060\u3051\u306b\u305b\u305a\u306b\u78ba\u4fdd\u3067\u304d\u307e\u3059\u3002\u3059\u3067\u306b\u65e5\u7a0b\u304c\u6c7a\u307e\u3063\u3066\u3044\u308b\u5834\u5408\u306f\u3001' },
        { type: 'link', text: '\u65c5\u7a0b\u4f5c\u6210\u30c4\u30fc\u30eb', to: '/trip-builder' },
        { type: 'text', text: '\u3092\u4f7f\u3063\u3066\u3001\u4f55\u3092\u4e00\u756a\u91cd\u8996\u3059\u308b\u304b\u6559\u3048\u3066\u304f\u3060\u3055\u3044\u3002' },
      ],
    },
    {
      q: '\u30de\u30e9\u30b1\u30b7\u30e5\u304b\u3089\u30e1\u30eb\u30ba\u30fc\u30ac\u3078\u306e\u79fb\u52d5\u306f\u77ed\u6642\u9593\u3067\u6e08\u307f\u307e\u3059\u304b\uff1f',
      a: [
        { type: 'text', text: '\u3044\u3044\u3048\u3002\u304b\u306a\u308a\u306e\u9577\u8ddd\u96e2\u79fb\u52d5\u3067\u3042\u308a\u3001\u5358\u7d14\u306a\u5730\u70b9\u9593\u306e\u79fb\u52d5\u3068\u3057\u3066\u6271\u3046\u3068\u65c5\u5168\u4f53\u304c\u614c\u305f\u3060\u3057\u304f\u611f\u3058\u3089\u308c\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002\u3088\u308a\u826f\u3044\u554f\u3044\u306f\u3001\u3053\u306e\u30eb\u30fc\u30c8\u3092\u3069\u3046\u6d3b\u7528\u3059\u308b\u304b\u3067\u3059\u2014\u2014\u30a2\u30c8\u30e9\u30b9\u5c71\u8108\u3001\u30a2\u30a4\u30c8\u30fb\u30d9\u30f3\u30fb\u30cf\u30c9\u30a5\u3001\u30c0\u30c7\u30b9\u5730\u57df\u3001\u30c8\u30c9\u30e9\u306f\u3001\u3053\u306e\u79fb\u52d5\u81ea\u4f53\u3092\u4f53\u9a13\u306e\u4e00\u90e8\u306b\u3059\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u3059\u3002\u79c1\u305f\u3061\u306e' },
        { type: 'link', text: '\u30de\u30e9\u30b1\u30b7\u30e5\u2015\u30e1\u30eb\u30ba\u30fc\u30ac\u30ac\u30a4\u30c9', to: '/blog/marrakech-to-merzouga-roadtrip' },
        { type: 'text', text: '\u3067\u5b9f\u969b\u306e\u69d8\u5b50\u3092\u8aac\u660e\u3057\u3066\u3044\u307e\u3059\u3002' },
      ],
    },
    {
      q: '\u30e1\u30eb\u30ba\u30fc\u30ac\u3068\u30a8\u30eb\u30b0\u30fb\u30b7\u30a7\u30d3\u30fc\u306e\u9055\u3044\u306f\u4f55\u3067\u3059\u304b\uff1f',
      a: [
        { type: 'text', text: '\u30e1\u30eb\u30ba\u30fc\u30ac\u306f\u753a\u3067\u3042\u308a\u89b3\u5149\u306e\u62e0\u70b9\u3001\u30a8\u30eb\u30b0\u30fb\u30b7\u30a7\u30d3\u30fc\u306f\u305d\u306e\u5468\u56f2\u306e\u7802\u4e18\u5730\u5e2f\u3067\u3059\u3002\u5b9f\u969b\u306b\u306f\u3001\u65c5\u884c\u8005\u306f\u901a\u5e38\u30e1\u30eb\u30ba\u30fc\u30ac\u306b\u6ede\u5728\u307e\u305f\u306f\u5230\u7740\u3057\u3001\u305d\u306e\u5f8c\u7802\u6f20\u3067\u306e\u30a2\u30af\u30c6\u30a3\u30d3\u30c6\u30a3\u306e\u305f\u3081\u306b\u7802\u4e18\u3078\u5165\u308a\u307e\u3059\u3002\u307e\u305a\u306f' },
        { type: 'link', text: '\u30e1\u30eb\u30ba\u30fc\u30ac\u30ac\u30a4\u30c9', to: '/merzouga-guide' },
        { type: 'text', text: '\u3092\u3054\u89a7\u3044\u305f\u3060\u304d\u3001\u305d\u306e\u5f8c' },
        { type: 'link', text: '\u30e9\u30af\u30c0\u30c8\u30ec\u30c3\u30ad\u30f3\u30b0', to: '/camel-trekking' },
        { type: 'text', text: '\u4f53\u9a13\u3092\u3054\u89a7\u304f\u3060\u3055\u3044\u3002' },
      ],
    },
    {
      q: '\u65e2\u88fd\u306e\u30c4\u30a2\u30fc\u3092\u9078\u3076\u3079\u304d\u304b\u3001\u81ea\u5206\u3067\u65c5\u7a0b\u3092\u7d44\u3080\u3079\u304d\u304b\uff1f',
      a: [
        { type: 'text', text: '\u30eb\u30fc\u30c8\u3068\u30da\u30fc\u30b9\u304c\u3059\u3067\u306b\u5408\u3063\u3066\u3044\u308b\u5834\u5408\u306f\u65e2\u88fd\u306e\u30c4\u30a2\u30fc\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044\u3002\u65e5\u7a0b\u3084\u8208\u5473\u3001\u51fa\u767a\u5730\u70b9\u304c\u7570\u306a\u308b\u7d44\u307f\u5408\u308f\u305b\u3092\u5fc5\u8981\u3068\u3059\u308b\u5834\u5408\u306f' },
        { type: 'link', text: '\u65c5\u3092\u8a08\u753b\u3059\u308b', to: '/trip-builder' },
        { type: 'text', text: '\u3092\u304a\u9078\u3073\u304f\u3060\u3055\u3044\u3002\u6c4e\u7528\u7684\u306a\u65c5\u7a0b\u3092\u500b\u5225\u4ed5\u7acb\u3066\u3067\u3042\u308b\u304b\u306e\u3088\u3046\u306b\u6271\u3046\u3053\u3068\u306f\u6c7a\u3057\u3066\u3042\u308a\u307e\u305b\u3093\u3002\u3053\u306e\u4f5c\u6210\u30c4\u30fc\u30eb\u306f\u8907\u6570\u65e5\u306e\u65c5\u306e\u305f\u3081\u306e\u3082\u306e\u3067\u3001' },
        { type: 'link', text: '\u65e5\u5e30\u308a\u65c5\u884c\u3092\u8a08\u753b\u3059\u308b', to: '/build-your-day-trip' },
        { type: 'text', text: '\u306f1\u65e5\u9650\u308a\u306e\u30ea\u30af\u30a8\u30b9\u30c8\u5c02\u7528\u3067\u3059\u3002' },
      ],
    },
    {
      q: '\u30b5\u30cf\u30e9\u306f\u5bb6\u65cf\u65c5\u884c\u306b\u5411\u3044\u3066\u3044\u307e\u3059\u304b\uff1f',
      a: [
        { type: 'text', text: '\u5411\u3044\u3066\u3044\u308b\u5834\u5408\u3082\u3042\u308a\u307e\u3059\u304c\u3001\u300c\u5bb6\u65cf\u5411\u3051\u300d\u3068\u3044\u3046\u4e00\u822c\u7684\u306a\u30e9\u30d9\u30eb\u3088\u308a\u3082\u6b63\u3057\u3044\u30eb\u30fc\u30c8\u3092\u9078\u3076\u3053\u3068\u306e\u65b9\u304c\u91cd\u8981\u3067\u3059\u3002\u4fdd\u8b77\u8005\u306f\u79fb\u52d5\u65e5\u3001\u6b69\u304f\u91cf\u3001\u30a2\u30af\u30c6\u30a3\u30d3\u30c6\u30a3\u306e\u5f37\u5ea6\u3001\u98df\u4e8b\u306e\u5185\u5bb9\u3001\u305d\u3057\u3066\u5bbf\u6cca\u5834\u6240\u3092\u78ba\u8a8d\u3059\u3079\u304d\u3067\u3059\u3002\u307e\u305a\u306f' },
        { type: 'link', text: '\u30e2\u30ed\u30c3\u30b3\u30c4\u30a2\u30fc', to: '/tours' },
        { type: 'text', text: '\u3092\u3054\u89a7\u3044\u305f\u3060\u304d\u3001\u4e88\u7d04\u524d\u306b\u30eb\u30fc\u30c8\u306e\u8a73\u7d30\u3092\u79c1\u305f\u3061\u306b\u304a\u5c0b\u306d\u304f\u3060\u3055\u3044\u3002' },
      ],
    },
    {
      q: '\u7802\u6f20\u3067\u306e\u4e00\u591c\u306b\u306f\u4f55\u3092\u671f\u5f85\u3059\u308c\u3070\u3044\u3044\u3067\u3059\u304b\uff1f',
      a: [
        { type: 'text', text: '\u7802\u6f20\u306e\u591c\u306f\u3001\u5358\u306b\u30db\u30c6\u30eb\u304c\u7802\u4e18\u306b\u79fb\u52d5\u3057\u305f\u3060\u3051\u306e\u3082\u306e\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002\u74b0\u5883\u306e\u5909\u5316\u3092\u671f\u5f85\u3057\u3066\u304f\u3060\u3055\u3044\u2014\u2014\u958b\u3051\u305f\u7a7a\u9593\u3001\u65e5\u6ca1\u5f8c\u306e\u6c17\u6e29\u306e\u5909\u5316\u3001\u9650\u3089\u308c\u305f\u5468\u8fba\u74b0\u5883\u3001\u305d\u3057\u3066\u306f\u308b\u304b\u306b\u3086\u3063\u305f\u308a\u3068\u3057\u305f\u591c\u3067\u3059\u3002' },
        { type: 'link', text: '\u8c6a\u83ef\u7802\u6f20\u30ad\u30e3\u30f3\u30d7', to: '/luxury-camp' },
        { type: 'text', text: '\u306e\u30da\u30fc\u30b8\u3092\u304a\u8aad\u307f\u3044\u305f\u3060\u304d\u3001\u305d\u306e\u4f53\u9a13\u304c\u3069\u306e\u3088\u3046\u306a\u3082\u306e\u304b\u3092\u77e5\u308a\u3001\u4e88\u7d04\u524d\u306b\u3054\u81ea\u8eab\u306b\u3068\u3063\u3066\u91cd\u8981\u306a\u8a2d\u5099\u306b\u3064\u3044\u3066\u79c1\u305f\u3061\u306b\u304a\u5c0b\u306d\u304f\u3060\u3055\u3044\u3002' },
      ],
    },
    {
      q: '\u30b5\u30cf\u30e9\u3092\u8a2a\u308c\u308b\u306e\u306b\u826f\u3044\u6642\u671f\u306f\u3044\u3064\u3067\u3059\u304b\uff1f',
      a: [
        { type: 'text', text: '\u3059\u3079\u3066\u306e\u65c5\u884c\u8005\u306b\u3068\u3063\u3066\u5b8c\u74a7\u306a\u6708\u3068\u3044\u3046\u3082\u306e\u306f\u4e00\u3064\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u304c\u3001\u30b5\u30cf\u30e9\u5357\u90e8\u3067\u306f\u4e00\u822c\u7684\u306b\u6625\u3068\u79cb\u304c\u597d\u6761\u4ef6\u306e\u5b63\u7bc0\u3067\u3059\u3002\u6b63\u3057\u3044\u9078\u629e\u306f\u3001\u6696\u304b\u3044\u65e5\u4e2d\u3001\u6dbc\u3057\u3044\u591c\u3001\u3042\u308b\u3044\u306f\u7279\u5b9a\u306e\u65c5\u7a0b\u3092\u597d\u3080\u304b\u3069\u3046\u304b\u306b\u3082\u5de6\u53f3\u3055\u308c\u307e\u3059\u3002\u5358\u4e00\u306e\u300c\u6700\u9069\u306a\u6708\u300d\u306b\u983c\u308b\u306e\u3067\u306f\u306a\u304f\u3001\u5b63\u7bc0\u3068\u3054\u81ea\u8eab\u306e\u5feb\u9069\u3055\u3084\u65c5\u7a0b\u3092\u6bd4\u8f03\u3059\u308b\u3053\u3068\u3092\u304a\u52e7\u3081\u3057\u307e\u3059\u3002' },
      ],
    },
    {
      q: '\u9280\u884c\u30ab\u30fc\u30c9\u304c\u3042\u308c\u3070\u3001\u30e2\u30ed\u30c3\u30b3\u3067\u73fe\u91d1\u306f\u5fc5\u8981\u3067\u3059\u304b\uff1f',
      a: [
        { type: 'text', text: '\u30ab\u30fc\u30c9\u306f\u6301\u53c2\u3057\u3066\u304f\u3060\u3055\u3044\u3002\u305f\u3060\u3057\u65c5\u5168\u4f53\u3092\u30ab\u30fc\u30c9\u6c7a\u6e08\u3060\u3051\u306b\u983c\u3063\u3066\u8a08\u753b\u3057\u306a\u3044\u3067\u304f\u3060\u3055\u3044\u3002ATM\u306f\u5e83\u304f\u666e\u53ca\u3057\u3066\u304a\u308a\u3001Visa\u3084Mastercard\u306f\u591a\u304f\u306e\u30db\u30c6\u30eb\u304a\u3088\u3073\u4e00\u90e8\u306e\u30ec\u30b9\u30c8\u30e9\u30f3\u3001\u5e97\u8217\u3001\u30ac\u30bd\u30ea\u30f3\u30b9\u30bf\u30f3\u30c9\u3067\u5229\u7528\u3067\u304d\u307e\u3059\u304c\u3001\u4e00\u90e8\u306e\u72b6\u6cc1\u3067\u306f\u30e2\u30ed\u30c3\u30b3\u30fb\u30c7\u30a3\u30eb\u30cf\u30e0\u304c\u4eca\u3082\u5fc5\u8981\u3067\u3059\u3002\u5b9f\u7528\u7684\u306a\u73fe\u91d1\u306e\u4e88\u5099\u3092\u6301\u3061\u3001\u90fd\u5e02\u3092\u51fa\u308b\u524d\u306b\u91cd\u8981\u306a\u652f\u6255\u3044\u306e\u8a73\u7d30\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002' },
      ],
    },
  ],
  links: '\u6b21\u306b\u5f79\u7acb\u3064\u30b9\u30c6\u30c3\u30d7',
  linksList: [
    ['/tours', '\u30e2\u30ed\u30c3\u30b3\u30c4\u30a2\u30fc\u3092\u6bd4\u8f03\u3059\u308b'],
    ['/destinations', '\u76ee\u7684\u5730\u3092\u63a2\u7d22\u3059\u308b'],
    ['/day-trips', '\u65e5\u5e30\u308a\u65c5\u884c\u306b\u3064\u3044\u3066\u77e5\u308b'],
    ['/contact', '\u5b9f\u969b\u306e\u62c5\u5f53\u8005\u306b\u76f8\u8ac7\u3059\u308b'],
  ],
};

export const travelerDecisionGuideKo: TravelerDecisionContent = {
  eyebrow: '\uc608\uc57d \uc804\uc5d0',
  title: '\ucc98\uc74c \ubc29\ubb38\ud558\ub294 \ubd84\ub4e4\uc774 \ud754\ud788 \uad81\uae08\ud574\ud558\ub294 \uc9c8\ubb38',
  intro: '\ubaa8\ub85c\ucf54\uac00 \ucc98\uc74c\uc774\uc2dc\ub77c\uba74, \uc5ec\ud589\uc5d0 \ub3c8\uc744 \uc4f0\uae30 \uc804\uc5d0 \uba85\ud655\ud788 \uc54c\uace0 \uc2f6\uc744 \ub9cc\ud55c \uc2e4\uc6a9\uc801\uc778 \uc9c8\ubb38\ub4e4\uc744 \uc815\ub9ac\ud588\uc2b5\ub2c8\ub2e4. \ub2f5\ubcc0\uc740 \uc194\uc9c1\ud558\uac8c \uc720\uc9c0\ud558\uba70, \ub354 \uc790\uc138\ud788 \uc54c\uc544\ubcfc \uc218 \uc788\ub294 \ud398\uc774\uc9c0\ub85c \uac01\uac01 \uc5f0\uacb0\ud574 \ub4dc\ub9bd\ub2c8\ub2e4.',
  items: [
    {
      q: '\ubaa8\ub85c\ucf54 \uc5ec\ud589\uc5d0\ub294 \uc2e4\uc81c\ub85c \uba70\uce60\uc774 \ud544\uc694\ud55c\uac00\uc694?',
      a: [
        { type: 'text', text: '\uccab \ubc29\ubb38\uc5d0\uc11c\ub294 \ud575\uc2ec\ub9cc \ubcf4\ub294 \uac83\uacfc \ubaa8\ub4e0 \uac83\uc744 \ub2e4 \ubcf4\ub824\ub294 \uac83 \uc0ac\uc774\uc5d0 \ud070 \ucc28\uc774\uac00 \uc788\uc2b5\ub2c8\ub2e4. \ud55c \uc9c0\uc5ed\uc5d0 \uc9d1\uc911\ud55c\ub2e4\uba74 \uc9e7\uc740 \uc5ec\ud589\ub3c4 \ucda9\ubd84\ud788 \uc54c\ucc28\uace0, \ub354 \uae34 \uc5ec\ud589\uc774\ub77c\uba74 \ub9e4\uc77c\uc744 \uc774\ub3d9\uc73c\ub85c\ub9cc \ucc44\uc6b0\uc9c0 \uc54a\uace0 \ub3c4\uc2dc, \uc0b0, \uc0ac\ud558\ub77c\ub97c \ub458\ub7ec\ubcfc \uc2dc\uac04\uc744 \uac00\uc9c8 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ub0a0\uc9dc\uac00 \uc774\ubbf8 \uc815\ud574\uc838 \uc788\ub2e4\uba74 \uc800\ud76c' },
        { type: 'link', text: '\uc5ec\ud589 \uc124\uacc4 \ub3c4\uad6c', to: '/trip-builder' },
        { type: 'text', text: '\ub97c \uc0ac\uc6a9\ud574 \uac00\uc7a5 \uc911\uc694\ud558\uac8c \uc0dd\uac01\ud558\ub294 \uc810\uc744 \uc54c\ub824\uc8fc\uc138\uc694.' },
      ],
    },
    {
      q: '\ub9c8\ub77c\ucf00\uc2dc\uc5d0\uc11c \uba54\ub974\uc8fc\uac00\uae4c\uc9c0\ub294 \ube60\ub974\uac8c \uc774\ub3d9\ud560 \uc218 \uc788\ub098\uc694?',
      a: [
        { type: 'text', text: '\uc544\ub2d9\ub2c8\ub2e4. \uc0c1\ub2f9\ud788 \uae34 \uc5ec\uc815\uc774\uba70, \uc774\ub97c \ub2e8\uc21c\ud55c \uc9c0\uc810 \uac04 \uc774\ub3d9\uc73c\ub85c \uc0dd\uac01\ud558\uba74 \uc5ec\ud589 \uc804\uccb4\uac00 \uc11c\ub450\ub974\ub294 \ub290\ub08c\uc774 \ub4e4 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ub354 \uc911\uc694\ud55c \uc9c8\ubb38\uc740 \uc774 \uacbd\ub85c\ub97c \uc5b4\ub5bb\uac8c \ud65c\uc6a9\ud558\ub290\ub0d0\uc785\ub2c8\ub2e4\u2014\u2014\uc544\ud2c0\ub77c\uc2a4, \uc544\uc774\ud2b8 \ubca4 \ud558\ub450, \ub2e4\ub370\uc2a4 \uc9c0\uc5ed, \ud1a0\ub4dc\ub77c\ub294 \uc774 \uc774\ub3d9 \uc790\uccb4\ub97c \uc5ec\ud589 \uacbd\ud5d8\uc758 \uc77c\ubd80\ub85c \ub9cc\ub4e4\uc5b4 \uc904 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc800\ud76c' },
        { type: 'link', text: '\ub9c8\ub77c\ucf00\uc2dc\u2013\uba54\ub974\uc8fc\uac00 \uac00\uc774\ub4dc', to: '/blog/marrakech-to-merzouga-roadtrip' },
        { type: 'text', text: '\uc5d0\uc11c \uc2e4\uc81c \uc0c1\ud669\uc744 \uc124\uba85\ud574 \ub4dc\ub9bd\ub2c8\ub2e4.' },
      ],
    },
    {
      q: '\uba54\ub974\uc8fc\uac00\uc640 \uc5d0\ub974\uadf8 \uc170\ube44\uc758 \ucc28\uc774\ub294 \ubb34\uc5c7\uc778\uac00\uc694?',
      a: [
        { type: 'text', text: '\uba54\ub974\uc8fc\uac00\ub294 \ub9c8\uc744\uc774\uc790 \uad00\uad11 \uac70\uc810\uc774\uba70, \uc5d0\ub974\uadf8 \uc170\ube44\ub294 \uadf8 \uc8fc\ubcc0\uc758 \uc0ac\uad6c \uc9c0\ub300\uc785\ub2c8\ub2e4. \uc2e4\uc81c\ub85c \uc5ec\ud589\uc790\ub4e4\uc740 \ubcf4\ud1b5 \uba54\ub974\uc8fc\uac00\uc5d0\uc11c \uc219\ubc15\ud558\uac70\ub098 \ub3c4\ucc29\ud55c \ub4a4, \uc0ac\ub9c9 \ud65c\ub3d9\uc744 \uc704\ud574 \uc0ac\uad6c\ub85c \ub4e4\uc5b4\uac11\ub2c8\ub2e4. \uba3c\uc800' },
        { type: 'link', text: '\uba54\ub974\uc8fc\uac00 \uac00\uc774\ub4dc', to: '/merzouga-guide' },
        { type: 'text', text: '\ub97c \ud655\uc778\ud558\uc2dc\uace0, \uc774\uc5b4\uc11c \uc800\ud76c' },
        { type: 'link', text: '\ub099\ud0c0 \ud2b8\ub808\ud0b9', to: '/camel-trekking' },
        { type: 'text', text: '\uccb4\ud5d8\uc744 \uc0b4\ud3b4\ubcf4\uc138\uc694.' },
      ],
    },
    {
      q: '\uc644\uc131\ub41c \ud22c\uc5b4\ub97c \uc120\ud0dd\ud574\uc57c \ud560\uae4c\uc694, \uc9c1\uc811 \uc124\uacc4\ud574\uc57c \ud560\uae4c\uc694?',
      a: [
        { type: 'text', text: '\uacbd\ub85c\uc640 \uc18d\ub3c4\uac00 \uc774\ubbf8 \ub9c8\uc74c\uc5d0 \ub4e0\ub2e4\uba74 \uc644\uc131\ub41c \ud22c\uc5b4\ub97c \uc120\ud0dd\ud558\uc138\uc694. \ub0a0\uc9dc, \uad00\uc2ec\uc0ac, \ucd9c\ubc1c\uc9c0\uac00 \ub2e4\ub978 \uc870\ud569\uc744 \ud544\uc694\ub85c \ud55c\ub2e4\uba74' },
        { type: 'link', text: '\uc5ec\ud589 \uc124\uacc4\ud558\uae30', to: '/trip-builder' },
        { type: 'text', text: '\ub97c \uc120\ud0dd\ud558\uc138\uc694. \uc77c\ubc18\uc801\uc778 \uc77c\uc815\uc744 \uac1c\uc778\ud654\ub41c \uac83\ucc98\ub7fc \ud3ec\uc7a5\ud558\ub294 \uc77c\uc740 \uc808\ub300 \ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. \uc774 \uc124\uacc4 \ub3c4\uad6c\ub294 \uc5ec\ub7ec \ub0a0\uc9dc\uc758 \uc5ec\ud589\uc744 \uc704\ud55c \uac83\uc774\uace0, ' },
        { type: 'link', text: '\uc77c\uc77c \uc5ec\ud589 \uc124\uacc4\ud558\uae30', to: '/build-your-day-trip' },
        { type: 'text', text: '\ub294 \ud558\ub8e8\uc9dc\ub9ac \uc694\uccad\uc744 \uc704\ud55c \uc804\uc6a9 \ub3c4\uad6c\uc785\ub2c8\ub2e4.' },
      ],
    },
    {
      q: '\uc0ac\ud558\ub77c\ub294 \uac00\uc871 \uc5ec\ud589\uc5d0 \uc801\ud569\ud55c\uac00\uc694?',
      a: [
        { type: 'text', text: '\uc801\ud569\ud560 \uc218 \uc788\uc9c0\ub9cc, \uc77c\ubc18\uc801\uc778 "\uac00\uc871 \uce5c\ud654\uc801" \ud45c\ud604\ubcf4\ub2e4 \uc62c\ubc14\ub978 \uacbd\ub85c \uc120\ud0dd\uc774 \ub354 \uc911\uc694\ud569\ub2c8\ub2e4. \ubd80\ubaa8\ub2d8\uc740 \uc6b4\uc804\uc77c, \uac77\ub294 \uc591, \ud65c\ub3d9 \uac15\ub3c4, \uc2dd\uc0ac \uad6c\uc131, \uadf8\ub9ac\uace0 \uc219\ubc15 \uc7a5\uc18c\ub97c \ud655\uc778\ud574\uc57c \ud569\ub2c8\ub2e4. \uba3c\uc800 \uc800\ud76c' },
        { type: 'link', text: '\ubaa8\ub85c\ucf54 \ud22c\uc5b4', to: '/tours' },
        { type: 'text', text: '\ub97c \uc0b4\ud3b4\ubcf4\uc2dc\uace0, \uc608\uc57d \uc804\uc5d0 \uacbd\ub85c\ub97c \uba85\ud655\ud788 \uc124\uba85\ud574 \ub2ec\ub77c\uace0 \uc694\uccad\ud574 \uc8fc\uc138\uc694.' },
      ],
    },
    {
      q: '\uc0ac\ub9c9\uc5d0\uc11c \ud558\ub8fb\ubc24\uc744 \ubcf4\ub0bc \ub54c \ubb34\uc5c7\uc744 \uae30\ub300\ud574\uc57c \ud558\ub098\uc694?',
      a: [
        { type: 'text', text: '\uc0ac\ub9c9\uc5d0\uc11c\uc758 \ud558\ub8fb\ubc24\uc740 \ub2e8\uc21c\ud788 \ud638\ud154\uc744 \uc0ac\uad6c\ub85c \uc62e\uae34 \uac83\uc774 \uc544\ub2d9\ub2c8\ub2e4. \ud658\uacbd\uc758 \ubcc0\ud654\ub97c \uc608\uc0c1\ud558\uc138\uc694\u2014\u2014\uac1c\ubc29\ub41c \uacf5\uac04, \uc77c\ubab0 \ud6c4 \ub2ec\ub77c\uc9c0\ub294 \uae30\uc628, \uc81c\ud55c\ub41c \uc8fc\ubcc0 \uc2dc\uc124, \uadf8\ub9ac\uace0 \ud6e8\uc52c \ub290\uae0b\ud55c \uc800\ub141 \uc2dc\uac04\uc785\ub2c8\ub2e4. ' },
        { type: 'link', text: '\ub7ed\uc154\ub9ac \uc0ac\ub9c9 \ucea0\ud504', to: '/luxury-camp' },
        { type: 'text', text: ' \ud398\uc774\uc9c0\ub97c \uc77d\uace0 \uc5b4\ub5a4 \uccb4\ud5d8\uc778\uc9c0 \ubbf8\ub9ac \ud30c\uc545\ud558\uc2dc\uace0, \uc608\uc57d \uc804\uc5d0 \uc911\uc694\ud558\uac8c \uc0dd\uac01\ud558\ub294 \uc2dc\uc124\uc5d0 \ub300\ud574 \ubb38\uc758\ud574 \uc8fc\uc138\uc694.' },
      ],
    },
    {
      q: '\uc0ac\ud558\ub77c\ub97c \ubc29\ubb38\ud558\uae30 \uc88b\uc740 \uc2dc\uae30\ub294 \uc5b8\uc81c\uc778\uac00\uc694?',
      a: [
        { type: 'text', text: '\ubaa8\ub4e0 \uc5ec\ud589\uc790\uc5d0\uac8c \uc644\ubcbd\ud55c \ub2e8 \ud558\ub098\uc758 \ub2ec\uc740 \uc5c6\uc9c0\ub9cc, \ubd04\uacfc \uac00\uc744\uc774 \uc0ac\ud558\ub77c \ub0a8\ubd80\uc5d0\uc11c \ub300\uccb4\ub85c \ub354 \uc88b\uc740 \uacc4\uc808\uc785\ub2c8\ub2e4. \uc62c\ubc14\ub978 \uc120\ud0dd\uc740 \ub354 \ub530\ub73b\ud55c \ub0ae, \ub354 \uc300\uc300\ud55c \ubc24, \ub610\ub294 \ud2b9\uc815 \uc77c\uc815\uc744 \uc120\ud638\ud558\ub294\uc9c0\uc5d0\ub3c4 \uc88c\uc6b0\ub429\ub2c8\ub2e4. \ud558\ub098\uc758 "\ucd5c\uc801\uc758 \ub2ec"\uc5d0\ub9cc \uc758\uc874\ud558\uae30\ubcf4\ub2e4\ub294 \uacc4\uc808\uc744 \ubcf8\uc778\uc758 \ud3b8\uc548\ud568\uacfc \uc77c\uc815\uc5d0 \ub9de\ucdb0 \ube44\uad50\ud574 \ubcf4\uc2dc\uae38 \uad8c\uc7a5\ud569\ub2c8\ub2e4.' },
      ],
    },
    {
      q: '\uc740\ud589 \uce74\ub4dc\uac00 \uc788\uc5b4\ub3c4 \ubaa8\ub85c\ucf54\uc5d0\uc11c \ud604\uae08\uc774 \ud544\uc694\ud55c\uac00\uc694?',
      a: [
        { type: 'text', text: '\uce74\ub4dc\ub294 \ucc59\uae30\ub418, \uc5ec\ud589 \uc804\uccb4\ub97c \uce74\ub4dc \uacb0\uc81c\uc5d0\ub9cc \uc758\uc874\ud574 \uacc4\ud68d\ud558\uc9c0\ub294 \ub9c8\uc138\uc694. ATM\uc740 \ub110\ub9ac \ud37c\uc838 \uc788\uace0 Visa/Mastercard\ub294 \ub9ce\uc740 \ud638\ud154\uacfc \uc77c\ubd80 \ub808\uc2a4\ud1a0\ub791, \uc0c1\uc810, \uc8fc\uc720\uc18c\uc5d0\uc11c \uc0ac\uc6a9\ud560 \uc218 \uc788\uc9c0\ub9cc, \uc77c\ubd80 \uc0c1\ud669\uc5d0\uc11c\ub294 \uc5ec\uc804\ud788 \ubaa8\ub85c\ucf54 \ub514\ub974\ud568\uc774 \ud544\uc694\ud569\ub2c8\ub2e4. \uc2e4\uc6a9\uc801\uc778 \ud604\uae08\uc744 \ub530\ub85c \uc900\ube44\ud558\uace0, \ub3c4\uc2dc\ub97c \ub5a0\ub098\uae30 \uc804\uc5d0 \uc911\uc694\ud55c \uacb0\uc81c \uc138\ubd80 \uc0ac\ud56d\uc744 \ud655\uc778\ud574 \ub450\uc138\uc694.' },
      ],
    },
  ],
  links: '\ub2e4\uc74c\uc5d0 \uc720\uc6a9\ud55c \ub2e8\uacc4',
  linksList: [
    ['/tours', '\ubaa8\ub85c\ucf54 \ud22c\uc5b4 \ube44\uad50\ud558\uae30'],
    ['/destinations', '\uc5ec\ud589\uc9c0 \ub458\ub7ec\ubcf4\uae30'],
    ['/day-trips', '\uc77c\uc77c \uc5ec\ud589 \uc54c\uc544\ubcf4\uae30'],
    ['/contact', '\uc2e4\uc81c \ub2f4\ub2f9\uc790\uc640 \uc0c1\ub2f4\ud558\uae30'],
  ],
};

export const travelerDecisionGuideAr: TravelerDecisionContent = {
  eyebrow: '\u0642\u0628\u0644 \u0627\u0644\u062d\u062c\u0632',
  title: '\u0623\u0633\u0626\u0644\u0629 \u064a\u0637\u0631\u062d\u0647\u0627 \u0627\u0644\u0645\u0633\u0627\u0641\u0631 \u0644\u0623\u0648\u0644 \u0645\u0631\u0629',
  intro: '\u0625\u0630\u0627 \u0643\u0627\u0646 \u0627\u0644\u0645\u063a\u0631\u0628 \u062c\u062f\u064a\u062f\u064b\u0627 \u0639\u0644\u064a\u0643\u060c \u0641\u0647\u0630\u0647 \u0645\u0646 \u0623\u0647\u0645 \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062a\u064a \u0646\u0631\u064a\u062f \u0623\u0646 \u062a\u0643\u0648\u0646 \u0625\u062c\u0627\u0628\u0627\u062a\u0647\u0627 \u0648\u0627\u0636\u062d\u0629 \u0642\u0628\u0644 \u0623\u0646 \u062a\u0646\u0641\u0642 \u0645\u0627\u0644\u0643 \u0639\u0644\u0649 \u0627\u0644\u0631\u062d\u0644\u0629. \u0646\u0631\u0628\u0637 \u0643\u0644 \u0625\u062c\u0627\u0628\u0629 \u0628\u0627\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u062a\u064a \u062a\u0633\u0627\u0639\u062f\u0643 \u0639\u0644\u0649 \u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0645\u0632\u064a\u062f.',
  items: [
    {
      q: '\u0643\u0645 \u064a\u0648\u0645\u064b\u0627 \u0623\u062d\u062a\u0627\u062c \u0641\u0639\u0644\u064b\u0627 \u0644\u0632\u064a\u0627\u0631\u0629 \u0627\u0644\u0645\u063a\u0631\u0628\u061f',
      a: [
        { type: 'text', text: '\u064a\u0639\u062a\u0645\u062f \u0630\u0644\u0643 \u0639\u0644\u0649 \u0645\u0627 \u062a\u0631\u064a\u062f \u0631\u0624\u064a\u062a\u0647. \u0627\u0644\u0631\u062d\u0644\u0629 \u0627\u0644\u0642\u0635\u064a\u0631\u0629 \u064a\u0645\u0643\u0646 \u0623\u0646 \u062a\u0643\u0648\u0646 \u0631\u0627\u0626\u0639\u0629 \u0625\u0630\u0627 \u0631\u0643\u0632\u062a \u0639\u0644\u0649 \u0645\u0646\u0637\u0642\u0629 \u0648\u0627\u062d\u062f\u0629\u060c \u0628\u064a\u0646\u0645\u0627 \u0627\u0644\u0631\u062d\u0644\u0629 \u0627\u0644\u0623\u0637\u0648\u0644 \u062a\u0645\u0646\u062d\u0643 \u0648\u0642\u062a\u064b\u0627 \u0644\u0644\u0645\u062f\u0646 \u0648\u0627\u0644\u062c\u0628\u0627\u0644 \u0648\u0627\u0644\u0635\u062d\u0631\u0627\u0621 \u062f\u0648\u0646 \u062a\u062d\u0648\u064a\u0644 \u0643\u0644 \u064a\u0648\u0645 \u0625\u0644\u0649 \u0631\u062d\u0644\u0629 \u0627\u0646\u062a\u0642\u0627\u0644. \u0625\u0630\u0627 \u0643\u0627\u0646\u062a \u0644\u062f\u064a\u0643 \u062a\u0648\u0627\u0631\u064a\u062e \u0645\u062d\u062f\u062f\u0629\u060c \u0627\u0633\u062a\u062e\u062f\u0645 ' },
        { type: 'link', text: '\u0645\u0635\u0645\u0645 \u0627\u0644\u0631\u062d\u0644\u0629', to: '/trip-builder' },
        { type: 'text', text: ' \u0648\u0623\u062e\u0628\u0631\u0646\u0627 \u0628\u0645\u0627 \u064a\u0647\u0645\u0643.' },
      ],
    },
    {
      q: '\u0647\u0644 \u0627\u0644\u0627\u0646\u062a\u0642\u0627\u0644 \u0645\u0646 \u0645\u0631\u0627\u0643\u0634 \u0625\u0644\u0649 \u0645\u0631\u0632\u0648\u0643\u0629 \u0633\u0631\u064a\u0639\u061f',
      a: [
        { type: 'text', text: '\u0644\u0627. \u0625\u0646\u0647\u0627 \u0631\u062d\u0644\u0629 \u0637\u0648\u064a\u0644\u0629 \u0646\u0633\u0628\u064a\u064b\u0627\u060c \u0648\u0645\u0646 \u0627\u0644\u0623\u0641\u0636\u0644 \u0623\u0644\u0627 \u0646\u062a\u0639\u0627\u0645\u0644 \u0645\u0639\u0647\u0627 \u0643\u062a\u0646\u0642\u0644 \u0633\u0631\u064a\u0639 \u0641\u0642\u0637. \u064a\u0645\u0643\u0646 \u0623\u0646 \u062a\u0635\u0628\u062d \u0627\u0644\u0637\u0631\u064a\u0642 \u062c\u0632\u0621\u064b\u0627 \u0645\u0646 \u0627\u0644\u062a\u062c\u0631\u0628\u0629 \u0639\u0628\u0631 \u0627\u0644\u0623\u0637\u0644\u0633 \u0648\u0622\u064a\u062a \u0628\u0646 \u062d\u062f\u0648 \u0648\u0645\u0646\u0637\u0642\u0629 \u062f\u0627\u062f\u0633 \u0648\u062a\u0648\u062f\u0631\u0627. \u064a\u0645\u0643\u0646\u0643 \u0642\u0631\u0627\u0621\u0629 ' },
        { type: 'link', text: '\u062f\u0644\u064a\u0644 \u0645\u0631\u0627\u0643\u0634 \u0625\u0644\u0649 \u0645\u0631\u0632\u0648\u0643\u0629', to: '/blog/marrakech-to-merzouga-roadtrip' },
        { type: 'text', text: ' \u0644\u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0639\u0645\u0644\u064a\u0629.' },
      ],
    },
    {
      q: '\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064a\u0646 \u0645\u0631\u0632\u0648\u0643\u0629 \u0648\u0639\u0631\u0642 \u0627\u0644\u0634\u0628\u064a\u061f',
      a: [
        { type: 'text', text: '\u0645\u0631\u0632\u0648\u0643\u0629 \u0647\u064a \u0627\u0644\u0628\u0644\u062f\u0629 \u0648\u0627\u0644\u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0633\u064a\u0627\u062d\u064a\u0629\u060c \u0623\u0645\u0627 \u0639\u0631\u0642 \u0627\u0644\u0634\u0628\u064a \u0641\u0647\u0648 \u0645\u062c\u0627\u0644 \u0627\u0644\u0643\u062b\u0628\u0627\u0646 \u0627\u0644\u0645\u0631\u062a\u0628\u0637 \u0628\u0627\u0644\u0645\u0646\u0637\u0642\u0629. \u0639\u0645\u0644\u064a\u064b\u0627 \u064a\u0635\u0644 \u0627\u0644\u0645\u0633\u0627\u0641\u0631 \u0625\u0644\u0649 \u0645\u0631\u0632\u0648\u0643\u0629 \u062b\u0645 \u064a\u062f\u062e\u0644 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0643\u062b\u0628\u0627\u0646 \u0644\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0635\u062d\u0631\u0627\u0648\u064a\u0629. \u0627\u0628\u062f\u0623 \u0628\u0640' },
        { type: 'link', text: '\u062f\u0644\u064a\u0644 \u0645\u0631\u0632\u0648\u0643\u0629', to: '/merzouga-guide' },
        { type: 'text', text: ' \u062b\u0645 \u0627\u0633\u062a\u0643\u0634\u0641 \u062a\u062c\u0631\u0628\u0629 ' },
        { type: 'link', text: '\u0631\u062d\u0644\u0629 \u0627\u0644\u062c\u0645\u0627\u0644', to: '/camel-trekking' },
        { type: 'text', text: '.' },
      ],
    },
    {
      q: '\u0647\u0644 \u0623\u062e\u062a\u0627\u0631 \u0631\u062d\u0644\u0629 \u062c\u0627\u0647\u0632\u0629 \u0623\u0645 \u0623\u0635\u0645\u0645 \u0631\u062d\u0644\u062a\u064a \u0628\u0646\u0641\u0633\u064a\u061f',
      a: [
        { type: 'text', text: '\u0627\u062e\u062a\u0631 \u0627\u0644\u0631\u062d\u0644\u0629 \u0627\u0644\u062c\u0627\u0647\u0632\u0629 \u0625\u0630\u0627 \u0643\u0627\u0646 \u0645\u0633\u0627\u0631\u0647\u0627 \u0648\u0645\u062f\u062a\u0647\u0627 \u0645\u0646\u0627\u0633\u0628\u062a\u064a\u0646 \u0644\u0643. \u0623\u0645\u0627 \u0625\u0630\u0627 \u0643\u0627\u0646\u062a \u0644\u062f\u064a\u0643 \u062a\u0648\u0627\u0631\u064a\u062e \u0623\u0648 \u0627\u0647\u062a\u0645\u0627\u0645\u0627\u062a \u0623\u0648 \u0646\u0642\u0637\u0629 \u0627\u0646\u0637\u0644\u0627\u0642 \u0645\u062e\u062a\u0644\u0641\u0629\u060c \u0641\u0627\u0633\u062a\u062e\u062f\u0645 ' },
        { type: 'link', text: '\u0645\u0635\u0645\u0645 \u0627\u0644\u0631\u062d\u0644\u0627\u062a \u0627\u0644\u0645\u062a\u0639\u062f\u062f\u0629 \u0627\u0644\u0623\u064a\u0627\u0645', to: '/trip-builder' },
        { type: 'text', text: '. \u0648\u0644\u0631\u062d\u0644\u0629 \u064a\u0648\u0645 \u0648\u0627\u062d\u062f \u0627\u0633\u062a\u062e\u062f\u0645 ' },
        { type: 'link', text: '\u0645\u0635\u0645\u0645 \u0627\u0644\u0631\u062d\u0644\u0629 \u0627\u0644\u064a\u0648\u0645\u064a\u0629', to: '/build-your-day-trip' },
        { type: 'text', text: '.' },
      ],
    },
    {
      q: '\u0647\u0644 \u0627\u0644\u0635\u062d\u0631\u0627\u0621 \u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0644\u0639\u0627\u0626\u0644\u0627\u062a\u061f',
      a: [
        { type: 'text', text: '\u064a\u0645\u0643\u0646 \u0623\u0646 \u062a\u0643\u0648\u0646 \u0645\u0646\u0627\u0633\u0628\u0629\u060c \u0644\u0643\u0646 \u0627\u0644\u0645\u0633\u0627\u0631 \u0648\u0627\u0644\u0648\u062a\u064a\u0631\u0629 \u0645\u0647\u0645\u0627\u0646. \u064a\u062c\u0628 \u0639\u0644\u0649 \u0627\u0644\u0639\u0627\u0626\u0644\u0629 \u0645\u0639\u0631\u0641\u0629 \u0623\u064a\u0627\u0645 \u0627\u0644\u0642\u064a\u0627\u062f\u0629\u060c \u0645\u0642\u062f\u0627\u0631 \u0627\u0644\u0645\u0634\u064a\u060c \u0627\u0644\u0623\u0646\u0634\u0637\u0629\u060c \u0627\u0644\u0637\u0639\u0627\u0645 \u0648\u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u0628\u064a\u062a. \u0627\u0628\u062f\u0623 \u0628\u0627\u0633\u062a\u0643\u0634\u0627\u0641 ' },
        { type: 'link', text: '\u0631\u062d\u0644\u0627\u062a \u0627\u0644\u0645\u063a\u0631\u0628', to: '/tours' },
        { type: 'text', text: ' \u0648\u0627\u0633\u0623\u0644\u0646\u0627 \u0639\u0646 \u0623\u064a \u062a\u0641\u0635\u064a\u0644 \u0642\u0628\u0644 \u0627\u0644\u062d\u062c\u0632.' },
      ],
    },
    {
      q: '\u0645\u0627\u0630\u0627 \u0623\u062a\u0648\u0642\u0639 \u0645\u0646 \u0644\u064a\u0644\u0629 \u0641\u064a \u0627\u0644\u0645\u062e\u064a\u0645 \u0627\u0644\u0635\u062d\u0631\u0627\u0648\u064a\u061f',
      a: [
        { type: 'text', text: '\u0644\u064a\u0644\u0629 \u0627\u0644\u0635\u062d\u0631\u0627\u0621 \u0644\u064a\u0633\u062a \u0645\u062c\u0631\u062f \u0641\u0646\u062f\u0642 \u062f\u0627\u062e\u0644 \u0627\u0644\u0631\u0645\u0627\u0644. \u0633\u062a\u0639\u064a\u0634 \u0628\u064a\u0626\u0629 \u0645\u062e\u062a\u0644\u0641\u0629\u060c \u0648\u0645\u0633\u0627\u062d\u0629 \u0645\u0641\u062a\u0648\u062d\u0629\u060c \u0648\u062a\u063a\u064a\u0631\u064b\u0627 \u0641\u064a \u0627\u0644\u062d\u0631\u0627\u0631\u0629 \u0628\u0639\u062f \u0627\u0644\u063a\u0631\u0648\u0628 \u0648\u0623\u0645\u0633\u064a\u0629 \u0623\u0643\u062b\u0631 \u0647\u062f\u0648\u0621\u064b\u0627. \u0631\u0627\u062c\u0639 \u0635\u0641\u062d\u0629 ' },
        { type: 'link', text: '\u0627\u0644\u0645\u062e\u064a\u0645 \u0627\u0644\u0635\u062d\u0631\u0627\u0648\u064a \u0627\u0644\u0641\u0627\u062e\u0631', to: '/luxury-camp' },
        { type: 'text', text: ' \u0648\u0627\u0633\u0623\u0644\u0646\u0627 \u0639\u0646 \u0623\u064a \u0645\u0631\u0641\u0642 \u0645\u0647\u0645 \u0628\u0627\u0644\u0646\u0633\u0628\u0629 \u0644\u0643.' },
      ],
    },
    {
      q: '\u0645\u062a\u0649 \u064a\u0643\u0648\u0646 \u0627\u0644\u0648\u0642\u062a \u0645\u0646\u0627\u0633\u0628\u064b\u0627 \u0644\u0632\u064a\u0627\u0631\u0629 \u0627\u0644\u0635\u062d\u0631\u0627\u0621\u061f',
      a: [
        { type: 'text', text: '\u0644\u0627 \u064a\u0648\u062c\u062f \u0634\u0647\u0631 \u0645\u062b\u0627\u0644\u064a \u0644\u0644\u062c\u0645\u064a\u0639\u060c \u0644\u0643\u0646 \u0627\u0644\u0631\u0628\u064a\u0639 \u0648\u0627\u0644\u062e\u0631\u064a\u0641 \u064a\u0639\u062f\u0627\u0646 \u0639\u0645\u0648\u0645\u064b\u0627 \u0645\u0646 \u0627\u0644\u0641\u062a\u0631\u0627\u062a \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0644\u0635\u062d\u0631\u0627\u0621 \u0627\u0644\u062c\u0646\u0648\u0628\u064a\u0629. \u0627\u0644\u0627\u062e\u062a\u064a\u0627\u0631 \u064a\u0639\u062a\u0645\u062f \u0623\u064a\u0636\u064b\u0627 \u0639\u0644\u0649 \u062a\u0641\u0636\u064a\u0644\u0643 \u0644\u0644\u062d\u0631\u0627\u0631\u0629 \u0648\u0627\u0644\u0628\u0631\u0648\u062f\u0629 \u0648\u0628\u0631\u0646\u0627\u0645\u062c\u0643\u060c \u0644\u0630\u0644\u0643 \u0627\u0644\u0623\u0641\u0636\u0644 \u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0645\u0648\u0633\u0645 \u0628\u0628\u0631\u0646\u0627\u0645\u062c\u0643 \u0648\u0631\u0627\u062d\u062a\u0643.' },
      ],
    },
    {
      q: '\u0647\u0644 \u0623\u062d\u062a\u0627\u062c \u0625\u0644\u0649 \u0627\u0644\u0646\u0642\u0648\u062f \u0625\u0630\u0627 \u0643\u0627\u0646\u062a \u0644\u062f\u064a \u0628\u0637\u0627\u0642\u0629 \u0628\u0646\u0643\u064a\u0629\u061f',
      a: [
        { type: 'text', text: '\u0627\u0635\u0637\u062d\u0628 \u0627\u0644\u0628\u0637\u0627\u0642\u0629\u060c \u0644\u0643\u0646 \u0644\u0627 \u062a\u0639\u062a\u0645\u062f \u0639\u0644\u064a\u0647\u0627 \u0641\u064a \u0643\u0644 \u0634\u064a\u0621. \u0623\u062c\u0647\u0632\u0629 \u0627\u0644\u0635\u0631\u0627\u0641 \u0645\u0646\u062a\u0634\u0631\u0629 \u0648\u062a\u064f\u0642\u0628\u0644 Visa \u0648Mastercard \u0641\u064a \u0627\u0644\u0639\u062f\u064a\u062f \u0645\u0646 \u0627\u0644\u0641\u0646\u0627\u062f\u0642 \u0648\u0628\u0639\u0636 \u0627\u0644\u0645\u0637\u0627\u0639\u0645 \u0648\u0627\u0644\u0645\u062a\u0627\u062c\u0631 \u0648\u0645\u062d\u0637\u0627\u062a \u0627\u0644\u0648\u0642\u0648\u062f\u060c \u0628\u064a\u0646\u0645\u0627 \u062a\u062d\u062a\u0627\u062c \u0628\u0639\u0636 \u0627\u0644\u0645\u0648\u0627\u0642\u0641 \u0625\u0644\u0649 \u0627\u0644\u062f\u0631\u0647\u0645 \u0627\u0644\u0645\u063a\u0631\u0628\u064a. \u0645\u0646 \u0627\u0644\u0623\u0641\u0636\u0644 \u0627\u0644\u0627\u062d\u062a\u0641\u0627\u0638 \u0628\u0645\u0628\u0644\u063a \u0646\u0642\u062f\u064a \u0627\u062d\u062a\u064a\u0627\u0637\u064a.' },
      ],
    },
  ],
  links: '\u062e\u0637\u0648\u0627\u062a \u0645\u0641\u064a\u062f\u0629',
  linksList: [
    ['/tours', '\u0642\u0627\u0631\u0646 \u0628\u064a\u0646 \u0627\u0644\u0631\u062d\u0644\u0627\u062a'],
    ['/destinations', '\u0627\u0633\u062a\u0643\u0634\u0641 \u0627\u0644\u0648\u062c\u0647\u0627\u062a'],
    ['/day-trips', '\u062a\u0639\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0631\u062d\u0644\u0627\u062a \u0627\u0644\u064a\u0648\u0645\u064a\u0629'],
    ['/contact', '\u062a\u062d\u062f\u062b \u0645\u0639\u0646\u0627 \u0645\u0628\u0627\u0634\u0631\u0629'],
  ],
};
