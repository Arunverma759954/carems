import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "@/components/ClientBody";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareMS Maintenance Services | Home",
  description:
    "CareMS Maintenance Services - 24 hours emergency electrician, install, repair & maintenance. Get ready for winter with expert care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} min-h-screen font-sans antialiased`}
      >
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
