import { cn } from "@/lib/utils";

/**
 * Black-belt rank bar: the red block on a black belt, with white degree
 * stripes. Used as the site's recurring BJJ-native mark.
 */
export function BeltBar({
  stripes = 4,
  className,
}: {
  stripes?: number;
  className?: string;
}) {
  return (
    <span aria-hidden className={cn("inline-flex h-[7px] w-[88px] items-stretch", className)}>
      <span className="flex-1 border-y border-l border-line bg-ink" />
      <span className="flex w-[46%] items-stretch justify-evenly bg-blood px-[3px]">
        {Array.from({ length: stripes }).map((_, i) => (
          <span key={i} className="w-[2px] bg-bone" />
        ))}
      </span>
      <span className="w-[10%] border-y border-r border-line bg-ink" />
    </span>
  );
}

/** Marks content that is a design placeholder awaiting client confirmation. */
export function DemoTag({ className, children = "დემო" }: { className?: string; children?: React.ReactNode }) {
  return (
    <span
      className={cn(
        "label inline-flex items-center gap-1.5 border border-dashed border-ash/50 px-1.5 py-[3px] text-[0.6rem] text-ash",
        className,
      )}
      title="საილუსტრაციო შიგთავსი — შეიცვლება გუნდის მიერ მოწოდებული ინფორმაციით"
    >
      <span className="size-1 rounded-full bg-blood-bright" />
      {children}
    </span>
  );
}

/** "02 — ჩვენ შესახებ" section kicker */
export function Kicker({ index, children, className }: { index: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("label flex items-center gap-3 text-ash", className)} data-reveal>
      <span className="text-blood-bright">{index}</span>
      <span className="h-px w-8 bg-line" />
      <span>{children}</span>
    </p>
  );
}

/** Masked line-by-line heading */
export function Lines({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  id,
}: {
  id?: string;
  lines: readonly string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: (i: number) => string | undefined;
}) {
  return (
    <Tag id={id} className={className} data-reveal-lines>
      {lines.map((l, i) => (
        <span key={i} className="line">
          <span className={lineClassName?.(i)}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex flex-col gap-[5px] leading-none", className)}>
      <span className="display text-[1.35rem] tracking-[0.01em]">BLACK EAGLE</span>
      <span className="flex items-center gap-2">
        <BeltBar className="h-[5px] w-[58px]" />
        <span className="font-mono text-[0.6rem] tracking-[0.3em] text-ash">BJJ</span>
      </span>
    </span>
  );
}
