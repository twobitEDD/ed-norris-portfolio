import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://2bitdev.com"),
  title: "Edd Norris — Technical Designer",
  description:
    "I love building solutions, for fun and function. Software & technology production specialist in Cottage Grove, Oregon.",
  applicationName: "2bitDEV",
  appleWebApp: {
    capable: true,
    title: "2bitDEV",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [{ url: "/brand/2bit-icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/apple-touch-icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e4" },
    { media: "(prefers-color-scheme: dark)", color: "#090b0b" },
  ],
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
