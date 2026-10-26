import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// shadcn/ui-style button, re-cut for the brand: square corners, mono labels,
// a red fill that wipes in on hover.
const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-500 ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-50 isolate",
  {
    variants: {
      variant: {
        solid:
          "bg-blood text-bone before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-bone before:transition-transform before:duration-500 before:ease-[var(--ease-out-expo)] hover:text-ink hover:before:scale-x-100",
        outline:
          "border border-bone/35 text-bone before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-bone before:transition-transform before:duration-500 before:ease-[var(--ease-out-expo)] hover:border-bone hover:text-ink hover:before:scale-x-100",
        ghost: "text-bone hover:text-blood-bright",
      },
      size: {
        md: "h-12 px-6",
        lg: "h-14 px-7 sm:h-16 sm:px-9",
        icon: "size-12",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
