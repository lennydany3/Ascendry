import type { Metadata } from "next";
import { Geist_Mono, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { IntroLoader } from "@/components/loader/IntroLoader";
import { CookieConsent } from "@/components/legal/CookieConsent";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ascendry — Websites that work as hard as you do",
  description:
    "Premium websites, booking systems and automation for cafes, gyms, salons, restaurants and growing businesses.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Hide the loader covers before first paint on repeat visits. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var s=sessionStorage,e=document.documentElement;if(s.getItem("ascendry-intro-seen"))e.setAttribute("data-intro-seen","");if(s.getItem("ascendry-labs-intro-seen"))e.setAttribute("data-labs-seen","")}catch(_){}',
          }}
        />
      </head>
      <body className="min-h-screen bg-bg text-fg-muted">
        <IntroLoader />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
