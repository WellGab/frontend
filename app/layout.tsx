import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import { ThemeSwitcher } from "@/components/button/ThemeSwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WellGab",
  description: "Your AI powered symptom & diagnosis guidance",
  icons: { icon: "./favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeSwitcher />
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
