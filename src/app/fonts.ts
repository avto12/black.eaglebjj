import localFont from "next/font/local";

// Self-hosted variable fonts (no runtime calls to Google).
// Archivo — Latin display/body, width axis used for the condensed headline cut.
export const archivo = localFont({
  src: "../../node_modules/@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

// Noto Sans Georgian — Mkhedruli + Mtavruli, with width axis for display sizes.
export const georgian = localFont({
  src: "../../node_modules/@fontsource-variable/noto-sans-georgian/files/noto-sans-georgian-georgian-standard-normal.woff2",
  variable: "--font-georgian",
  weight: "100 900",
  display: "swap",
  declarations: [
    { prop: "font-stretch", value: "62.5% 100%" },
    { prop: "unicode-range", value: "U+0589, U+10A0-10FF, U+1C90-1CBA, U+1CBD-1CBF, U+205A, U+2D00-2D2F, U+2E31" },
  ],
});

export const jetbrains = localFont({
  src: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
  preload: false,
});
