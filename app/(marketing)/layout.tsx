import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

/** Public website: shared header and footer. */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
