"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { GalleryItem } from "@/content/site";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";

type Props = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
};

export function Lightbox({ items, index, onClose }: Props) {
  const open = index !== null;
  const { lock, unlock } = useSmoothScroll();

  useEffect(() => {
    if (open) lock();
    else unlock();
  }, [open, lock, unlock]);

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <motion.div
                className="fixed inset-0 z-[70] bg-ink/95"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </Dialog.Overlay>
            <Dialog.Content forceMount asChild aria-describedby={undefined}>
              <motion.div
                className="fixed inset-0 z-[71] flex flex-col focus:outline-none"
                data-lenis-prevent
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Dialog.Title className="sr-only">ფოტო გალერეა</Dialog.Title>
                <Slides items={items} start={index ?? 0} />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function Slides({ items, start }: { items: GalleryItem[]; start: number }) {
  const [emblaRef, embla] = useEmblaCarousel({ startIndex: start, loop: items.length > 1, duration: 28 });
  const [current, setCurrent] = useState(start);

  const onSelect = useCallback(() => embla && setCurrent(embla.selectedScrollSnap()), [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, onSelect]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") embla?.scrollNext();
      if (e.key === "ArrowLeft") embla?.scrollPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [embla]);

  const item = items[current];

  return (
    <>
      <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:h-20 sm:px-8">
        <p className="label text-ash" aria-live="polite">
          <span className="text-bone">{String(current + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
        </p>
        <Dialog.Close asChild>
          <button
            type="button"
            className="flex size-12 items-center justify-center border border-line text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
            aria-label="დახურვა"
          >
            <X className="size-5" aria-hidden />
          </button>
        </Dialog.Close>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {items.map((it, i) => (
            <div key={it.src} className="relative h-full min-w-0 shrink-0 grow-0 basis-full px-4 sm:px-20" aria-hidden={i !== current}>
              <div className="relative h-full w-full">
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  sizes="100vw"
                  quality={80}
                  className="object-contain"
                  loading={Math.abs(i - current) <= 1 ? "eager" : "lazy"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-6 px-4 py-5 sm:px-8 sm:py-6">
        <p className="min-w-0 truncate text-sm text-ash">{item?.alt}</p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => embla?.scrollPrev()}
            className="flex size-12 items-center justify-center border border-line text-bone transition-colors hover:border-bone"
            aria-label="წინა ფოტო"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => embla?.scrollNext()}
            className="flex size-12 items-center justify-center border border-line text-bone transition-colors hover:border-bone"
            aria-label="შემდეგი ფოტო"
          >
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </>
  );
}
