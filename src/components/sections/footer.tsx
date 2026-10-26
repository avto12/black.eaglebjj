import { ArrowUp, ArrowUpRight } from "lucide-react";
import { contact, nav, site } from "@/content/site";
import { BeltBar, DemoTag, Kicker } from "@/components/ui/brand";

export function Footer() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line-soft bg-ink pt-24 sm:pt-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker index="07">{contact.kicker}</Kicker>
            <h2 id="contact-title" className="display-ka mt-8 text-[clamp(2.6rem,7vw,5.5rem)]" data-reveal>
              მოდი ტატამზე.
            </h2>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-4"
              data-reveal
            >
              <span className="display text-[clamp(2rem,5vw,3.25rem)] transition-colors group-hover:text-blood-bright">
                {site.instagram.handle}
              </span>
              <ArrowUpRight
                className="size-6 text-ash transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-bone"
                aria-hidden
              />
              <span className="sr-only">Instagram (იხსნება ახალ ფანჯარაში)</span>
            </a>
          </div>

          <dl className="lg:col-span-6 lg:col-start-7" data-stagger>
            {contact.items.map((c) => (
              <div key={c.label} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-line py-5 first:border-t sm:grid-cols-[10rem_1fr]">
                <dt className="label text-smoke">{c.label}</dt>
                <dd className="flex flex-wrap items-center justify-between gap-3">
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-bone underline-offset-4 hover:underline">
                      {c.value}
                    </a>
                  ) : (
                    <span className="text-bone/55">{c.value}</span>
                  )}
                  {c.demo && <DemoTag />}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-20 flex flex-col gap-8 border-t border-line pt-8 sm:mt-28 md:flex-row md:items-center md:justify-between">
          <nav aria-label="ქვედა ნავიგაცია">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="label text-ash transition-colors hover:text-bone">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#top" className="label group flex items-center gap-3 self-start text-bone md:self-auto">
            ზემოთ
            <span className="flex size-11 items-center justify-center border border-line transition-colors group-hover:border-blood group-hover:bg-blood">
              <ArrowUp className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden />
            </span>
          </a>
        </div>
      </div>

      {/* Monumental sign-off */}
      <div aria-hidden className="mx-auto mt-16 max-w-[1600px] overflow-hidden px-3 sm:px-6">
        <p className="display translate-y-[18%] whitespace-nowrap text-center text-[16.8vw] leading-[0.8] text-coal 2xl:text-[16.5rem]">
          BLACK EAGLE
        </p>
      </div>

      <div className="relative border-t border-line-soft bg-ink">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p className="label text-smoke">© 2026 Black Eagle BJJ · {site.country}</p>
          <p className="label flex items-center gap-3 text-smoke">
            <BeltBar className="h-[5px] w-[56px]" />
            დიზაინის დემო ვერსია
          </p>
        </div>
      </div>
    </footer>
  );
}
