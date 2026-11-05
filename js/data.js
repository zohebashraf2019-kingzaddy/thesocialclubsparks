/* =========================================================================
   THE SOCIAL CLUB | SPARKS — SITE CONTENT
   -------------------------------------------------------------------------
   This is the ONE file to edit when you post new events, photos or reels.
   Save, commit, push — Vercel redeploys automatically.
   ========================================================================= */

window.SC = window.SC || {};

/* ---------- Club info & links ---------- */
SC.info = {
  name: "The Social Club",
  city: "Sparks, NV",
  address: "906 Victorian Ave, Sparks, NV 89431",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Social+Club+906+Victorian+Ave+Sparks+NV+89431",
  mapsEmbed: "https://maps.google.com/maps?q=906%20Victorian%20Ave%2C%20Sparks%2C%20NV%2089431&z=16&output=embed",
  hours: [
    { days: "Sun · Wed · Thu", time: "4 PM – 12 AM" },
    { days: "Fri · Sat",       time: "4 PM – 3 AM" },
    { days: "Mon · Tue",       time: "Closed · Private events" }
  ],
  // Add the club's phone / email when you have them — they appear automatically.
  phone: "",
  email: "",
  ticketsUrl: "https://lnk.joinpopp.in/event/wrhrgm",
  socials: [
    { name: "Instagram", handle: "@thesocialclubsparks", url: "https://www.instagram.com/thesocialclubsparks/", icon: "instagram" },
    { name: "TikTok",    handle: "@thesocialclubsparks", url: "https://www.tiktok.com/@thesocialclubsparks",  icon: "tiktok" }
    // Add more: { name: "Facebook", handle: "...", url: "https://...", icon: "facebook" }
  ]
};

/* ---------- Events (calendar + lists) ----------
   date:   "YYYY-MM-DD" (the night the party starts)
   status: "on-sale" | "sold-out" | "door-only" | "free" | "info"
   Past events move to "Past Nights" automatically.
   featured: true → shows big on the home page (use for the next headline night)
------------------------------------------------- */
SC.events = [
  {
    id: "rnb-reno-nov",
    title: "RNB RENO",
    subtitle: "Old School & Timeless R&B",
    date: "2026-11-07",
    time: "10 PM – Late",
    genre: "R&B",
    hostedBy: "Club 1% · @overtimetony",
    image: "assets/img/flyer-rnb-reno.jpg",
    status: "door-only",
    statusNote: "Online tickets sold out — limited tickets at the door",
    ticketsUrl: "https://lnk.joinpopp.in/event/wrhrgm",
    featured: true,
    description:
      "A different kind of night. Every song brings back a memory, every lyric hits different — old school favorites, timeless R&B and nothing but good vibes all night long. Bottle service available through DM."
  },
  {
    id: "halloween-2026",
    title: "Halloween at The Social Club",
    subtitle: "Costumes · Cocktails · Spooky Specials",
    date: "2026-10-31",
    time: "Open till 3 AM",
    genre: "Themed Night",
    image: "assets/img/gallery/halloween-nurse-2.jpg",
    status: "info",
    description:
      "Halloween weekend with themed cocktails — Te-Kill-Ya, Spooky Sour, Green Reaper and the Zombie Brain Shooter."
  },
  {
    id: "clave-mc",
    title: "Clave MC — Live",
    subtitle: "From the Bay to Reno",
    date: "2026-10-09",
    time: "10 PM – 2 AM",
    genre: "Latin · Norteño",
    image: "assets/img/poster-great-night.jpg",
    status: "info",
    description: "Clave MC pulled up to The Social Club for a night of live vibes. Tag your crew."
  },
  {
    id: "fantasias-y2k",
    title: "Fantasías: Back to the Y2K",
    subtitle: "Old School vs New School Reggaeton",
    date: "2026-09-19",
    time: "10 PM · 21+",
    genre: "Reggaeton · Hip Hop",
    hostedBy: "@fantasiasparty · DJs Waiz, Fernando, Rekoh Suave",
    image: "assets/img/flyer-fantasias-y2k.jpg",
    status: "info",
    ticketsUrl: "https://fantasiasparty.com",
    description: "Colores, energía, vibras. Reggaeton, old school throwbacks, hip hop — mucho fun y 100% perreo."
  },
  {
    id: "rco-afterparty",
    title: "Sizzling RCO Afterparty",
    subtitle: "Official Rib Cook-Off Afterparty",
    date: "2026-09-04",
    time: "Music starts 9 PM",
    genre: "Open Format",
    hostedBy: "DJ Kentot · Amplified Entertainment",
    image: "assets/img/poster-rib-afterparty.jpg",
    status: "info",
    description:
      "Multiple award-winning DJ Kentot live in the mix — Top 40, Hip Hop, Latin, Old School, Country and everything in between."
  }
];

/* ---------- Reels / video wall ----------
   Drop .mp4 files in assets/video/ and a poster frame in assets/img/.
------------------------------------------ */
SC.reels = [
  { src: "assets/video/reel-discount.mp4",      poster: "assets/img/poster-discount.jpg",      caption: "Behind the bar",          tag: "The Bar" },
  { src: "assets/video/reel-great-night.mp4",   poster: "assets/img/poster-great-night.jpg",   caption: "Great night, great venue", tag: "Live" },
  { src: "assets/video/reel-rib-afterparty.mp4",poster: "assets/img/poster-rib-afterparty.jpg",caption: "RCO Afterparty",           tag: "Afterparty" }
];

/* ---------- Gallery ----------
   Drop images in assets/img/gallery/ and add a line here.
   category is used for the filter chips on the Gallery page.
------------------------------- */
SC.gallery = [
  { src: "assets/img/gallery/halloween-nurse-2.jpg", alt: "Halloween night — the Social Club ladies with bottle service", category: "Halloween" },
  { src: "assets/img/gallery/crowd-sunnies.jpg",     alt: "Friends on the dance floor",                                  category: "Nights" },
  { src: "assets/img/gallery/fantasias-stage.jpg",   alt: "Fantasías Party — DJs on stage under the lasers",             category: "Fantasías" },
  { src: "assets/img/gallery/halloween-nurse-1.jpg", alt: "Halloween costume at the bar",                                category: "Halloween" },
  { src: "assets/img/gallery/dance-floor.jpg",       alt: "Packed dance floor",                                          category: "Nights" },
  { src: "assets/img/flyer-rnb-reno.jpg",            alt: "RNB RENO flyer — November 7th",                               category: "Flyers" },
  { src: "assets/img/flyer-fantasias-y2k.jpg",       alt: "Fantasías Back to the Y2K flyer",                             category: "Flyers" }
];

/* ---------- Signature drinks ---------- */
SC.drinks = [
  { name: "TE-KILL-YA",          notes: "Tequila · coconut · cranberry" },
  { name: "Spooky Sour",         notes: "Orange Jameson · passion fruit" },
  { name: "Green Reaper",        notes: "House seasonal special" },
  { name: "Zombie Brain Shooter",notes: "The shot everyone's ordering" }
];

/* ---------- Contact form ----------
   The form posts to /api/contact (a Vercel function). Set these env vars in
   Vercel → Settings → Environment Variables to receive emails:
     RESEND_API_KEY   (free at resend.com)
     CONTACT_TO       (the inbox that receives inquiries)
     CONTACT_FROM     (optional, e.g. "Social Club <bookings@yourdomain.com>")
   Until then, the form falls back to opening the visitor's email app
   (if SC.info.email is set) or Instagram DMs.
---------------------------------- */
SC.contact = { endpoint: "/api/contact" };
