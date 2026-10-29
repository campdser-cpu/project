// ─────────────────────────────────────────────────────────────────────────────
// Morocco Grand Adventure — Contact Info
// Owner: Mohamed BouGhrara
//
// Split out of src/data/content.ts (performance fix): contactInfo is read by
// Navbar, Footer, WhatsAppButton, StructuredData and other components that
// render on every page and are never code-split, so importing it from
// content.ts pulled that file's entire ~300 KB of tours/destinations/FAQ data
// into the main JS bundle — confirmed by finding tour-only strings (e.g. tour
// names) inside dist/assets/index-*.js. Moving just this constant to its own
// module lets those always-eager components skip that data entirely; every
// page that actually needs tours/destinations still imports them from
// content.ts as before, unaffected by this split.
// ─────────────────────────────────────────────────────────────────────────────
export const contactInfo = {
  whatsapp: "https://wa.me/212699846818",
  whatsappNumber: "+212 699 846 818",
  phone: "+212 699 846 818",
  instagram: "https://www.instagram.com/morocco_grand_adventure/",
  email: "moroccograndadventure@gmail.com",
  website: "https://www.moroccograndadventure.com",
  tripadvisor: "https://www.tripadvisor.com/Attraction_Review-g304017-d34678153-Reviews-Morocco_Grand_Adventure-Merzouga_Draa_Tafilalet.html",
  paypal: "https://www.paypal.me/MohamedbouGhrara683",
  ownerName: "Mohamed BouGhrara",
  companyName: "Morocco Grand Adventure",
  address: "Merzouga, Errachidia Province, Morocco",
};
