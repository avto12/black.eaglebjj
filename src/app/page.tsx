import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { ScrollAnimations } from "@/components/providers/scroll-animations";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Training } from "@/components/sections/training";
import { Coaches } from "@/components/sections/coaches";
import { Achievements } from "@/components/sections/achievements";
import { Gallery } from "@/components/sections/gallery";
import { Join } from "@/components/sections/join";
import { Footer } from "@/components/sections/footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "Black Eagle BJJ",
  sport: "Brazilian Jiu-Jitsu",
  address: { "@type": "PostalAddress", addressCountry: "GE" },
  sameAs: ["https://www.instagram.com/black.eaglebjj/"],
};

export default function Home() {
  return (
    <SmoothScrollProvider>
      <a
        href="#about"
        className="label sr-only z-[80] bg-bone px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        გადასვლა შიგთავსზე
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Training />
        <Coaches />
        <Achievements />
        <Gallery />
        <Join />
      </main>
      <Footer />
      <ScrollAnimations />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </SmoothScrollProvider>
  );
}
