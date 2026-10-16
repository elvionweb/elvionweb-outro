// ElvionWeb outro: everything you are likely to customize lives in this file.

export const outro = {
  // ---- Text (exact copy) ----
  brand: "ElvionWeb",
  tagline: "WEBSITE DESIGN & DEVELOPMENT",
  headline: "Need a website for your business?",
  subline: "Let's bring your vision online.",
  cta: "DM ME TODAY",

  // ---- Logo ----
  // Put your real logo at: public/elvionweb-logo.jpg  (transparent PNG or SVG works best).
  // If the file is missing, a clearly marked placeholder is shown instead.
  logoSrc: "/elvionweb-logo.jpg",
  logoSize: 340, // px, on the 1080 x 1920 canvas

  // ---- Colors ----
  // Defaults match your logo (electric cyan on near-black).
  // Gold preset: accent "#D4AF37", glow "#F2D675".
  colors: {
    background: "#1A1A1A",
    accent: "#00BFFF",
    text: "#F4F7FA",
    muted: "#9AA7B2",
  },

  // ---- Fonts (system stacks, no downloads needed) ----
  fonts: {
    display: "'Playfair Display', 'Times New Roman', Georgia, serif",
    body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  },

  // ---- Timing, in seconds. Whole sequence ends at `total`. ----
  timing: {
    logo: 0.2,      // logo fades in
    name: 0.8,      // "ElvionWeb"
    tagline: 1.2,   // WEBSITE DESIGN & DEVELOPMENT
    rule: 1.5,      // thin accent line
    headline: 1.8,  // first word; others follow with `wordStagger`
    wordStagger: 0.12,
    subline: 2.6,
    cta: 3.0,
    glow: 3.6,      // two gentle glow pulses, finishing at `total`
    total: 5.0,
  },

  // Safe zones (px on the 1080 x 1920 canvas) so app UI doesn't cover content.
  safe: { top: 240, bottom: 420, side: 120 },
};
