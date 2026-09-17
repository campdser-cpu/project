import type { MgHubCopy } from './types';

const es: MgHubCopy = {
  hero: {
    eyebrow: 'Merzouga · Erg Chebbi · Sáhara',
    title: 'Guía de viaje de Merzouga',
    lead: 'Merzouga es el pueblo situado al borde de Erg Chebbi, el campo de dunas más conocido de Marruecos. En esta guía te contamos cómo es de verdad el desierto, cómo llegar, cuánto tiempo quedarte y cómo elegir entre ruta en dromedario, campamento y excursión en 4x4, escrita por guías que viven aquí.',
    alt: 'Las dunas de Erg Chebbi, de un naranja intenso bajo un cielo azul oscuro al atardecer',
  },
  facts: [
    { label: 'Dónde', value: 'Sureste de Marruecos, a unos 50 km de la frontera con Argelia' },
    { label: 'Las dunas', value: 'Erg Chebbi: unos 28 km de largo y hasta unos 150 m de altura' },
    { label: 'Cómo llegar', value: '9–10 h por carretera desde Marrakech, 7–8 h desde Fez' },
    { label: 'Mejores meses', value: 'De octubre a abril' },
    { label: 'Cuánto tiempo', value: 'Una noche como mínimo, dos si puedes' },
  ],
  nav: {
    label: 'En esta guía',
    items: ['Ruta en dromedario', 'Campamentos', '4x4 y quads', 'Qué llevar', 'Cuándo ir', 'Todas las guías'],
  },
  story: {
    erg: {
      eyebrow: 'El pueblo y las dunas',
      heading: 'Merzouga y Erg Chebbi no son lo mismo',
      paragraphs: [
        'Merzouga es un pueblo pequeño y con vida propia: una carretera asfaltada, casas de huéspedes, algunas tiendas y cafés, y huertos de palmeras en sus afueras. Erg Chebbi es el mar de arena que se levanta justo detrás, una franja de dunas de unos 28 km que cambia de color a lo largo del día, del dorado pálido del mediodía al naranja intenso del atardecer.',
        'La mayoría de los campamentos está dentro de las dunas, a un paseo en dromedario o a un breve trayecto en 4x4 del pueblo. Alrededor del erg se extiende la hamada, una llanura plana y pedregosa salpicada de aldeas como Hassilabied o Khamlia. Por eso, cuando alguien dice que «fue a Merzouga», casi siempre quiere decir que durmió en Erg Chebbi.',
      ],
      alt: 'Un viajero con chilaba de rayas y capucha levanta los brazos frente a las dunas de Erg Chebbi desde la carretera cerca de Merzouga',
    },
    camel: {
      eyebrow: 'La experiencia clásica',
      heading: 'Ruta en dromedario al atardecer',
      paragraphs: [
        'Las rutas salen más o menos una hora antes de la puesta de sol, cuando la arena ya se ha enfriado. Un guía camina delante llevando a los dromedarios de la cuerda, y el trayecto hasta el campamento suele durar entre 50 y 70 minutos, a un paso lento y cadencioso. Casi todos los grupos paran en una cresta alta para ver cómo la luz se vuelve naranja antes de seguir hasta el campamento.',
        'Es un paseo tranquilo, no una prueba física, pero la primera bajada empinada sorprende a todo el mundo: échate hacia atrás y sujétate al asa. Lleva pantalón largo y un calzado que no se salga del pie, y ten a mano un pañuelo por si el viento levanta arena. El equipaje grande se queda en el vehículo, así que lleva solo una bolsa pequeña para la noche.',
      ],
      alt: 'Un guía con túnica azul conduce una fila de dromedarios por las dunas de Erg Chebbi al anochecer',
    },
    camp: {
      eyebrow: 'La noche en el Sáhara',
      heading: 'Una noche en un campamento del desierto',
      paragraphs: [
        'Un campamento es un conjunto de jaimas alrededor de un patio con alfombras, faroles y mesas bajas. Después de la ruta llega el té a la menta, luego la cena, a menudo un tajín, y muchas noches música alrededor del fuego. Sin luces de ninguna ciudad cerca, un cielo despejado y sin luna muestra más estrellas de las que la mayoría de los viajeros ha visto nunca.',
        'Los campamentos estándar tienen jaimas privadas sencillas con aseos y duchas compartidos. Los de lujo, como el nuestro, añaden camas de verdad, baño privado con ducha caliente y más espacio. En ambos casos la cena y el desayuno están incluidos. De noviembre a marzo las noches son frías, así que las mantas gruesas no están de adorno.',
      ],
      alt: 'Una alfombra flanqueada de faroles que conduce a un campamento de lujo en el desierto al anochecer, con jaimas y huéspedes al fondo',
    },
    fourByFour: {
      eyebrow: 'Más allá de las dunas',
      heading: '4x4, quads y buggies',
      paragraphs: [
        'Una vuelta de media jornada en 4x4 es la forma más sencilla de conocer lo que rodea al erg: Khamlia y sus músicos gnawa, familias nómadas que viven en la hamada, antiguas explotaciones mineras y, tras un invierno lluvioso, un lago estacional que atrae aves. Dentro de las dunas, un conductor con experiencia sube y baja pendientes que desde abajo parecen imposibles.',
        'Los quads y los buggies se alquilan por horas en el borde de las dunas. Son muy divertidos, pero ruidosos: si quieres un atardecer tranquilo, resérvalos para la mañana. Elige una empresa que te dé casco y te acompañe con un guía.',
      ],
      alt: 'Un 4x4 blanco levanta una nube de arena mientras cruza unas dunas anaranjadas',
    },
    people: {
      eyebrow: 'Vida local',
      heading: 'La gente que vive aquí',
      paragraphs: [
        'Merzouga es tierra amazigh y muchas familias tienen raíces nómadas. Casi todas las visitas empiezan con un vaso de té a la menta, y aceptarlo forma parte de la bienvenida. Pide permiso antes de fotografiar a alguien y viste con discreción en el pueblo, con hombros y rodillas cubiertos.',
        'Khamlia, a unos 7 km al sur, es conocida por la música gnawa, cuyas raíces están en el África subsahariana. Rissani, a unos 35 km al norte, es la histórica ciudad de mercado del Tafilalt y una parada cómoda a la ida o a la vuelta. Lleva algo de cambio en dírhams para propinas, té y artesanía.',
      ],
      alt: 'Un guía con un turbante de colores y una viajera sonriente comparten té a la menta sobre una alfombra en las dunas',
    },
  },
  pack: {
    eyebrow: 'Práctico',
    heading: 'Qué llevar al desierto de Merzouga',
    intro: 'Prepárate para dos climas en un mismo día: un sol fuerte sobre la arena y un descenso real de la temperatura cuando anochece. Todo lo que sigue cabe en una bolsa pequeña para la noche.',
    groups: [
      {
        title: 'Para el día',
        items: [
          'Ropa holgada de manga larga y colores claros',
          'Gafas de sol, sombrero y protector solar SPF 30 o más',
          'Un pañuelo o turbante contra el sol y la arena',
          'Una botella de agua reutilizable',
        ],
      },
      {
        title: 'Para la noche',
        items: [
          'Un forro polar o plumífero de octubre a abril',
          'Calcetines gruesos y gorro para el amanecer',
          'Una linterna frontal o de mano',
          'Una batería externa cargada',
        ],
      },
      {
        title: 'Conviene saber',
        items: [
          'Las maletas grandes se quedan en el vehículo',
          'Lleva dírhams en efectivo: en el desierto casi nunca se acepta tarjeta',
          'Calzado cerrado para las dunas, sandalias para el campamento',
          'Deja el dron en casa: en Marruecos no se permite sin autorización',
        ],
      },
    ],
    alt: 'Un guía y dos viajeras envueltos en pañuelos y con gafas de sol sonríen en las dunas al atardecer',
  },
  basics: {
    eyebrow: 'Lo esencial',
    heading: 'Cuándo ir, cuánto quedarse y cómo llegar',
    items: {
      when: {
        title: 'Cuándo ir',
        body: 'De octubre a abril es la temporada más agradable: días templados y noches frescas o frías, cercanas a cero grados en diciembre y enero. De junio a agosto el calor diurno supera a menudo los 40 °C, así que las actividades se hacen a primera hora y al final del día. La primavera puede traer viento fuerte y arena en suspensión.',
      },
      stay: {
        title: 'Cuánto quedarse',
        body: 'Una noche basta para lo esencial: ruta al atardecer, cena en el campamento y amanecer. Con dos noches tienes un día completo para una vuelta en 4x4, Khamlia y una mañana sin prisas antes del largo viaje de regreso, y eso es lo que solemos recomendar.',
      },
      getting: {
        title: 'Cómo llegar',
        body: 'Merzouga está a unas 9–10 horas por carretera de Marrakech y a 7–8 horas de Fez, por lo que la mayoría de los viajeros parte el trayecto con una noche en los valles del Dades o del Todra, o dedica un día entero a cruzar el Medio Atlas desde Fez. El aeropuerto más cercano es el de Errachidia, a unas dos horas en coche.',
      },
    },
  },
  mistakes: {
    eyebrow: 'Consejos de guía',
    heading: 'Errores habituales de la primera visita',
    items: [
      { title: 'Llegar de noche', body: 'Sal con tiempo para llegar a las dunas a media tarde; si no, te perderás la ruta del atardecer.' },
      { title: 'Preparar la maleta solo para el calor', body: 'Incluso en primavera, una noche en las dunas puede ser fría.' },
      { title: 'Hacer Marrakech–Merzouga–Marrakech en dos días', body: 'Se puede, pero pasarás casi todo el tiempo en el coche.' },
      { title: 'Llevar una maleta grande al campamento', body: 'Con una bolsa pequeña para la noche es suficiente.' },
      { title: 'Confiar en la tarjeta', body: 'Saca suficiente efectivo antes de llegar al desierto.' },
      { title: 'Contar con buena cobertura en las dunas', body: 'Descarga mapas, billetes y música antes de salir.' },
    ],
  },
  choose: {
    eyebrow: 'Elegir',
    heading: '¿Qué experiencia en el desierto va contigo?',
    items: {
      standard: {
        title: 'Campamento estándar y dromedario',
        body: 'La noche clásica: paseo al atardecer, cena, estrellas y amanecer, en una jaima privada sencilla con baños compartidos. Para quien valora más la experiencia que la comodidad.',
      },
      luxury: {
        title: 'Campamento de lujo',
        body: 'Las mismas dunas con cama de verdad, baño privado y más espacio. Ideal para parejas, familias y quien descansa mejor con comodidad.',
      },
      active: {
        title: 'Añadir un día de 4x4 o quad',
        body: 'Para quien quiere ver más que las dunas o busca una mañana activa. Funciona mejor con dos noches.',
      },
    },
    compare: 'Comparar campamento de lujo y estándar',
  },
  guides: {
    groups: { experiences: 'Experiencias', planning: 'Planificación', places: 'Rutas y lugares' },
    inEnglish: 'En inglés',
    allHeading: 'Todas nuestras guías de Merzouga',
  },
  tours: { heading: 'Circuitos con una noche en Merzouga' },
  moreLabel: 'Guías relacionadas',
};

export default es;
