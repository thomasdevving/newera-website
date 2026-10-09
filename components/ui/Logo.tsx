import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";

type LogoProps = {
  /** Rendered height in px; width follows the image ratio. */
  height?: number;
  /** Wraps the logo in a link to the home page. */
  link?: boolean;
  priority?: boolean;
  className?: string;
};

/**
 * Brand wordmark. To swap the logo, replace /public/brand/logo.png or change
 * `siteConfig.logo` in lib/site-config.ts. Nothing else references the file.
 */
export function Logo({ height = 36, link = true, priority, className }: LogoProps) {
  const { src, width: w, height: h, alt } = siteConfig.logo;
  const width = Math.round((w / h) * height);

  const image = (
    <Image
      src={src}
      alt={link ? `${alt}, naar de homepage` : alt}
      width={width}
      height={height}
      priority={priority}
      sizes={`${width * 2}px`}
      className="block h-auto select-none"
      style={{ width, height }}
    />
  );

  if (!link) return <span className={cn("inline-block", className)}>{image}</span>;

  return (
    <Link href="/" className={cn("inline-block", className)}>
      {image}
    </Link>
  );
}
