"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Plus } from "lucide-react";
import { gallery, galleryFilters, type GalleryCategory, type GalleryItem } from "@/content/site";
import { Kicker, Lines } from "@/components/ui/brand";
import { Lightbox } from "@/components/sections/lightbox";
import { cn } from "@/lib/utils";

/*
 * Editorial grid instead of a uniform masonry: tiles follow composed
 * "spreads" that repeat, and the tail of any filtered list is closed off
 * cleanly (a lone image becomes a full-width panorama).
 */
const DESKTOP = {
  A: ["lg:col-span-7 lg:row-span-4", "lg:col-span-5 lg:row-span-2", "lg:col-span-5 lg:row-span-2"],
  B: ["lg:col-span-5 lg:row-span-4 lg:col-start-8", "lg:col-span-7 lg:row-span-2 lg:col-start-1", "lg:col-span-7 lg:row-span-2 lg:col-start-1"],
  C: ["lg:col-span-4 lg:row-span-3", "lg:col-span-8 lg:row-span-3"],
  solo: ["lg:col-span-12 lg:row-span-4"],
} as const;

const MOBILE = {
  full: "col-span-2 row-span-3",
  tall: "col-span-1 row-span-4",
  short: "col-span-1 row-span-2",
  half: "col-span-1 row-span-3",
} as const;

function layoutFor(count: number) {
  const desktop: string[] = [];
  const cycle = [DESKTOP.A, DESKTOP.B, DESKTOP.C];
  let i = 0;
  let c = 0;
  while (i < count) {
    const block = cycle[c % cycle.length];
    const left = count - i;
    if (left >= block.length) {
      desktop.push(...block);
      i += block.length;
    } else if (left === 1) {
      desktop.push(...DESKTOP.solo);
      i += 1;
    } else {
      desktop.push(...DESKTOP.C);
      i += 2;
    }
    c++;
  }

  const mobile: string[] = [];
  let j = 0;
  let k = 0;
  while (j < count) {
    const left = count - j;
    if (k % 2 === 0 || left === 1) {
      mobile.push(MOBILE.full);
      j += 1;
    } else if (left >= 3) {
      mobile.push(MOBILE.tall, MOBILE.short, MOBILE.short);
      j += 3;
    } else {
      mobile.push(MOBILE.half, MOBILE.half);
      j += 2;
    }
    k++;
  }

  return desktop.map((d, n) => `${mobile[n]} ${d}`);
}

const categoryLabel: Record<GalleryCategory, string> = {
  training: "ვარჯიში",
  competition: "შეჯიბრი",
  team: "გუნდი",
};

export function Gallery() {
  const [filter, setFilter] = useState<(typeof galleryFilters)[number]["id"]>("all");
  const [open, setOpen] = useState<number | null>(null);

  const items: GalleryItem[] = useMemo(
    () => (filter === "all" ? gallery.items : gallery.items.filter((g) => g.category === filter)),
    [filter],
  );
  const layout = useMemo(() => layoutFor(items.length), [items.length]);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-ink py-24 sm:py-32 lg:py-44">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Kicker index="06">{gallery.kicker}</Kicker>
            <Lines
              id="gallery-title"
              lines={gallery.title}
              className="display-ka mt-8 text-[clamp(3rem,9.5vw,8rem)]"
              lineClassName={(i) => (i === 1 ? "text-ash" : undefined)}
            />
          </div>

          <div className="lg:col-span-4 lg:justify-self-end lg:pb-3" data-reveal>
            <LayoutGroup id="gallery-filter">
              <div role="group" aria-label="გალერეის ფილტრი" className="flex flex-wrap gap-x-1 gap-y-2">
                {galleryFilters.map((f) => {
                  const selected = filter === f.id;
                  const count = f.id === "all" ? gallery.items.length : gallery.items.filter((g) => g.category === f.id).length;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setFilter(f.id)}
                      className={cn(
                        "label relative flex h-11 items-center gap-2 px-3.5 transition-colors",
                        selected ? "text-ink" : "text-ash hover:text-bone",
                      )}
                    >
                      {selected && (
                        <motion.span
                          layoutId="gallery-filter-pill"
                          className="absolute inset-0 -z-0 bg-bone"
                          transition={{ type: "spring", stiffness: 420, damping: 38 }}
                        />
                      )}
                      <span className="relative">{f.label}</span>
                      <span className={cn("relative text-[0.55rem]", selected ? "text-ink/60" : "text-smoke")}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>
        </div>

        <div data-reveal>
        <ul
          className="mt-12 grid grid-flow-row-dense grid-cols-2 gap-2 [grid-auto-rows:clamp(4.25rem,22vw,7.5rem)] sm:mt-16 sm:gap-3 lg:grid-cols-12 lg:[grid-auto-rows:clamp(5rem,8.2vw,8.5rem)] lg:gap-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item, i) => (
              <motion.li
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={cn("relative", layout[i])}
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block h-full w-full overflow-hidden bg-coal text-left"
                  aria-label={`ფოტოს გადიდება: ${item.alt}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={layout[i].includes("lg:col-span-12") ? "100vw" : "(min-width: 1024px) 55vw, 100vw"}
                    className="photo-mono object-cover transition-[transform,filter] duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 opacity-0 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:translate-y-2 sm:p-5 sm:group-hover:translate-y-0">
                    <span className="flex flex-col gap-1">
                      <span className="label text-blood-bright">{categoryLabel[item.category]}</span>
                      <span className="hidden text-sm text-bone sm:block">{item.alt}</span>
                    </span>
                    <span className="flex size-9 shrink-0 items-center justify-center border border-bone/40 text-bone">
                      <Plus className="size-4" aria-hidden />
                    </span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        </div>

        <p className="label mt-6 text-smoke" data-reveal>
          საილუსტრაციო ფოტოები · Unsplash · გუნდის ფოტოებით ჩანაცვლდება
        </p>
      </div>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} />
    </section>
  );
}
