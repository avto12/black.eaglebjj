"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { hero, photos } from "@/content/site";
import { Button } from "@/components/ui/button";
import { BeltBar } from "@/components/ui/brand";

const ease = [0.16, 1, 0.3, 1] as const;

function Rise({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <span className={`line ${className ?? ""}`}>
      <motion.span
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.3, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      {/* Photograph */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[112%]" data-parallax="0.1">
          <motion.div
            className="relative h-full w-full"
            initial={{ scale: 1.14, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.4, ease }}
          >
            <Image
              src={photos.hero.src}
              alt={photos.hero.alt}
              fill
              preload
              sizes="100vw"
              quality={70}
              className="photo-mono object-cover"
              style={{ objectPosition: photos.hero.focus }}
            />
          </motion.div>
        </div>
        {/* tonal grading — keeps type legible without a coloured gradient */}
        <div className="absolute inset-0 bg-ink/35" />
        <div className="absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-ink via-ink/80 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-ink/70 to-transparent" />
        <div className="grain" />
      </div>

      {/* Top meta row (sits under the fixed header) */}
      <div className="mx-auto mt-24 flex w-full max-w-[1600px] items-start justify-between px-5 sm:px-8 lg:mt-32 lg:px-12">
        <motion.p
          className="label flex items-center gap-3 text-bone/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <span className="h-px w-8 bg-blood-bright" />
          {hero.eyebrow}
        </motion.p>
        <motion.p
          className="label hidden text-right text-ash md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          Built through
          <br />
          discipline
        </motion.p>
      </div>

      {/* Bottom composition */}
      <div className="mx-auto mt-auto w-full max-w-[1600px] px-5 pb-8 sm:px-8 lg:px-12 lg:pb-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h1 id="hero-title" className="lg:col-span-7">
            <span className="sr-only">Black Eagle BJJ — </span>
            <span className="display-ka block text-[clamp(2.9rem,12.5vw,5.5rem)] lg:text-[clamp(4rem,6.6vw,7.5rem)]">
              <Rise delay={0.35}>{hero.headline[0]}</Rise>
              <Rise delay={0.45} className="text-bone/90">
                <span className="text-blood-bright">—</span> {hero.headline[1]}
              </Rise>
            </span>
          </h1>

          <motion.div
            className="flex flex-col gap-7 lg:col-span-5 lg:pb-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 1.1, ease }}
          >
            <p className="max-w-[34rem] text-[0.98rem] leading-relaxed text-bone/80 sm:text-[1.05rem]">{hero.body}</p>
            <div className="flex flex-col gap-3 xs:flex-row">
              <Button asChild size="lg">
                <a href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                  <ArrowDown className="size-4 transition-transform duration-500 group-hover/btn:translate-y-0.5" aria-hidden />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Oversized brand line */}
        <div className="relative mt-10 border-t border-bone/15 pt-5 sm:mt-14 lg:pt-6" aria-hidden>
          <p className="display flex flex-wrap items-end justify-between gap-x-[0.18em] text-[clamp(4.6rem,31vw,9rem)] leading-[0.8] sm:flex-nowrap sm:text-[15.2vw] 2xl:text-[14.6rem]">
            <Rise delay={0.15}>BLACK</Rise>
            <Rise delay={0.22}>EAGLE</Rise>
            <motion.span
              className="hidden pb-[0.07em] sm:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <span className="flex flex-col items-end gap-3 font-mono text-[0.75rem] leading-none tracking-[0.3em] text-bone">
                <BeltBar />
                BJJ
              </span>
            </motion.span>
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <a href="#about" className="label group flex items-center gap-3 text-ash hover:text-bone">
            <span className="relative block h-9 w-px overflow-hidden bg-bone/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_var(--ease-in-out-quart)_infinite] bg-bone" />
            </span>
            გადაახვიე
          </a>
          <p className="label text-smoke sm:hidden">BJJ · საქართველო</p>
        </div>
      </div>
    </section>
  );
}
