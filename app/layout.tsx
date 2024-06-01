import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "TechPoint",
  description: "PWR group project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={jost.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
