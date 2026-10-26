"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * One place for every scroll-driven animation. Sections stay server
 * components and opt in with data attributes:
 *
 *  data-reveal            fade + rise
 *  data-reveal-lines      children `.line > span` slide up from a mask
 *  data-reveal-image      clip-path wipe; inner <img> settles from scale 1.12
 *  data-parallax="0.12"   very small vertical drift (hero / CTA photos only)
 *  data-stagger           reveal direct children in sequence
 */
export function ScrollAnimations() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const start = "top 86%";

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start, once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.fromTo(
          group.children,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: { trigger: group, start, once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-lines]").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(".line > span"),
          { yPercent: 108 },
          {
            yPercent: 0,
            duration: 1.25,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-image]").forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        tl.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
        );
        if (img) tl.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.15);
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax || 0.1);
        gsap.fromTo(
          el,
          { yPercent: 0 },
          {
            yPercent: amount * 100,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: el.dataset.parallaxStart ?? "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // fonts & lazy images change layout; keep trigger positions honest
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh);
      return () => window.removeEventListener("load", refresh);
    });

    // Reduced motion: make sure nothing stays hidden.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      document.documentElement.classList.remove("anim");
    });

    return () => mm.revert();
  }, []);

  return null;
}
