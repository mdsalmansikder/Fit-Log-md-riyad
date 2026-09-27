import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FitLogProvider } from "@/components/fitlog-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toast } from "@/components/toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog — Train with intent",
  description: "A focused workout library and daily training log. Pick a lift, lock in today's plan, and track every set.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <FitLogProvider>
          <SiteHeader />
          <main className="site-main">{children}</main>
          <SiteFooter />
          <Toast />
        </FitLogProvider>
      </body>
    </html>
  );
}
