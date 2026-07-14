import type { Metadata } from "next";
import Script from "next/script";
import { Caveat, Fraunces, IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
});
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Edd Norris — Systems builder",
  description:
    "Creator studio portfolio: environmental systems, games, software, and product storytelling.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-studio-mode="day" suppressHydrationWarning>
      <head>
        <Script id="studio-theme-init" strategy="beforeInteractive">
          {`(function(){try{var k='ed-norris-studio-mode';var m=localStorage.getItem(k);if(m!=='day'&&m!=='night'){m=window.matchMedia('(prefers-color-scheme: dark)').matches?'night':'day';}document.documentElement.setAttribute('data-studio-mode',m);}catch(e){}})();`}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${fraunces.variable} ${ibmPlexMono.variable} ${caveat.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
