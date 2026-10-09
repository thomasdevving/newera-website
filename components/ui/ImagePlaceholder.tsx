import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type ImagePlaceholderProps = {
  src: string | null;
  alt: string;
  className?: string;
  sizes?: string;
};

/**
 * Renders the image when `src` is set (see `images` in lib/site-config.ts),
 * otherwise a dark block labelled "Afbeelding volgt".
 */
export function ImagePlaceholder({ src, alt, className, sizes = "(min-width: 1024px) 50vw, 100vw" }: ImagePlaceholderProps) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-elevated", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden border border-line bg-elevated", className)}>
      <div aria-hidden className="week-grid absolute inset-0 opacity-60 [--cols:8]" />
      <span className="relative flex items-center gap-2 text-sm text-muted">
        <ImageIcon aria-hidden className="h-4 w-4" strokeWidth={1.5} />
        Afbeelding volgt
      </span>
    </div>
  );
}
