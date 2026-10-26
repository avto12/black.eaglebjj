import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { achievements } from "@/content/site";
import { BeltBar, DemoTag, Kicker, Lines } from "@/components/ui/brand";

export function Achievements() {
  const [main, side] = achievements.photos;
  const isDemo = achievements.results.every((r) => r.demo);

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-title"
      className="relative overflow-hidden border-t border-line-soft bg-ink-2 py-24 sm:py-32 lg:py-44"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <Kicker index="05">{achievements.kicker}</Kicker>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Lines
            id="achievements-title"
            lines={achievements.title}
            className="display-ka text-[clamp(3rem,11vw,9rem)] lg:col-span-8"
            lineClassName={(i) => (i === 0 ? "text-ash" : undefined)}
          />
          <p className="max-w-[24rem] leading-[1.7] text-ash lg:col-span-4 lg:pb-4" data-reveal>
            {achievements.intro}
          </p>
        </div>

        {/* Tournament photography */}
        <div className="mt-16 grid gap-4 sm:mt-24 sm:grid-cols-12 sm:gap-6">
          <figure className="sm:col-span-8">
            <div className="relative aspect-[3/2] overflow-hidden bg-coal" data-reveal-image>
              <Image src={main.src} alt={main.alt} fill sizes="(min-width: 640px) 66vw, 100vw" className="photo-mono object-cover" />
            </div>
          </figure>
          <figure className="sm:col-span-4 sm:mt-32">
            <div className="relative aspect-[4/5] overflow-hidden bg-coal" data-reveal-image>
              <Image src={side.src} alt={side.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="photo-mono object-cover" />
            </div>
            <figcaption className="label mt-4 text-smoke">შეჯიბრი · საილუსტრაციო ფოტო</figcaption>
          </figure>
        </div>

        {/* Results ledger */}
        <div className="mt-20 sm:mt-28">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bone/30 pb-5" data-reveal>
            <h3 className="display-ka text-[clamp(1.6rem,4vw,2.5rem)]">შედეგების ჟურნალი</h3>
            {isDemo && <DemoTag>ივსება დადასტურების შემდეგ</DemoTag>}
          </div>

          <table className="w-full border-collapse text-left">
            <caption className="sr-only">ტურნირების შედეგები — დემო მდგომარეობა</caption>
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-line">
                {["წელი", "ტურნირი", "კატეგორია", "შედეგი"].map((h) => (
                  <th key={h} scope="col" className="label py-4 pr-6 font-normal text-smoke">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody data-stagger>
              {achievements.results.map((r, i) => (
                <tr
                  key={i}
                  className="grid grid-cols-[4rem_1fr] gap-x-4 gap-y-1 border-b border-line py-6 md:table-row md:py-0"
                >
                  <td className="display row-span-3 text-[1.75rem] text-smoke md:w-[12%] md:py-7 md:pr-6 md:text-[2rem]">{r.year}</td>
                  <td className="text-[1.05rem] text-bone/55 md:w-[38%] md:py-7 md:pr-6 md:text-[1.15rem]">
                    {r.link ? (
                      <a href={r.link} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                        {r.event}
                      </a>
                    ) : (
                      r.event
                    )}
                  </td>
                  <td className="text-sm text-smoke md:w-[32%] md:py-7 md:pr-6">{r.division}</td>
                  <td className="md:py-7">
                    <span className="inline-flex items-center gap-3">
                      <span className="display text-[1.5rem] text-smoke">{r.placing}</span>
                      {r.demo && <span className="label text-[0.6rem] text-smoke">დასადასტურებელი</span>}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Public profiles */}
          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4" data-reveal>
              <BeltBar />
              <p className="mt-5 max-w-[22rem] text-[0.95rem] leading-[1.7] text-ash">
                შედეგები დაუკავშირდება საჯარო პროფილებს, სადაც ყველა მედალი და ორთაბრძოლა გადამოწმებადია.
              </p>
            </div>
            <ul className="lg:col-span-7 lg:col-start-6" data-stagger>
              {achievements.profiles.map((p) => (
                <li key={p.label} className="border-b border-line first:border-t">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-6 py-5 transition-colors"
                  >
                    <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                      <span className="display text-[2rem] transition-colors group-hover:text-blood-bright sm:text-[2.5rem]">{p.label}</span>
                      <span className="text-sm text-smoke">{p.note}</span>
                    </span>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-ash transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-bone"
                      aria-hidden
                    />
                    <span className="sr-only">(იხსნება ახალ ფანჯარაში)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
