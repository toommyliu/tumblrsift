import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import TopNav from "@/components/topnav";
import { TumblrStoreProvider } from "@/lib/providers/tumblr-provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tumblrsift",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TumblrStoreProvider>
            <TopNav />
            {children}
          </TumblrStoreProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
