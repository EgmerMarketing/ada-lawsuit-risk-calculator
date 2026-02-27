import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADA Lawsuit Risk Calculator | Is Your Website Next?",
  description: "Find out how vulnerable your business website is to an ADA accessibility lawsuit. Free risk assessment based on 15,000+ filed cases.",
  openGraph: {
    title: "ADA Lawsuit Risk Calculator | Is Your Website Next?",
    description: "15,000+ ADA lawsuits filed in 4 years. 90% by just 16 law firms. Find out your risk in 2 minutes.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
