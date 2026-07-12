import type { Metadata } from "next";
import { Press_Start_2P, VT323, Fira_Code } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-terminal",
  display: "swap",
});

const firaCode = Fira_Code({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: 'thatdevjohnmark | QA Specialist & Full-Stack Developer',
    template: '%s | thatdevjohnmark',
  },
  description:
    'Portfolio of John Mark Tactacan — QA specialist and full-stack developer. Manual testing, data validation, Next.js, React, TypeScript. I build and break systems to ship reliable software.',
  openGraph: {
    title: 'thatdevjohnmark | QA Specialist & Full-Stack Developer',
    description:
      'Manual testing, data validation, and full-stack development with Next.js, React, and TypeScript.',
    url: 'https://thatdevjohnmark.vercel.app',
    siteName: 'thatdevjohnmark',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pressStart2P.variable} ${vt323.variable} ${firaCode.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
