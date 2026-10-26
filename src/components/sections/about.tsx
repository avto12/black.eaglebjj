import Image from "next/image";
import { about, photos } from "@/content/site";
import { Kicker, Lines } from "@/components/ui/brand";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-ink py-24 sm:py-32 lg:py-44">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
          {/* Left column: statement */}
          <div className="lg:col-span-6 xl:col-span-5">
            <Kicker index="02">{about.kicker}</Kicker>
            <Lines
              id="about-title"
              lines={about.title}
              className="display-ka mt-8 text-[clamp(3rem,10vw,7.5rem)]"
              lineClassName={(i) => (i === 1 ? "text-ash" : undefined)}
            />
            <p className="mt-10 max-w-[30rem] text-[1.15rem] leading-[1.65] text-bone sm:text-[1.3rem]" data-reveal>
              {about.lead}
            </p>
            <p className="mt-6 max-w-[30rem] leading-[1.75] text-ash" data-reveal>
              {about.body}
            </p>
          </div>

          {/* Right column: photograph, deliberately offset */}
          <figure className="relative lg:col-span-6 lg:col-start-7 xl:col-span-6 xl:col-start-7 lg:mt-40">
            <div className="relative aspect-[4/5] overflow-hidden bg-coal sm:aspect-[5/6]" data-reveal-image>
              <Image
                src={photos.about.src}
                alt={photos.about.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="photo-mono object-cover"
                style={{ objectPosition: photos.about.focus }}
              />
            </div>
            <figcaption className="label mt-4 flex items-center justify-between text-smoke">
              <span>ვარჯიში · ტატამი</span>
              <span>Fig. 01</span>
            </figcaption>
            {/* oversized outline numeral anchors the asymmetry */}
            <span
              aria-hidden
              className="display outline-text pointer-events-none absolute -left-4 -top-16 text-[9rem] leading-none sm:-left-10 sm:-top-24 sm:text-[13rem] lg:-left-24"
            >
              BE
            </span>
          </figure>
        </div>

        {/* Values — a typographic index, not cards */}
        <div className="mt-24 sm:mt-32 lg:mt-40">
          <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
            <h3 className="label text-ash">ჩვენი ფასეულობები</h3>
            <span className="label text-smoke">04</span>
          </div>
          <ol data-stagger>
            {about.values.map((v, i) => (
              <li
                key={v.word}
                className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-3 border-b border-line py-7 sm:grid-cols-[4rem_1fr] md:grid-cols-12 md:gap-x-10 md:py-9"
              >
                <span className="label text-blood-bright md:col-span-1">0{i + 1}</span>
                <p className="display-ka relative text-[clamp(2.1rem,7vw,4.75rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] md:col-span-6 md:group-hover:translate-x-3">
                  {v.word}
                  <span className="label ml-4 align-middle text-smoke">{v.latin}</span>
                </p>
                <p className="col-start-2 max-w-[28rem] leading-[1.7] text-ash md:col-span-5 md:col-start-auto md:justify-self-end">
                  {v.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
