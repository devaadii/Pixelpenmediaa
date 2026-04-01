import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pixelpen Media Portfolio",
  description: "Pixelpen Media Portfolio showcasing finance video editing work.",
  icons: {
    icon: [
      {
        url: "/logo-bw.svg?v=1",
        type: "image/svg+xml",
      },
    ],
  },
};

import { CustomCursor } from "@/components/ui/custom-cursor";
import { GSAPAnimations } from "@/components/animations/gsap-animations";
import { VideoProvider } from "@/context/video-context";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-['Clash_Display',sans-serif]`}
      >
        <VideoProvider>
          <CustomCursor />
          <GSAPAnimations />
          {children}
          <ScrollToTop />
        </VideoProvider>
      </body>
    </html>
  );
}
