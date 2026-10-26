"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/content/site";
import { BeltBar, Wordmark } from "@/components/ui/brand";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("top");
  const { lock, unlock, scrollTo } = useSmoothScroll();

  // solid background after leaving the top; tuck away while scrolling down fast
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 640 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section indicator
  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (open) lock();
    else unlock();
  }, [open, lock, unlock]);

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden && !open ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500",
        scrolled ? "border-line-soft bg-ink" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:h-[72px] lg:px-12">
        <a href="#top" aria-label="Black Eagle BJJ — მთავარი" className="relative z-10">
          <Wordmark />
        </a>

        <nav aria-label="მთავარი ნავიგაცია" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {nav.slice(1).map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "group label relative flex items-baseline gap-1.5 py-2 transition-colors",
                    active === item.id ? "text-bone" : "text-ash hover:text-bone",
                  )}
                >
                  <span className="text-[0.55rem] text-smoke">0{i + 2}</span>
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-px h-px origin-left bg-blood-bright transition-transform duration-500 ease-[var(--ease-out-expo)]",
                      active === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="md" variant="outline" className="hidden h-11 sm:inline-flex">
            <a href="#contact">დაგვიკავშირდი</a>
          </Button>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="relative z-10 flex size-11 items-center justify-center xl:hidden"
                aria-label="მენიუს გახსნა"
              >
                <span className="flex w-6 flex-col items-end gap-[7px]">
                  <span className="h-[1.5px] w-6 bg-bone" />
                  <span className="h-[1.5px] w-4 bg-bone" />
                </span>
              </button>
            </Dialog.Trigger>
            <AnimatePresence>
              {open && (
                <Dialog.Portal forceMount>
                  <Dialog.Content forceMount asChild aria-describedby={undefined}>
                    <motion.div
                      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink"
                      data-lenis-prevent
                      initial={{ clipPath: "inset(0 0 100% 0)" }}
                      animate={{ clipPath: "inset(0 0 0% 0)" }}
                      exit={{ clipPath: "inset(0 0 100% 0)" }}
                      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <Dialog.Title className="sr-only">ნავიგაცია</Dialog.Title>
                      <div className="flex h-16 shrink-0 items-center justify-between px-5 sm:px-8">
                        <Wordmark />
                        <Dialog.Close asChild>
                          <button
                            type="button"
                            className="flex size-11 items-center justify-center"
                            aria-label="მენიუს დახურვა"
                          >
                            <span className="relative block size-6">
                              <span className="absolute left-0 top-1/2 h-[1.5px] w-6 rotate-45 bg-bone" />
                              <span className="absolute left-0 top-1/2 h-[1.5px] w-6 -rotate-45 bg-bone" />
                            </span>
                          </button>
                        </Dialog.Close>
                      </div>

                      <nav aria-label="მობილური ნავიგაცია" className="flex flex-1 flex-col justify-center px-5 py-8 sm:px-8">
                        <ul className="border-t border-line-soft">
                          {nav.map((item, i) => (
                            <motion.li
                              key={item.id}
                              className="border-b border-line-soft"
                              initial={{ opacity: 0, y: 24 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.25 + i * 0.05, duration: 0.7, ease }}
                            >
                              <a
                                href={`#${item.id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setOpen(false);
                                  // let the panel retract before travelling
                                  window.setTimeout(() => {
                                    unlock();
                                    scrollTo(item.id);
                                  }, 420);
                                }}
                                className="group flex items-baseline justify-between gap-4 py-3.5"
                              >
                                <span className="display-ka text-[clamp(1.75rem,8vw,3rem)] transition-colors group-hover:text-blood-bright">
                                  {item.label}
                                </span>
                                <span className="label text-smoke">0{i + 1}</span>
                              </a>
                            </motion.li>
                          ))}
                        </ul>
                      </nav>

                      <motion.div
                        className="flex items-center justify-between gap-4 border-t border-line-soft px-5 py-6 sm:px-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                      >
                        <BeltBar />
                        <a
                          href={site.instagram.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label flex items-center gap-2 text-bone"
                        >
                          {site.instagram.handle}
                          <ArrowUpRight className="size-4" aria-hidden />
                        </a>
                      </motion.div>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </div>
    </motion.header>
  );
}
