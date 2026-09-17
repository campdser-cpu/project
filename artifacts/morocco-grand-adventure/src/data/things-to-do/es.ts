import type { ThingsCopy } from './types';

const es: ThingsCopy = {
  heading: '25 cosas que hacer en Marruecos',
  intro:
    'Marruecos premia a quien elige unas cuantas experiencias y las vive de verdad. Estas veinticinco son las que nuestros guías repiten siempre: la duna que se sube antes del amanecer, el callejón que huele a cedro y hierbabuena, la garganta donde se acaba la carretera. Cada una dice dónde está y cómo es en realidad, para que armes una ruta a la medida del tiempo que tengas.',
  kicker: 'Una guía escrita por quienes recorren estas carreteras',
  ctaTitle: 'Arma tu propia versión de esta lista',
  ctaText:
    'Cuéntanos cuáles te apetecen y cuántos días tienes. Las ordenamos de forma que funcionen sobre el mapa y te enviamos un presupuesto para tus fechas y tu grupo.',
  ctaButton: 'Planificar mi viaje',
  groups: {
    sahara: 'El Sáhara',
    marrakech: 'Marrakech',
    fes: 'Fez',
    south: 'La ruta del sur',
    coast: 'El norte y la costa',
    culture: 'Cultura y mesa',
  },
  links: {
    guide: 'Leer la guía',
    experience: 'Ver la experiencia',
    tours: 'Ver los circuitos',
    destination: 'Descubrir el destino',
    about: 'Conocer al equipo',
  },
  items: {
    'camel-trek': {
      title: 'Montar en dromedario hacia las dunas de Erg Chebbi',
      body: 'La caravana sale de Merzouga a última hora de la tarde y se adentra en la arena mientras la luz pasa del dorado al rosa. Es más lento de lo que imaginas y mucho más silencioso: a los diez minutos solo se oyen las pisadas y el viento en las crestas.',
      tip: 'Lleva pantalón largo y un pañuelo: refresca en cuanto cae el sol.',
    },
    'desert-camp': {
      title: 'Dormir en un campamento entre las dunas',
      body: 'Los campamentos se montan en las hondonadas del erg, lejos de la vista del pueblo, con alfombras en el suelo y cena bajo la lona. Recogidos los platos, el fuego y los tambores llenan la noche hasta que el frío manda a todos a la cama.',
      tip: 'De noviembre a febrero las noches son frías: un forro polar merece el espacio en la maleta.',
    },
    'dune-sunrise': {
      title: 'Subir una duna para ver el amanecer',
      body: 'El amanecer justifica madrugar a oscuras. Subir una duna cuesta en arena blanda, pero desde la cresta el erg se despliega en ondas y el color cambia minuto a minuto según el sol supera el horizonte.',
      tip: 'Sal unos cuarenta minutos antes del amanecer y sube descalzo: las botas se llenan de arena.',
    },
    stargazing: {
      title: 'Mirar el cielo del Sáhara después de cenar',
      body: 'Lejos de los pueblos, el cielo del desierto es el plan de la noche. Los salones del campamento se iluminan con farolillos y no con focos, y cuando la vista se acostumbra las estrellas cubren el cielo de horizonte a horizonte.',
      tip: 'Deja que tus ojos se adapten un cuarto de hora y apaga las pantallas.',
    },
    'dune-driving': {
      title: 'Cruzar las dunas en 4x4',
      body: 'El 4x4 llega donde el dromedario no: la hamada llana, la roca volcánica negra, los pueblos al borde de la arena. La conducción sobre dunas es corta e intensa: unos minutos de subidas y derrapes con el motor a fondo.',
      tip: 'Pide la salida de la mañana si te mareas: el aire está más fresco y tranquilo.',
    },
    'quad-biking': {
      title: 'Salir en quad por el erg',
      body: 'El quad es el contrapunto ruidoso del dromedario y la forma más rápida de entender el tamaño de Erg Chebbi. Las rutas siguen la arena firme al pie de las dunas, con un guía abriendo camino.',
      tip: 'Lleva gafas y un pañuelo para la cara: la arena viaja contigo.',
    },
    'jemaa-el-fna': {
      title: 'Cenar en la plaza Jemaa el-Fna',
      body: 'Cada tarde la plaza principal de Marrakech se convierte en una cocina al aire libre: puestos numerados, vapor, bancos compartidos con desconocidos. Es ruidosa y teatral, y sigue siendo donde come la ciudad.',
      tip: 'Da una vuelta completa antes de elegir y confirma lo que has pedido antes de que llegue.',
    },
    'marrakech-souks': {
      title: 'Perderse en los zocos de Marrakech',
      body: 'Al norte de la plaza la medina se cierra sobre tu cabeza: túneles de cuero, tiendas de lámparas, callejones de tintoreros. Perderse forma parte del plan; los callejones acaban devolviéndote a una calle conocida.',
      tip: 'Fija una referencia y una hora de salida, y camina sin mapa.',
    },
    'ben-youssef': {
      title: 'Entrar en el patio de la madraza Ben Youssef',
      body: 'La antigua escuela coránica es la sala más serena de Marrakech: cedro tallado, estuco y zellige alrededor de una lámina de agua quieta. Ve temprano y tendrás el patio casi para ti.',
      tip: 'La mañana es el rato más tranquilo, y la luz sobre los azulejos es mejor entonces.',
    },
    'fes-medina': {
      title: 'Recorrer los callejones de Fez el-Bali',
      body: 'Fez es la medina que aún funciona: burros cargados de mercancía, talleres detrás de cada puerta, calles demasiado estrechas para un motor. Una mañana aquí enseña cómo vive hoy una ciudad medieval.',
      tip: 'Contrata un guía local la primera media jornada: los callejones despistan de verdad.',
    },
    tanneries: {
      title: 'Asomarse a las tenerías de Chouara',
      body: 'Las cubas de piedra de Fez se trabajan a mano desde hace siglos, y las terrazas que las miran pertenecen a las tiendas de cuero. El olor es real, los colores son extraordinarios y el trabajo de abajo es duro.',
      tip: 'Te darán un ramito de hierbabuena para la nariz. Acéptalo.',
    },
    'medina-crafts': {
      title: 'Ver trabajar a un artesano',
      body: 'Detrás de los escaparates la medina es un taller: herreros en la fragua, torneros de cedro, caldereros, tejedores. Pararse a mirar —y comprar a quien fabricó la pieza— sigue siendo el mejor recuerdo posible.',
      tip: 'Pregunta antes de fotografiar a alguien trabajando; la mayoría dirá que sí.',
    },
    'tichka-road': {
      title: 'Cruzar el Alto Atlas por el Tizi n’Tichka',
      body: 'La carretera de Marrakech a Uarzazate sube entre nogales y curvas cerradas hasta el puerto, y luego baja al país de las kasbahs rojas. El trayecto es la atracción: las paradas importan más que el reloj.',
      tip: 'Para en los miradores de la subida: la luz es mejor antes del mediodía.',
    },
    'ait-ben-haddou': {
      title: 'Subir al ksar de Ait Ben Haddou',
      body: 'Las torres de adobe sobre el río Ounila son Patrimonio Mundial de la UNESCO y han servido de plató muchas veces. Cruza el río, sube por los callejones y llega al granero para mirar el valle desde arriba.',
      tip: 'Está a unos treinta minutos de Uarzazate: ve temprano o al final del día para evitar la luz dura.',
    },
    'todra-gorge': {
      title: 'Caminar dentro de la garganta del Todra',
      body: 'Las paredes calizas se cierran en un pasillo apenas más ancho que la carretera, con un arroyo al fondo. Camina más allá de los hoteles y el ruido desaparece; arriba hay escaladores colgados de la roca.',
      tip: 'A última hora de la tarde la luz toca lo alto de las paredes y hay menos gente.',
    },
    'dades-valley': {
      title: 'Seguir la carretera del valle del Dades',
      body: 'Entre Uarzazate y el desierto, el Dades dibuja una cinta de oasis con kasbahs en las laderas. Las curvas famosas merecen la parada, pero son los pueblos de alrededor los que invitan a ir despacio.',
      tip: 'Parte aquí el trayecto en vez de llegar del tirón a Merzouga.',
    },
    'draa-palms': {
      title: 'Recorrer los palmerales del Draa',
      body: 'Al sur de Uarzazate la carretera sigue el río más largo de Marruecos por un corredor de palmeras datileras y pueblos de adobe hasta Zagora. Es el desierto más verde que verás.',
      tip: 'Los dátiles se cosechan en otoño: los puestos de la carretera los venden frescos.',
    },
    chefchaouen: {
      title: 'Pasear por la medina azul de Chauen',
      body: 'Un pueblo pintado en cien tonos de azul, apilado en una ladera del Rif. Media jornada de callejones y escaleras basta, y el mirador sobre el pueblo merece la subida por la luz del atardecer.',
      tip: 'Aquí vive gente: pregunta antes de fotografiar puertas y personas.',
    },
    essaouira: {
      title: 'Caminar por las murallas de Esauira',
      body: 'El viento atlántico mantiene fresca Esauira cuando el interior arde. Las murallas de la Sqala miran al mar con los cañones aún en su sitio, y el puerto de abajo huele a pescado y pintura fresca.',
      tip: 'Lleva chaqueta incluso en verano: el viento no para.',
    },
    surfing: {
      title: 'Surfear la costa atlántica',
      body: 'Al norte de Agadir la costa encadena puntas y beach breaks, con escuela de surf en cada pueblo. Los principiantes encuentran olas largas y perdonavidas; los arrecifes funcionan para el resto cuando entra el swell.',
      tip: 'El invierno trae el mayor swell. El verano es más suave y mejor para aprender.',
    },
    'agadir-beach': {
      title: 'Encontrarte con los dromedarios en la playa de Agadir',
      body: 'La bahía de Agadir es una curva larga de arena con paseo marítimo detrás, y dromedarios esperando junto al agua para el paseo del final del día. Es el aterrizaje más suave de Marruecos después de un vuelo.',
      tip: 'Acuerda el paseo y el precio antes de subir.',
    },
    'hassan-ii': {
      title: 'Ver la mezquita Hassan II sobre el océano',
      body: 'La gran mezquita de Casablanca está construida sobre el Atlántico, y su escala solo se entiende al pie del alminar, con las olas rompiendo debajo. Los visitantes no musulmanes pueden entrar en las visitas guiadas.',
      tip: 'Consulta los horarios el mismo día: cambian alrededor de los rezos.',
    },
    'amazigh-music': {
      title: 'Asistir a una noche de música amazigh',
      body: 'Tambores bendir, palmas y canto de llamada y respuesta: así pasan las noches en el sur. Tocada al aire libre junto al fuego, es menos espectáculo que conversación, y a los invitados se les acaba metiendo en el corro.',
      tip: 'Di que sí cuando te pasen un tambor. Nadie juzga tu ritmo.',
    },
    'mint-tea': {
      title: 'Tomar el té como se sirve aquí',
      body: 'Té verde, hierbabuena fresca, azúcar, servido desde lo alto para levantar espuma, y nunca un solo vaso. Se ofrece en todas partes —tiendas, campamentos, casas— y es así como empieza una conversación.',
      tip: 'Aceptar el segundo vaso es lo normal. Rechazar los tres, no.',
    },
    'moroccan-table': {
      title: 'Sentarse a una buena mesa marroquí',
      body: 'Un tajín cocinado despacio sobre brasas, ensaladas cocidas para empezar, cuscús los viernes, pan en lugar de cubiertos. Pregunta a tu guía dónde come y acertarás más que con cualquier lista.',
      tip: 'Avísanos de alergias o dieta vegetariana al reservar: las cocinas se organizan con antelación.',
    },
  },
};

export default es;
