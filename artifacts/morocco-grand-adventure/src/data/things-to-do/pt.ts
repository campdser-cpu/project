import type { ThingsCopy } from './types';

// Português europeu.
const pt: ThingsCopy = {
  heading: '25 coisas para fazer em Marrocos',
  intro:
    'Marrocos recompensa quem escolhe algumas experiências e as vive a sério. Estas vinte e cinco são aquelas a que os nossos guias voltam sempre: a duna que se sobe antes do nascer do sol, a viela que cheira a cedro e hortelã, a garganta onde a estrada acaba. Cada uma diz onde fica e como é na realidade, para montar um percurso à medida dos dias que tem.',
  kicker: 'Um guia escrito por quem percorre estas estradas',
  ctaTitle: 'Construa a sua própria versão desta lista',
  ctaText:
    'Diga-nos quais lhe interessam e de quantos dias dispõe. Organizamo-las numa ordem que funciona no mapa e enviamos um orçamento para as suas datas e o seu grupo.',
  ctaButton: 'Planear a minha viagem',
  groups: {
    sahara: 'O Sara',
    marrakech: 'Marraquexe',
    fes: 'Fez',
    south: 'A estrada para sul',
    coast: 'O norte e a costa',
    culture: 'Cultura e mesa',
  },
  links: {
    guide: 'Ler o guia',
    experience: 'Ver a experiência',
    tours: 'Ver os circuitos',
    destination: 'Descobrir o destino',
    about: 'Conhecer a equipa',
  },
  items: {
    'camel-trek': {
      title: 'Entrar nas dunas de Erg Chebbi montado num dromedário',
      body: 'A caravana sai de Merzouga ao fim da tarde e avança pela areia enquanto a luz passa de dourada a rosa. É mais lento do que imagina e muito mais silencioso: ao fim de dez minutos ouvem-se apenas as patas na areia e o vento nas cristas.',
      tip: 'Use calças compridas e leve um lenço: arrefece depressa assim que o sol desce.',
    },
    'desert-camp': {
      title: 'Dormir num acampamento entre as dunas',
      body: 'Os acampamentos ficam nas depressões do erg, fora da vista da aldeia, com tapetes no chão e jantar servido sob a lona. Levantada a mesa, o fogo e os tambores seguram a noite até o frio mandar todos para a cama.',
      tip: 'De novembro a fevereiro as noites são frias: um polar vale o espaço na mala.',
    },
    'dune-sunrise': {
      title: 'Subir uma duna para ver o nascer do sol',
      body: 'O nascer do sol justifica acordar no escuro. Subir uma duna custa na areia solta, mas da crista o erg estende-se em ondas e a cor muda a cada minuto à medida que o sol passa o horizonte.',
      tip: 'Saia cerca de quarenta minutos antes do nascer do sol e suba descalço: os sapatos enchem-se de areia.',
    },
    stargazing: {
      title: 'Ver o céu do Sara depois do jantar',
      body: 'Longe das povoações, o céu do deserto é o programa da noite. Os salões dos acampamentos usam lanternas em vez de holofotes e, quando os olhos se habituam, as estrelas cobrem o céu de horizonte a horizonte.',
      tip: 'Dê aos olhos um quarto de hora para se adaptarem e mantenha os ecrãs desligados.',
    },
    'dune-driving': {
      title: 'Atravessar as dunas de 4x4',
      body: 'O 4x4 chega onde o dromedário não chega: a hamada plana, a rocha vulcânica escura, as aldeias à beira da areia. A condução nas dunas é curta e intensa — alguns minutos a subir e a deslizar com o motor a puxar.',
      tip: 'Peça a saída da manhã se enjoa facilmente: o ar está mais fresco e calmo.',
    },
    'quad-biking': {
      title: 'Sair de moto-quatro pelo erg',
      body: 'A moto-quatro é o contraponto ruidoso do dromedário e a forma mais rápida de perceber o tamanho de Erg Chebbi. Os percursos seguem a areia firme ao pé das dunas, com um guia à frente.',
      tip: 'Leve óculos e um lenço para o rosto: a areia viaja consigo.',
    },
    'jemaa-el-fna': {
      title: 'Jantar na praça Jemaa el-Fna',
      body: 'Todas as noites a praça principal de Marraquexe transforma-se numa cozinha ao ar livre: bancas numeradas, vapor, mesas partilhadas com desconhecidos. É ruidosa e teatral, e continua a ser onde a cidade come.',
      tip: 'Dê uma volta completa antes de escolher e confirme o pedido antes de ele chegar.',
    },
    'marrakech-souks': {
      title: 'Perder-se nos souks de Marraquexe',
      body: 'A norte da praça, a medina fecha-se por cima de si: túneis de pele, lojas de candeeiros, ruelas dos tintureiros. Perder-se faz parte; as vielas acabam sempre por o devolver a uma rua conhecida.',
      tip: 'Escolha um ponto de referência e uma hora para sair, e caminhe sem mapa.',
    },
    'ben-youssef': {
      title: 'Entrar no pátio da madraça Ben Youssef',
      body: 'A antiga escola corânica é a sala mais serena de Marraquexe: cedro esculpido, estuque e zellige em torno de um tanque imóvel. Vá cedo e terá o pátio quase só para si.',
      tip: 'A manhã é a altura mais calma, e a luz sobre os azulejos é então a melhor.',
    },
    'fes-medina': {
      title: 'Percorrer as vielas de Fez el-Bali',
      body: 'Fez é a medina que ainda funciona: burros carregados de mercadoria, oficinas por trás de cada porta, ruas demasiado estreitas para um motor. Uma manhã aqui mostra como vive hoje uma cidade medieval.',
      tip: 'Contrate um guia local na primeira meia jornada: as vielas confundem mesmo.',
    },
    tanneries: {
      title: 'Olhar de cima para os curtumes de Chouara',
      body: 'Os tanques de pedra de Fez são trabalhados à mão há séculos, e os terraços que os dominam pertencem às lojas de peles. O cheiro é real, as cores são extraordinárias e o trabalho lá em baixo é duro.',
      tip: 'Vão dar-lhe hortelã para segurar debaixo do nariz. Aceite.',
    },
    'medina-crafts': {
      title: 'Ver um artesão a trabalhar',
      body: 'Por trás das montras a medina é uma oficina: ferreiros na forja, torneiros de cedro, caldeireiros, tecelões. Parar para ver — e comprar a quem fez a peça — continua a ser a melhor recordação.',
      tip: 'Pergunte antes de fotografar alguém a trabalhar; quase todos dizem que sim.',
    },
    'tichka-road': {
      title: 'Atravessar o Alto Atlas pelo Tizi n’Tichka',
      body: 'A estrada de Marraquexe para Ouarzazate sobe entre aldeias de nogueiras e curvas apertadas até ao colo e desce depois para a terra das kasbahs vermelhas. A viagem é a atração: as paragens contam mais do que o relógio.',
      tip: 'Pare nos miradouros da subida: antes do meio-dia a luz é melhor.',
    },
    'ait-ben-haddou': {
      title: 'Subir ao ksar de Aït Ben Haddou',
      body: 'As torres de terra sobre o rio Ounila são Património Mundial da UNESCO e serviram de cenário muitas vezes. Atravesse o rio, suba pelas vielas e chegue ao celeiro para ver o vale lá de cima.',
      tip: 'Fica a cerca de trinta minutos de Ouarzazate: vá cedo ou ao fim do dia para evitar a luz dura.',
    },
    'todra-gorge': {
      title: 'Entrar a pé na garganta do Todra',
      body: 'As paredes de calcário fecham-se num corredor pouco mais largo do que a estrada, com um ribeiro no fundo. Caminhe para lá dos hotéis e o ruído desaparece; por cima há escaladores pendurados na rocha.',
      tip: 'Ao fim da tarde a luz toca o alto das paredes e os grupos já se foram.',
    },
    'dades-valley': {
      title: 'Seguir a estrada do vale do Dades',
      body: 'Entre Ouarzazate e o deserto, o Dades desenha uma fita de oásis com kasbahs nas encostas. As curvas famosas merecem a paragem, mas são as aldeias em redor que fazem abrandar.',
      tip: 'Parta aqui a viagem em vez de seguir direto até Merzouga.',
    },
    'draa-palms': {
      title: 'Percorrer os palmeirais do Draa',
      body: 'A sul de Ouarzazate a estrada segue o rio mais longo de Marrocos por um corredor de palmeiras-tamareiras e aldeias de taipa até Zagora. É o deserto mais verde que alguma vez verá.',
      tip: 'As tâmaras colhem-se no outono: as bancas da estrada vendem-nas frescas.',
    },
    chefchaouen: {
      title: 'Passear pela medina azul de Chefchaouen',
      body: 'Uma vila pintada em cem tons de azul, empilhada numa encosta do Rif. Meio dia de vielas e escadarias chega, e o miradouro acima da vila compensa a subida pela luz do fim da tarde.',
      tip: 'Aqui vive gente: pergunte antes de fotografar portas e pessoas.',
    },
    essaouira: {
      title: 'Caminhar pelas muralhas de Essaouira',
      body: 'O vento atlântico mantém Essaouira fresca quando o interior arde. As muralhas da Sqala olham o mar com os canhões ainda nos seus lugares, e o porto lá em baixo cheira a peixe e a tinta fresca.',
      tip: 'Leve um casaco mesmo no verão: o vento não pára.',
    },
    surfing: {
      title: 'Surfar na costa atlântica',
      body: 'A norte de Agadir a costa encadeia pontas e ondas de praia, com escola de surf em cada aldeia. Os principiantes encontram ondas longas e tolerantes; os recifes funcionam para os restantes quando entra ondulação.',
      tip: 'O inverno traz a maior ondulação. O verão é mais suave e melhor para aprender.',
    },
    'agadir-beach': {
      title: 'Encontrar os dromedários na praia de Agadir',
      body: 'A baía de Agadir é uma longa curva de areia com um passeio marítimo atrás, e dromedários à espera junto à água para o passeio do fim do dia. É a aterragem mais suave de Marrocos depois de um voo.',
      tip: 'Combine o passeio e o preço antes de subir.',
    },
    'hassan-ii': {
      title: 'Ver a mesquita Hassan II sobre o oceano',
      body: 'A grande mesquita de Casablanca foi construída sobre o Atlântico, e a escala só se percebe ao pé do minarete, com a ondulação a rebentar em baixo. Visitantes não muçulmanos podem entrar nas visitas guiadas.',
      tip: 'Confirme os horários no próprio dia: mudam em função das orações.',
    },
    'amazigh-music': {
      title: 'Assistir a uma noite de música amazigh',
      body: 'Tambores bendir, palmas e canto de pergunta e resposta: é assim que passam as noites no sul. Tocada ao ar livre à volta da fogueira, é menos espetáculo do que conversa, e os convidados acabam depressa dentro do círculo.',
      tip: 'Diga que sim quando lhe passarem um tambor. Ninguém avalia o seu ritmo.',
    },
    'mint-tea': {
      title: 'Beber o chá como aqui se serve',
      body: 'Chá verde, hortelã fresca, açúcar, servido do alto para levantar espuma, e nunca um só copo. É oferecido em todo o lado — lojas, acampamentos, casas — e é assim que começa uma conversa.',
      tip: 'Aceitar o segundo copo é normal. Recusar os três não é.',
    },
    'moroccan-table': {
      title: 'Sentar-se a uma verdadeira mesa marroquina',
      body: 'Um tajine cozinhado devagar sobre brasas, saladas cozidas para começar, cuscuz à sexta-feira, pão em vez de talheres. Pergunte ao seu guia onde ele come e ficará melhor servido do que com qualquer lista.',
      tip: 'Indique alergias ou dieta vegetariana ao pedir o orçamento: as cozinhas planeiam com antecedência.',
    },
  },
};

export default pt;
