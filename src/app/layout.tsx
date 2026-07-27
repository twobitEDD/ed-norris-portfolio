import type { Metadata, Viewport } from "next";
import { Caveat, IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { EntFooter } from "@/components/layout/EntFooter";
import { EntHeader } from "@/components/layout/EntHeader";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
});
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || site.domain),
  title: `2bitENT — ${site.headline} ${site.headlineAccent}`,
  description: site.description,
  applicationName: "2bitENT",
  openGraph: {
    title: `2bitENT — ${site.headline} ${site.headlineAccent}`,
    description: site.description,
    url: site.domain,
    siteName: "2bitENT",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080a0e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} ${caveat.variable} font-sans`}
      >
        <div className="relative min-h-screen bg-ent-black">
          <div className="ent-surface relative">
            <EntHeader />
            <main>{children}</main>
            <EntFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
