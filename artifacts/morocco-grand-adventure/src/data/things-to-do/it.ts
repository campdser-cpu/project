import type { ThingsCopy } from './types';

const it: ThingsCopy = {
  heading: '25 cose da fare in Marocco',
  intro:
    'Il Marocco premia chi sceglie poche esperienze e le vive davvero. Queste venticinque sono quelle a cui le nostre guide tornano sempre: la duna che si sale prima dell’alba, il vicolo che profuma di cedro e menta, la gola dove la strada finisce. Ognuna dice dove si trova e com’è davvero, così puoi costruire un itinerario su misura per i giorni che hai.',
  kicker: 'Una guida scritta da chi percorre queste strade',
  ctaTitle: 'Costruisci la tua versione di questa lista',
  ctaText:
    'Dicci quali ti interessano e quanti giorni hai a disposizione. Le mettiamo in un ordine che funziona sulla mappa e ti inviamo un preventivo per le tue date e il tuo gruppo.',
  ctaButton: 'Pianifica il mio viaggio',
  groups: {
    sahara: 'Il Sahara',
    marrakech: 'Marrakech',
    fes: 'Fes',
    south: 'La strada verso sud',
    coast: 'Il nord e la costa',
    culture: 'Cultura e tavola',
  },
  links: {
    guide: 'Leggi la guida',
    experience: 'Scopri l’esperienza',
    tours: 'Vedi i tour',
    destination: 'Scopri la destinazione',
    about: 'Conosci il team',
  },
  items: {
    'camel-trek': {
      title: 'Entrare fra le dune di Erg Chebbi in cammello',
      body: 'La carovana lascia Merzouga nel tardo pomeriggio e avanza nella sabbia mentre la luce passa dall’oro al rosa. È più lento di quanto immagini e molto più silenzioso: dopo dieci minuti restano solo il passo degli animali e il vento sulle creste.',
      tip: 'Indossa pantaloni lunghi e porta una sciarpa: rinfresca appena il sole scende.',
    },
    'desert-camp': {
      title: 'Dormire in un campo tendato fra le dune',
      body: 'I campi stanno negli avvallamenti dell’erg, lontano dalla vista del villaggio, con i tappeti a terra e la cena servita sotto il telo. Sparecchiato, il fuoco e i tamburi accompagnano la serata finché il freddo manda tutti a dormire.',
      tip: 'Da novembre a febbraio le notti sono fredde: un pile vale lo spazio in valigia.',
    },
    'dune-sunrise': {
      title: 'Salire su una duna per l’alba',
      body: 'L’alba è il motivo per alzarsi al buio. Salire una duna è faticoso nella sabbia morbida, ma dalla cresta l’erg si apre in onde e il colore cambia di minuto in minuto mentre il sole supera l’orizzonte.',
      tip: 'Parti circa quaranta minuti prima dell’alba e sali scalzo: le scarpe si riempiono di sabbia.',
    },
    stargazing: {
      title: 'Guardare il cielo del Sahara dopo cena',
      body: 'Lontano dai centri abitati, il cielo del deserto è lo spettacolo della sera. I salotti dei campi sono illuminati da lanterne e non da fari, e quando l’occhio si abitua le stelle riempiono il cielo da un orizzonte all’altro.',
      tip: 'Lascia agli occhi un quarto d’ora per adattarsi e tieni spenti gli schermi.',
    },
    'dune-driving': {
      title: 'Attraversare le dune in 4x4',
      body: 'Il 4x4 arriva dove il cammello non può: la hammada piatta, la roccia vulcanica nera, i villaggi al bordo della sabbia. La guida sulle dune è breve e intensa: pochi minuti di salite e scivolate con il motore al massimo.',
      tip: 'Chiedi l’uscita del mattino se soffri il mal d’auto: l’aria è più fresca e calma.',
    },
    'quad-biking': {
      title: 'Uscire in quad sull’erg',
      body: 'Il quad è il contrappunto rumoroso del cammello e il modo più immediato per capire quanto è grande Erg Chebbi. I percorsi seguono la sabbia compatta ai piedi delle dune, con una guida che apre la strada.',
      tip: 'Porta occhiali e una sciarpa per il viso: la sabbia viaggia con te.',
    },
    'jemaa-el-fna': {
      title: 'Cenare nella piazza Jemaa el-Fna',
      body: 'Ogni sera la piazza principale di Marrakech diventa una cucina all’aperto: banchi numerati, vapore, panche condivise con sconosciuti. È rumorosa e teatrale, ed è ancora il posto dove mangia la città.',
      tip: 'Fai un giro completo prima di scegliere e conferma l’ordine prima che arrivi.',
    },
    'marrakech-souks': {
      title: 'Perdersi nei souk di Marrakech',
      body: 'A nord della piazza la medina si chiude sopra la testa: gallerie di pelle, botteghe di lanterne, vicoli dei tintori. Perdersi fa parte del gioco: i vicoli finiscono sempre per riportarti su una via che conosci.',
      tip: 'Scegli un punto di riferimento e un orario per uscire, poi cammina senza mappa.',
    },
    'ben-youssef': {
      title: 'Entrare nel cortile della madrasa Ben Youssef',
      body: 'L’antica scuola coranica è la stanza più silenziosa di Marrakech: cedro intagliato, stucco e zellige attorno a una vasca immobile. Vai presto e il cortile sarà quasi solo tuo.',
      tip: 'La mattina è il momento più tranquillo e la luce sulle piastrelle è la migliore.',
    },
    'fes-medina': {
      title: 'Camminare nei vicoli di Fes el-Bali',
      body: 'Fes è la medina che funziona ancora: asini carichi di merce, botteghe dietro ogni porta, strade troppo strette per un motore. Una mattina qui mostra come vive oggi una città medievale.',
      tip: 'Prendi una guida locale per la prima mezza giornata: i vicoli confondono davvero.',
    },
    tanneries: {
      title: 'Affacciarsi sulle concerie di Chouara',
      body: 'Le vasche di pietra di Fes sono lavorate a mano da secoli, e le terrazze che le sovrastano appartengono ai negozi di pelle. L’odore è reale, i colori sono straordinari e il lavoro là sotto è duro.',
      tip: 'Ti daranno un rametto di menta da tenere sotto il naso. Accettalo.',
    },
    'medina-crafts': {
      title: 'Guardare un artigiano al lavoro',
      body: 'Dietro le vetrine la medina è un laboratorio: fabbri alla forgia, tornitori del cedro, ramai, tessitori. Fermarsi a guardare — e comprare da chi ha fatto l’oggetto — resta il souvenir migliore.',
      tip: 'Chiedi prima di fotografare chi lavora; quasi tutti diranno di sì.',
    },
    'tichka-road': {
      title: 'Valicare l’Alto Atlante sul Tizi n’Tichka',
      body: 'La strada da Marrakech a Ouarzazate sale fra villaggi di noci e tornanti fino al passo, poi scende nel paese delle kasbah rosse. Il viaggio è l’attrazione: le soste contano più dell’orologio.',
      tip: 'Fermati ai punti panoramici in salita: la luce è migliore prima di mezzogiorno.',
    },
    'ait-ben-haddou': {
      title: 'Salire allo ksar di Ait Ben Haddou',
      body: 'Le torri di terra sopra il fiume Ounila sono Patrimonio dell’Umanità UNESCO e hanno fatto da set molte volte. Attraversa il fiume, sali per i vicoli e arriva al granaio per la vista sulla valle.',
      tip: 'È a circa trenta minuti da Ouarzazate: vai presto o a fine giornata per evitare la luce dura.',
    },
    'todra-gorge': {
      title: 'Entrare a piedi nelle gole del Todra',
      body: 'Le pareti calcaree si stringono in un corridoio poco più largo della strada, con un torrente sul fondo. Cammina oltre gli alberghi e il rumore sparisce; sopra di te ci sono arrampicatori appesi alla roccia.',
      tip: 'Nel tardo pomeriggio la luce accende la parte alta delle pareti e la folla si è diradata.',
    },
    'dades-valley': {
      title: 'Seguire la strada della valle del Dades',
      body: 'Tra Ouarzazate e il deserto il Dades traccia un nastro di oasi con le kasbah sui versanti. I famosi tornanti meritano la sosta, ma sono i villaggi ai lati a far venire voglia di rallentare.',
      tip: 'Spezza qui il viaggio invece di tirare dritto fino a Merzouga.',
    },
    'draa-palms': {
      title: 'Percorrere i palmeti della Draa',
      body: 'A sud di Ouarzazate la strada segue il fiume più lungo del Marocco in un corridoio di palme da dattero e villaggi di terra cruda fino a Zagora. È il deserto più verde che vedrai.',
      tip: 'I datteri si raccolgono in autunno: le bancarelle lungo la strada li vendono freschi.',
    },
    chefchaouen: {
      title: 'Passeggiare nella medina blu di Chefchaouen',
      body: 'Un paese dipinto in cento sfumature di blu, impilato su un versante del Rif. Mezza giornata di vicoli e scalinate basta, e il belvedere sopra il paese vale la salita per la luce della sera.',
      tip: 'Qui ci vive gente: chiedi prima di fotografare porte e persone.',
    },
    essaouira: {
      title: 'Camminare sui bastioni di Essaouira',
      body: 'Il vento atlantico tiene fresca Essaouira quando l’interno brucia. I bastioni della Sqala guardano il mare con i cannoni ancora al loro posto, e il porto sotto profuma di pesce e vernice fresca.',
      tip: 'Porta una giacca anche d’estate: il vento non si ferma mai.',
    },
    surfing: {
      title: 'Surfare la costa atlantica',
      body: 'A nord di Agadir la costa alterna point break e onde di spiaggia, con una scuola di surf in ogni villaggio. I principianti trovano onde lunghe e indulgenti; le scogliere lavorano per tutti gli altri quando arriva la mareggiata.',
      tip: 'L’inverno porta le onde più grandi. L’estate è più dolce e ideale per imparare.',
    },
    'agadir-beach': {
      title: 'Incontrare i cammelli sulla spiaggia di Agadir',
      body: 'La baia di Agadir è una lunga curva di sabbia con la passeggiata alle spalle e i cammelli che aspettano in riva per il giro di fine giornata. È l’atterraggio più morbido del Marocco dopo un volo.',
      tip: 'Accordati sul giro e sul prezzo prima di salire.',
    },
    'hassan-ii': {
      title: 'Vedere la moschea Hassan II sull’oceano',
      body: 'La grande moschea di Casablanca è costruita sull’Atlantico, e le sue dimensioni si capiscono solo ai piedi del minareto, con le onde che si rompono sotto. I visitatori non musulmani possono entrare con le visite guidate.',
      tip: 'Controlla gli orari in giornata: cambiano attorno alle preghiere.',
    },
    'amazigh-music': {
      title: 'Partecipare a una serata di musica amazigh',
      body: 'Tamburi bendir, battito di mani e canto a botta e risposta: così passano le sere nel sud. Suonata all’aperto attorno al fuoco, è meno spettacolo che conversazione, e gli ospiti finiscono presto dentro il cerchio.',
      tip: 'Di’ di sì quando ti passano un tamburo. Nessuno giudica il tuo ritmo.',
    },
    'mint-tea': {
      title: 'Bere il tè come si serve qui',
      body: 'Tè verde, menta fresca, zucchero, versato dall’alto per fare schiuma, e mai un bicchiere solo. Viene offerto ovunque — botteghe, campi, case — ed è così che inizia una conversazione.',
      tip: 'Accettare il secondo bicchiere è normale. Rifiutarli tutti e tre no.',
    },
    'moroccan-table': {
      title: 'Sedersi a una vera tavola marocchina',
      body: 'Un tajine cotto lentamente sulla brace, insalate cotte per iniziare, couscous il venerdì, il pane al posto delle posate. Chiedi alla tua guida dove mangia e farai meglio di qualsiasi lista.',
      tip: 'Segnala allergie o dieta vegetariana alla prenotazione: le cucine si organizzano prima.',
    },
  },
};

export default it;
