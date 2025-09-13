import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

const geistSans = Geist({ // Геист - это шрифт, который используется в проекте
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({ // Геист моно - это моноширинный шрифт, который используется в проекте
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = { // Метаданные - это данные, которые используются для описания страницы
  title: "Bank App - Secure Banking Platform",
  description: "Modern banking application with secure transactions and user management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500">         
          <SessionProvider>
            {children}
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
