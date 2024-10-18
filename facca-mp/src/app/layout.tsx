import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import AuthProvider from "./providers/authProvider";
import { ThemeProvider } from "./providers/themeProvider";
import CartProvider from "./providers/cartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FACCA APP-BH",
  description: "Web app desenvolvido para gerenciar as finanças da FACCA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" enableSystem>
          <AuthProvider>
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
