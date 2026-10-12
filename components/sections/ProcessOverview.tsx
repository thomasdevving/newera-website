import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { processOverview } from "@/lib/process";

/** Home: the process in four steps, on the light paper band. */
export function ProcessOverview() {
  return (
    <section className="surface-paper py-16 md:py-20 xl:py-24" aria-labelledby="werkwijze-titel">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-caps flex items-center gap-3 text-accent-deep">
              <span aria-hidden className="inline-block h-px w-6 bg-accent-deep" />
              Werkwijze
            </p>
            <RevealText
              id="werkwijze-titel"
              text="Vier stappen, één aanspreekpunt."
              className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.1] tracking-[-0.025em]"
            />
          </div>
          <Link
            href="/werkwijze"
            className="group inline-flex items-center gap-3 self-start text-[15px] text-accent-deep underline-offset-4 hover:underline md:self-auto"
          >
            Bekijk de volledige werkwijze
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </div>

        <ol className="mt-10 grid border-l border-t border-paper-line sm:grid-cols-2 xl:grid-cols-4 md:mt-14">
          {processOverview.map(({ title, text, icon: Icon }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={index * 0.06}
              y={16}
              className="group relative grid grid-cols-[24px_1fr] gap-x-4 border-b border-r border-paper-line p-5 transition-colors duration-500 hover:bg-paper-ink/[0.03] sm:block sm:p-6 md:p-8"
            >
              <span aria-hidden className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
              <div className="row-span-2 flex items-center justify-between sm:row-span-1">
                <Icon aria-hidden className="h-6 w-6 self-start text-accent-deep sm:self-auto" strokeWidth={1.25} />
                <span className="tabular hidden text-xs tracking-[0.2em] text-paper-muted sm:inline">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-xl sm:mt-8">{title}</h3>
              <p className="mt-1 text-[15px] leading-snug text-paper-muted sm:mt-2">{text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
