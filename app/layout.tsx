import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hikvision Cameras At Best Prices | Hikvision Camera Dubai",
  description: "Hikvision Camera Dubai provides high-quality security solutions. Our Hikvision 2MP IP Cameras provide dependable surveillance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <ClientLayout>
        {children}
      </ClientLayout>
    </html>
  );
}
