import type { Metadata } from "next";
import { Anton, Space_Grotesk } from "next/font/google";
import "~/app/globals.css";
import RegisterGSAP from "~/components/utility/register-gsap";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});
export const metadata: Metadata = {
  title: {
    template: "%s | Taman Teman",
    default: "Taman Teman: Unique House Plants & Cultivated Joy 🌱",
  },
  description: `Step into a world where every leaf tells a story, every bloom whispers a secret. At Taman Teman, we believe a home isn't truly alive until it breathes with green. We're not just selling plants; we're cultivating joy, one pot at a time. Come, find the green soulmate that's waiting to begin its story with you. 🌱`,
  icons: {
    icon: [
      {
        url: "/TM-SVG-01.svg",
        type: "image/svg+xml",
      },
    ],
  },
  keywords: [
    "house plants",
    "indoor plants",
    "Taman Teman",
    "buy plants",
    "plant shop",
    "gardening",
    "plant care",
    "green home",
    "Bali plants",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Taman Teman: Unique House Plants & Cultivated Joy 🌱",
    description:
      "Discover unique house plants at Taman Teman and bring your home to life. We're cultivating joy, one pot at a time. Find your perfect green companion today! 🌱",
    url: process.env.NEXT_PUBLIC_SITE_BASE_URL || "www.tamanteman.com",
    siteName: "Taman Teman",
    images: [
      {
        url: "/TM-SVG-01.svg",
        width: 1078,
        height: 968,
        alt: "A beautiful collection of house plants from Taman Teman",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/en-us",
    },
  },
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${anton.variable} antialiased bg-green-900`}>
        <RegisterGSAP />
        {children}
      </body>
    </html>
  );
}
