import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Kirar Timhirt — Learn the Kirar",
  description:
    "Master the traditional East African Kirar from scratch. Structured lessons, looping pattern guides, and real Mezmur — no teacher required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
