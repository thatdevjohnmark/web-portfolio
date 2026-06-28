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
    default: 'thatdevjohnmark',
    template: '%s | thatdevjohnmark',
  },
  description: 'Portfolio of John Mark Tactacan, QA Specialist.',
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
