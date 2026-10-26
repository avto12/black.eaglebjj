import type { Metadata, Viewport } from "next";
import { archivo, georgian, jetbrains } from "./fonts";
import "./globals.css";

const title = "Black Eagle BJJ — ბრაზილიური ჯიუ-ჯიტსუ საქართველოში";
const description =
  "Black Eagle BJJ — ბრაზილიური ჯიუ-ჯიტსუს გუნდი საქართველოში. დისციპლინა, პატივისცემა, ტექნიკა და ერთობა. Gi, No-Gi, ბავშვთა და საშეჯიბრო ვარჯიშები.";

export const metadata: Metadata = {
  metadataBase: new URL("https://black-eagle-bjj.example"),
  title,
  description,
  applicationName: "Black Eagle BJJ",
  keywords: ["ჯიუ-ჯიტსუ", "BJJ", "Brazilian Jiu-Jitsu", "გრეპლინგი", "No-Gi", "საქართველო", "Black Eagle BJJ"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ka_GE",
    url: "/",
    siteName: "Black Eagle BJJ",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: false, follow: false }, // design demo — not for indexing yet
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

// Runs before first paint: enables the pre-hidden reveal states only when
// motion is allowed and JS is running.
const animFlag = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('anim')}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ka"
      className={`${archivo.variable} ${georgian.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: animFlag }} />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
