"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { training, type Program } from "@/content/site";
import { DemoTag, Kicker, Lines } from "@/components/ui/brand";
import { cn } from "@/lib/utils";

export function Training() {
  return (
    <section id="training" aria-labelledby="training-title" className="relative border-t border-line-soft bg-ink-2 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker index="03">{training.kicker}</Kicker>
            <Lines
              id="training-title"
              lines={training.title}
              className="display-ka mt-8 text-[clamp(3rem,10vw,7.5rem)]"
              lineClassName={(i) => (i === 1 ? "text-ash" : undefined)}
            />
          </div>
          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:col-start-9 lg:pb-4" data-reveal>
            {training.demo && <DemoTag>საილუსტრაციო პროგრამები</DemoTag>}
            <p className="max-w-[26rem] leading-[1.7] text-ash">{training.note}</p>
          </div>
        </div>
      </div>

      <div className="mt-14 sm:mt-20">
        <ProgramAccordion programs={training.programs} />
        <ProgramCarousel programs={training.programs} />
      </div>
    </section>
  );
}

/* ── Desktop: expanding image panels ─────────────────────────────────── */

function ProgramAccordion({ programs }: { programs: Program[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto hidden max-w-[1600px] px-12 lg:block" data-reveal>
      <ul className="flex h-[min(78vh,720px)] min-h-[560px] gap-2">
        {programs.map((p, i) => {
          const isActive = i === active;
          return (
            <li
              key={p.index}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "relative overflow-hidden bg-coal transition-[flex-grow] duration-[900ms] ease-[var(--ease-out-expo)]",
                isActive ? "grow-[3.4]" : "grow",
              )}
              style={{ flexBasis: 0 }}
            >
              <Image
                src={p.photo.src}
                alt={p.photo.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 1px"
                className={cn(
                  "photo-mono object-cover transition-[transform,opacity] duration-[1200ms] ease-[var(--ease-out-expo)]",
                  isActive ? "scale-100 opacity-100" : "scale-110 opacity-45",
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

              <button
                type="button"
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={isActive}
                aria-controls={`program-${p.index}`}
                className="absolute inset-0 z-10 cursor-pointer text-left outline-offset-[-4px]"
              >
                <span className="sr-only">{p.title}</span>
              </button>

              {/* collapsed label */}
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-x-0 top-0 flex h-full flex-col justify-between p-6 transition-opacity duration-500",
                  isActive ? "opacity-0" : "opacity-100 delay-200",
                )}
              >
                <span className="label text-blood-bright">{p.index}</span>
                <span className="display rotate-180 self-start whitespace-nowrap text-[2.5rem] text-bone/90 [writing-mode:vertical-rl]">
                  {p.latin}
                </span>
              </div>

              {/* expanded content */}
              <div
                id={`program-${p.index}`}
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-0 grid grid-cols-[1fr_auto] items-end gap-8 p-8 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] xl:p-10",
                  isActive ? "translate-y-0 opacity-100 delay-300" : "translate-y-6 opacity-0",
                )}
              >
                <div className="max-w-[36rem]">
                  <p className="label flex items-center gap-3 text-ash">
                    <span className="text-blood-bright">{p.index}</span>
                    <span className="h-px w-6 bg-line" />
                    {p.latin}
                  </p>
                  <h3 className="display-ka mt-5 text-[clamp(2.25rem,3.6vw,3.75rem)]">{p.title}</h3>
                  <p className="mt-5 max-w-[30rem] leading-[1.7] text-bone/75">{p.description}</p>
                </div>
                <dl className="hidden border-l border-bone/20 pl-5 xl:block">
                  <dt className="label text-smoke">ვისთვის</dt>
                  <dd className="mt-2 max-w-[12rem] text-sm leading-snug text-bone">{p.audience}</dd>
                </dl>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── Mobile / tablet: swipeable editorial slides ─────────────────────── */

function ProgramCarousel({ programs }: { programs: Program[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [index, setIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const sync = useCallback(() => {
    if (!embla) return;
    setIndex(embla.selectedScrollSnap());
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", sync).on("reInit", sync);
    return () => {
      embla.off("select", sync).off("reInit", sync);
    };
  }, [embla, sync]);

  return (
    <div className="lg:hidden" data-reveal>
      <div className="overflow-hidden px-5 sm:px-8" ref={emblaRef} aria-roledescription="carousel" aria-label="სავარჯიშო პროგრამები">
        <ul className="-ml-3 flex touch-pan-y">
          {programs.map((p, i) => (
            <li
              key={p.index}
              className="min-w-0 shrink-0 grow-0 basis-[86%] pl-3 sm:basis-[60%]"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${programs.length}`}
            >
              <article className="relative flex aspect-[4/5.4] flex-col justify-end overflow-hidden bg-coal">
                <Image
                  src={p.photo.src}
                  alt={p.photo.alt}
                  fill
                  sizes="(min-width: 640px) 60vw, 86vw"
                  className="photo-mono object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
                <div className="relative p-5 sm:p-7">
                  <p className="label flex items-center gap-3 text-ash">
                    <span className="text-blood-bright">{p.index}</span>
                    <span className="h-px w-6 bg-line" />
                    {p.latin}
                  </p>
                  <h3 className="display-ka mt-4 text-[clamp(2rem,9vw,3rem)]">{p.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-[1.6] text-bone/75">{p.description}</p>
                  <p className="mt-5 border-t border-bone/15 pt-4 text-sm text-bone">
                    <span className="label mr-3 text-smoke">ვისთვის</span>
                    {p.audience}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between px-5 sm:px-8">
        <p className="label text-ash" aria-live="polite">
          <span className="text-bone">0{index + 1}</span> / 0{programs.length}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => embla?.scrollPrev()}
            disabled={!canPrev}
            aria-label="წინა პროგრამა"
            className="flex size-12 items-center justify-center border border-line text-bone transition-colors hover:border-bone disabled:opacity-30"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => embla?.scrollNext()}
            disabled={!canNext}
            aria-label="შემდეგი პროგრამა"
            className="flex size-12 items-center justify-center border border-line text-bone transition-colors hover:border-bone disabled:opacity-30"
          >
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
