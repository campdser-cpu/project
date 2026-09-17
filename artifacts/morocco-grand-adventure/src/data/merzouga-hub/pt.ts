import type { MgHubCopy } from './types';

// European Portuguese, matching the rest of the site's pt locale.
const pt: MgHubCopy = {
  hero: {
    eyebrow: 'Merzouga · Erg Chebbi · Saara',
    title: 'Guia de viagem de Merzouga',
    lead: 'Merzouga é a aldeia à beira do Erg Chebbi, o campo de dunas mais conhecido de Marrocos. Este guia explica como é realmente o deserto, como lá chegar, quanto tempo ficar e como escolher entre passeio de dromedário, acampamento e saída em 4x4 — escrito por guias que vivem aqui.',
    alt: 'As dunas do Erg Chebbi, cor de laranja intenso sob um céu azul-escuro ao entardecer',
  },
  facts: [
    { label: 'Onde', value: 'Sudeste de Marrocos, a cerca de 50 km da fronteira com a Argélia' },
    { label: 'As dunas', value: 'Erg Chebbi: cerca de 28 km de extensão, até cerca de 150 m de altura' },
    { label: 'Como chegar', value: '9 a 10 h de estrada desde Marraquexe, 7 a 8 h desde Fez' },
    { label: 'Melhores meses', value: 'De outubro a abril' },
    { label: 'Quanto tempo', value: 'Uma noite no mínimo, duas se possível' },
  ],
  nav: {
    label: 'Neste guia',
    items: ['Passeio de dromedário', 'Acampamentos', '4x4 e moto-quatro', 'O que levar', 'Quando ir', 'Todos os guias'],
  },
  story: {
    erg: {
      eyebrow: 'A aldeia e as dunas',
      heading: 'Merzouga e o Erg Chebbi não são a mesma coisa',
      paragraphs: [
        'Merzouga é uma pequena aldeia com vida própria: uma estrada asfaltada, casas de hóspedes, algumas lojas e cafés, e hortas de palmeiras nos arredores. O Erg Chebbi é o mar de areia que se ergue logo atrás, uma faixa de dunas com cerca de 28 km que muda de cor ao longo do dia, do dourado pálido ao meio-dia ao laranja profundo ao pôr do sol.',
        'A maioria dos acampamentos fica no meio das dunas, a um passeio de dromedário ou a uma curta viagem de 4x4 da aldeia. À volta do erg estende-se a hamada, uma planície plana e pedregosa com aldeias como Hassilabied e Khamlia. Por isso, quando alguém diz que «foi a Merzouga», quase sempre quer dizer que dormiu no Erg Chebbi.',
      ],
      alt: 'Um viajante de djellaba às riscas com capuz ergue os braços para as dunas do Erg Chebbi a partir da estrada perto de Merzouga',
    },
    camel: {
      eyebrow: 'A experiência clássica',
      heading: 'Passeio de dromedário ao pôr do sol',
      paragraphs: [
        'Os passeios partem cerca de uma hora antes do pôr do sol, quando a areia já arrefeceu. Um guia vai à frente a conduzir os dromedários pela corda, e o percurso até ao acampamento costuma demorar entre 50 e 70 minutos, num passo lento e embalado. A maioria dos grupos para numa crista alta para ver a luz ficar cor de laranja antes de seguir para o acampamento.',
        'É um passeio calmo, não um esforço físico, mas a primeira descida íngreme surpreende toda a gente: incline-se para trás e segure a pega. Use calças compridas e calçado que não saia do pé, e tenha um lenço à mão para a areia levantada pelo vento. A bagagem grande fica no veículo, por isso leve apenas um saco pequeno para a noite.',
      ],
      alt: 'Um guia de túnica azul conduz uma fila de dromedários pelas dunas do Erg Chebbi ao anoitecer',
    },
    camp: {
      eyebrow: 'A noite no Saara',
      heading: 'Uma noite num acampamento no deserto',
      paragraphs: [
        'Um acampamento é um conjunto de tendas à volta de um pátio com tapetes, lanternas e mesas baixas. Depois do passeio vem o chá de menta, a seguir o jantar, muitas vezes uma tajine, e em muitas noites música à volta da fogueira. Sem luzes de cidade por perto, um céu limpo e sem lua mostra mais estrelas do que a maioria dos visitantes alguma vez viu.',
        'Os acampamentos standard têm tendas privadas simples, com casas de banho e duches partilhados. Os de luxo, incluindo o nosso, acrescentam camas a sério, casa de banho privativa com duche quente e mais espaço. Em ambos, o jantar e o pequeno-almoço estão incluídos. De novembro a março as noites são frias, por isso os cobertores grossos não estão lá por acaso.',
      ],
      alt: 'Um tapete ladeado de lanternas conduz a um acampamento de luxo no deserto ao anoitecer, com tendas e hóspedes ao fundo',
    },
    fourByFour: {
      eyebrow: 'Para lá das dunas',
      heading: '4x4, moto-quatro e buggy',
      paragraphs: [
        'Uma volta de meio dia em 4x4 é a forma mais simples de conhecer o que rodeia o erg: Khamlia e os seus músicos gnawa, famílias nómadas que vivem na hamada, antigas explorações mineiras e, depois de um inverno chuvoso, um lago sazonal que atrai aves. Dentro das dunas, um condutor experiente faz subidas e descidas que, vistas de baixo, parecem impossíveis.',
        'As moto-quatro e os buggies alugam-se à hora na orla das dunas. São muito divertidos, mas barulhentos: se quer um pôr do sol tranquilo, reserve-os para a manhã. Escolha uma empresa que forneça capacete e envie um guia consigo.',
      ],
      alt: 'Um 4x4 branco levanta uma nuvem de areia ao atravessar dunas cor de laranja',
    },
    people: {
      eyebrow: 'Vida local',
      heading: 'As pessoas que vivem aqui',
      paragraphs: [
        'Merzouga é terra amazigh e muitas famílias têm raízes nómadas. Quase todas as visitas começam com um copo de chá de menta, e aceitá-lo faz parte do acolhimento. Peça sempre autorização antes de fotografar alguém e vista-se com discrição na aldeia, com ombros e joelhos cobertos.',
        'Khamlia, a cerca de 7 km a sul, é conhecida pela música gnawa, cujas raízes estão na África subsariana. Rissani, a uns 35 km a norte, é a histórica cidade de mercado do Tafilalt e uma paragem fácil à ida ou à volta. Leve algum dinheiro trocado em dirhams para gorjetas, chá e artesanato.',
      ],
      alt: 'Um guia de turbante colorido e uma viajante sorridente partilham chá de menta sobre um tapete nas dunas',
    },
  },
  pack: {
    eyebrow: 'Informação prática',
    heading: 'O que levar para o deserto de Merzouga',
    intro: 'Prepare-se para dois climas no mesmo dia: sol forte sobre a areia e depois uma verdadeira descida de temperatura quando anoitece. Tudo o que se segue cabe num saco pequeno para a noite.',
    groups: [
      {
        title: 'Para o dia',
        items: [
          'Roupa larga de manga comprida e cores claras',
          'Óculos de sol, chapéu e protetor solar FPS 30 ou superior',
          'Um lenço ou turbante contra o sol e a areia',
          'Uma garrafa de água reutilizável',
        ],
      },
      {
        title: 'Para a noite',
        items: [
          'Um polar quente ou um casaco de penas de outubro a abril',
          'Meias quentes e um gorro para o nascer do sol',
          'Uma lanterna frontal ou de mão',
          'Uma bateria externa carregada',
        ],
      },
      {
        title: 'Convém saber',
        items: [
          'As malas grandes ficam no veículo',
          'Leve dirhams em dinheiro: no deserto raramente se aceita cartão',
          'Calçado fechado para as dunas, sandálias para o acampamento',
          'Deixe o drone em casa: em Marrocos não é permitido sem autorização',
        ],
      },
    ],
    alt: 'Um guia e duas viajantes envoltos em lenços e de óculos de sol sorriem nas dunas ao pôr do sol',
  },
  basics: {
    eyebrow: 'O essencial',
    heading: 'Quando ir, quanto tempo ficar e como chegar',
    items: {
      when: {
        title: 'Quando ir',
        body: 'De outubro a abril é a época mais agradável: dias amenos e noites frescas ou frias, perto de zero graus em dezembro e janeiro. De junho a agosto o calor diurno ultrapassa muitas vezes os 40 °C, por isso as atividades passam para o início da manhã e o fim do dia. A primavera pode trazer vento forte e areia no ar.',
      },
      stay: {
        title: 'Quanto tempo ficar',
        body: 'Uma noite chega para o essencial: passeio ao pôr do sol, jantar no acampamento e nascer do sol. Com duas noites fica com um dia inteiro para uma volta em 4x4, Khamlia e uma manhã sem pressas antes da longa viagem de regresso, e é isso que costumamos recomendar.',
      },
      getting: {
        title: 'Como chegar',
        body: 'Merzouga fica a cerca de 9 a 10 horas de estrada de Marraquexe e a 7 a 8 horas de Fez, pelo que a maioria dos viajantes divide o percurso com uma noite nos vales do Dadès ou do Todra, ou reserva um dia inteiro para atravessar o Médio Atlas a partir de Fez. O aeroporto mais próximo é o de Errachidia, a cerca de duas horas de carro.',
      },
    },
  },
  mistakes: {
    eyebrow: 'Conselhos dos nossos guias',
    heading: 'Erros comuns na primeira visita',
    items: [
      { title: 'Chegar já de noite', body: 'Parta a tempo de chegar às dunas ao fim da tarde; caso contrário, perde o passeio ao pôr do sol.' },
      { title: 'Levar roupa só para o calor', body: 'Mesmo na primavera, uma noite nas dunas pode ser fria.' },
      { title: 'Fazer Marraquexe–Merzouga–Marraquexe em dois dias', body: 'É possível, mas passa a maior parte do tempo dentro do carro.' },
      { title: 'Levar uma mala grande para o acampamento', body: 'Um saco pequeno para a noite é suficiente.' },
      { title: 'Contar com o cartão', body: 'Levante dinheiro suficiente antes de chegar ao deserto.' },
      { title: 'Esperar boa rede nas dunas', body: 'Descarregue mapas, bilhetes e música antes de partir.' },
    ],
  },
  choose: {
    eyebrow: 'Escolher',
    heading: 'Que experiência no deserto é para si?',
    items: {
      standard: {
        title: 'Acampamento standard e dromedário',
        body: 'A noite clássica: passeio ao pôr do sol, jantar, estrelas e nascer do sol, numa tenda privada simples com casas de banho partilhadas. Ideal se a experiência conta mais do que o conforto.',
      },
      luxury: {
        title: 'Acampamento de luxo',
        body: 'As mesmas dunas com uma cama a sério, casa de banho privativa e mais espaço. Indicado para casais, famílias e quem dorme melhor com conforto.',
      },
      active: {
        title: 'Juntar um dia de 4x4 ou moto-quatro',
        body: 'Para quem quer ver mais do que as dunas ou procura uma manhã ativa. Resulta melhor com duas noites.',
      },
    },
    compare: 'Comparar acampamento de luxo e standard',
  },
  guides: {
    groups: { experiences: 'Experiências', planning: 'Planear a viagem', places: 'Percursos e lugares' },
    inEnglish: 'Em inglês',
    allHeading: 'Todos os nossos guias de Merzouga',
  },
  tours: { heading: 'Circuitos com uma noite em Merzouga' },
  moreLabel: 'Guias relacionados',
};

export default pt;
