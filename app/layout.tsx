import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, Press_Start_2P } from "next/font/google";

import "./globals.css";
import BackgroundScene from "@/components/BackgroundScene";

// Display face. Fraunces' soft, slightly wonky serif carries the Ghibli half
// of the palette in a way a neutral grotesk can't.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
});

// Kept from the original site, now demoted to small labels only.
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start",
});

export const metadata: Metadata = {
  title: "Matias Freire | Software Engineer",
  description:
    "Computer science student at Stevens Institute of Technology. Software engineering, machine learning research, and community building in the New York metro area.",
  openGraph: {
    title: "Matias Freire | Software Engineer",
    description:
      "Computer science student at Stevens Institute of Technology. Software engineering, machine learning research, and community building.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variables must live on <html>: the theme tokens that reference
    // them (--font-display and friends) are declared on :root, and a custom
    // property resolves var() against the element it's declared on — not the
    // one that consumes it. On <body> they'd resolve to nothing.
    <html
      lang="en"
      className={`${fraunces.variable} ${ibmPlexSans.variable} ${pressStart.variable}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        {/* Rendered here rather than per-page so the scene never remounts. */}
        <BackgroundScene />
        <div aria-hidden="true" className="vignette" />
        <div aria-hidden="true" className="grain" />
        {children}
      </body>
    </html>
  );
}
