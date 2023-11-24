import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import { ThemeSwitcher } from "@/components/button/ThemeSwitcher";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "react-hot-toast";

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
      <UserProvider>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ThemeSwitcher />
            <Providers>{children}</Providers>
          </ThemeProvider>
          <Toaster />
        </body>
      </UserProvider>
    </html>
  );
}
