import { cn } from "@/lib/cn";

type PhotoProps = {
  src: string;
  alt: string;
  /** Width candidates for a local photo (see `local()` in site-config). */
  srcSet?: string;
  className?: string;
  /** CSS sizes hint, matching the rendered width. */
  sizes?: string;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
};

const WIDTHS = [480, 800, 1200, 1600, 2200];

/**
 * Responsive photo. Remote Unsplash placeholders get a srcset; local photos use
 * the `srcSet` they were exported with, or are served as they are. Cloudflare
 * Workers has no Next.js image optimizer, which is why this uses a plain <img>.
 */
export function Photo({ src, alt, srcSet, className, sizes = "100vw", priority }: PhotoProps) {
  const remote = src.startsWith("https://images.unsplash.com/");
  const url = (width: number) => `${src}?w=${width}&q=72&auto=format&fit=crop`;
  const candidates = remote ? WIDTHS.map((width) => `${url(width)} ${width}w`).join(", ") : srcSet;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={remote ? url(1600) : src}
      srcSet={candidates}
      sizes={candidates ? sizes : undefined}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={cn("block h-full w-full object-cover", className)}
    />
  );
}
