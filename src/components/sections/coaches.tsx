import Image from "next/image";
import { coaches, photos } from "@/content/site";
import { DemoTag, Kicker, Lines } from "@/components/ui/brand";

function PortraitPlaceholder({ n }: { n: number }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-coal">
      {/* fine diagonal hatching marks this as an empty slot, not a photo */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--color-bone) 0 1px, transparent 1px 11px)",
        }}
      />
      <span aria-hidden className="display outline-text relative text-[4.5rem] sm:text-[5.5rem]">
        0{n}
      </span>
      <span className="label absolute bottom-3 left-3 text-ash">ფოტო მალე</span>
    </div>
  );
}

export function Coaches() {
  return (
    <section id="coaches" aria-labelledby="coaches-title" className="relative bg-ink py-24 sm:py-32 lg:py-44">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-10">
          {/* Team photograph, sticky on desktop */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <Kicker index="04">{coaches.kicker}</Kicker>
              <Lines
                id="coaches-title"
                lines={coaches.title}
                className="display-ka mt-8 text-[clamp(3rem,9vw,6.5rem)]"
                lineClassName={(i) => (i === 1 ? "text-ash" : undefined)}
              />
              <figure className="mt-12">
                <div className="relative aspect-[16/11] overflow-hidden bg-coal" data-reveal-image>
                  <Image
                    src={photos.team.src}
                    alt={photos.team.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="photo-mono object-cover"
                    style={{ objectPosition: photos.team.focus }}
                  />
                </div>
                <figcaption className="label mt-4 flex items-center justify-between gap-4 text-smoke">
                  <span>საილუსტრაციო ფოტო · გუნდის ფოტო დაემატება</span>
                  <span>Fig. 02</span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Profiles */}
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-48">
            <div className="flex items-start justify-between gap-6 border-b border-line pb-6" data-reveal>
              <p className="max-w-[24rem] text-[0.95rem] leading-[1.7] text-ash">{coaches.intro}</p>
              <DemoTag className="shrink-0">ნიმუში</DemoTag>
            </div>

            <ol data-stagger>
              {coaches.list.map((c, i) => (
                <li key={i} className="group grid grid-cols-[6.5rem_1fr] gap-5 border-b border-line py-8 sm:grid-cols-[9rem_1fr] sm:gap-8 sm:py-10">
                  <div className="aspect-[4/5]">
                    {c.photo ? (
                      <div className="relative h-full w-full overflow-hidden">
                        <Image src={c.photo.src} alt={c.photo.alt} fill sizes="9rem" className="photo-mono object-cover" />
                      </div>
                    ) : (
                      <PortraitPlaceholder n={i + 1} />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="label text-blood-bright">0{i + 1}</span>
                      {c.demo && <DemoTag />}
                    </div>
                    <h3 className="display-ka mt-3 text-[clamp(1.5rem,4.5vw,2.25rem)] text-bone/60">
                      [{c.name}]
                    </h3>
                    <p className="label mt-3 normal-case tracking-[0.06em] text-ash">{c.role}</p>
                    <p className="mt-4 hidden text-[0.95rem] leading-[1.7] text-smoke sm:block">{c.bio}</p>
                  </div>
                  <p className="col-span-2 text-[0.92rem] leading-[1.7] text-smoke sm:hidden">{c.bio}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
