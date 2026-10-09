import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  /** Shows a trailing arrow that slides on hover. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;
type ButtonAsButton = BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-bg hover:shadow-[0_8px_28px_-12px_rgba(201,166,107,0.75)] disabled:bg-accent/50 disabled:shadow-none",
  secondary: "border border-line-strong text-ink hover:border-accent hover:text-accent disabled:opacity-50",
  ghost: "text-ink hover:text-accent px-0 h-auto",
};

export function buttonClasses({ variant = "primary", size = "md", className }: Pick<BaseProps, "variant" | "size" | "className">) {
  return cn(
    "group/btn relative isolate inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden font-medium tracking-[0.01em] whitespace-nowrap",
    "transition-[color,border-color,box-shadow,background-color] duration-300 ease-out-expo",
    "disabled:cursor-not-allowed",
    variant !== "ghost" && sizes[size],
    variants[variant],
    className,
  );
}

function Inner({ variant = "primary", arrow, children }: Pick<BaseProps, "variant" | "arrow" | "children">) {
  return (
    <>
      {variant === "primary" && (
        // Lighter gold wipes in from the left on hover
        <span
          aria-hidden
          className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent-bright transition-transform duration-500 ease-out-expo group-hover/btn:scale-x-100 group-disabled/btn:scale-x-0"
        />
      )}
      <span className="inline-flex items-center gap-2">{children}</span>
      {arrow && (
        <span aria-hidden className="relative inline-flex h-4 w-4 overflow-hidden">
          <ArrowRight className="absolute h-4 w-4 transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-full" strokeWidth={1.5} />
          <ArrowRight className="absolute h-4 w-4 -translate-x-full transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0" strokeWidth={1.5} />
        </span>
      )}
    </>
  );
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  if (props.href !== undefined) {
    const { variant, size, arrow, className, children, href, ...rest } = props;
    return (
      <Link href={href} className={buttonClasses({ variant, size, className })} {...rest}>
        <Inner variant={variant} arrow={arrow}>
          {children}
        </Inner>
      </Link>
    );
  }
  const { variant, size, arrow, className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      <Inner variant={variant} arrow={arrow}>
        {children}
      </Inner>
    </button>
  );
}
