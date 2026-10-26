import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { join, photos, site } from "@/content/site";
import { BeltBar, Lines } from "@/components/ui/brand";
import { Button } from "@/components/ui/button";

export function Join() {
  return (
    <section aria-labelledby="join-title" className="relative isolate overflow-hidden bg-ink">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 -top-[10%] h-[120%]" data-parallax="0.08" data-parallax-start="top bottom">
          <Image
            src={photos.cta.src}
            alt=""
            fill
            sizes="100vw"
            className="photo-mono object-cover"
            style={{ objectPosition: photos.cta.focus }}
          />
        </div>
        <div className="absolute inset-0 bg-ink/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
        {/* the red belt-bar band, cut across the image */}
        <div className="absolute inset-y-0 left-[6%] hidden w-[3px] bg-blood sm:block" />
        <div className="grain" />
      </div>

      <div className="mx-auto flex min-h-[92svh] max-w-[1600px] flex-col justify-center px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
        <p className="label flex items-center gap-3 text-bone/80 sm:pl-[calc(6%+1.5rem)]" data-reveal>
          <BeltBar />
          შემოგვიერთდი
        </p>

        <Lines
          id="join-title"
          lines={join.title}
          className="display-ka mt-8 text-[clamp(3rem,11.5vw,10.5rem)]"
          lineClassName={(i) => (i === 1 ? "display !leading-[0.95] text-blood-bright" : undefined)}
        />

        <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[30rem] text-[1.05rem] leading-[1.7] text-bone/80 lg:col-span-5 lg:col-start-1" data-reveal>
            {join.body}
          </p>
          <div className="lg:col-span-5 lg:col-start-8 lg:justify-self-end" data-reveal>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                {join.cta}
                <ArrowUpRight
                  className="size-4 transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </Button>
            <p className="label mt-4 text-ash">{site.instagram.handle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
