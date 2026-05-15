import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. IMPORTANTE: Debes importar el Proveedor que creamos
import { ThemeProvider } from '@/components/ThemeProvider'; 
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer"; // O la ruta donde lo tengas

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "COBYTE | Tecnología y Música",
  description: "Tu tienda de tecnología y música en Bagua",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-300">
        
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <CartDrawer />
          
          <main>
            {children}
          </main>
          
        </ThemeProvider>

      </body>
    </html>
  );
}