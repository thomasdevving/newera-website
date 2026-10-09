import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klantportal",
  description: "Inloggen op de klantportal van Studio NewEra.",
  robots: { index: false, follow: true },
};

/**
 * Portal shell, separate from the marketing header and footer.
 * TODO: add authentication here (NextAuth, Clerk or Supabase Auth) and guard
 * child routes such as /portal/projecten once the portal is built.
 */
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="relative flex min-h-svh flex-col overflow-hidden">
      {children}
    </main>
  );
}
