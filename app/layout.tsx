import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["100", "400", "600", "900"],
});

export const metadata: Metadata = {
  title: "AdoptAI | Roadmap de Transformación Estratégica",
  description: "Una ruta estratégica para la transformación digital con IA",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${inter.variable} light h-full antialiased`}
    >
      <head>
        <link 
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
  rel="stylesheet" 
  crossOrigin="anonymous" 
/>
      </head>
      <body className="bg-surface font-body text-on-surface min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
