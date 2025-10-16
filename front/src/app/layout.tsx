import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";
import DynamicBackground from "@/components/DynamicBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bank App - Secure Banking Platform",
  description: "Modern banking application with secure transactions and user management",
};

const backgroundConfig = {
  videoSrc: "/video/0001-0250.mp4",
  imageSrc: "/png/0001.png", 
  fallBackOnMobile: true,
  overlay: true,
  overlayOpacity: 0.3
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Используем ваш компонент прямо в layout */}
        <DynamicBackground {...backgroundConfig} />
        
        {/* Сохраняем структуру с контентом */}
        <div className="relative z-10 min-h-screen bg-gradient-to-br from-green-500/80 to-blue-500/80 flex flex-col items-center justify-center">
          <SessionProvider>
            {children}
          </SessionProvider>
        </div>
        
        {modal}
      </body>
    </html>
  );
}