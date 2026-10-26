"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

type ScrollApi = {
  scrollTo: (target: string | number) => void;
  lock: () => void;
  unlock: () => void;
};

const ScrollContext = createContext<ScrollApi>({
  scrollTo: () => {},
  lock: () => {},
  unlock: () => {},
});

export const useSmoothScroll = () => useContext(ScrollContext);

const HEADER_OFFSET = -64;

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const scrollTo = useCallback((target: string | number) => {
    const lenis = lenisRef.current;
    if (typeof target === "string") {
      const id = target.replace(/^#/, "");
      const el = id === "top" ? null : document.getElementById(id);
      if (id !== "top" && !el) return;
      if (lenis) {
        lenis.scrollTo(el ?? 0, { offset: el ? HEADER_OFFSET : 0, duration: 1.4, force: true });
      } else {
        const y = el ? el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET : 0;
        window.scrollTo({ top: y, behavior: "auto" });
      }
      return;
    }
    if (lenis) lenis.scrollTo(target, { duration: 1.4, force: true });
    else window.scrollTo({ top: target, behavior: "auto" });
  }, []);

  const lock = useCallback(() => lenisRef.current?.stop(), []);
  const unlock = useCallback(() => lenisRef.current?.start(), []);

  // Route every in-page anchor (<a href="#…">) through the smooth scroller.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      e.preventDefault();
      scrollTo(hash);
      history.replaceState(null, "", hash === "#top" ? window.location.pathname : hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  return (
    <ScrollContext.Provider value={{ scrollTo, lock, unlock }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ScrollContext.Provider>
  );
}
