import type { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const billgest = localFont({
  src: "./fonts/Billgest-Regular.woff2",
  variable: "--font-billgest",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DSR - Soluções Corporativas",
  description: "Consultoria e soluções empresariais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${billgest.variable} ${jakarta.variable} antialiased bg-background text-foreground font-jakarta flex flex-col min-h-screen`}
      >
        {/* Navbar fixa no topo */}
        <Navbar /> 
        
        {/* Conteúdo da página estica para preencher espaço */}
        <main className="flex-1">
            {children}
        </main>
        
        {/* Rodapé fixo no final */}
        <Footer />
      </body>
    </html>
  );
}