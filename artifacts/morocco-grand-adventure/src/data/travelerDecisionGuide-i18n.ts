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
