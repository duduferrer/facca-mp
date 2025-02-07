import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import AuthProvider from "./providers/authProvider";
import { ThemeProvider } from "./providers/themeProvider";
import CartProvider from "./providers/cartProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "FACCA APP-BH",
  description: "MarketPlace",
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
              <Toaster />
              <Header />
              {children}
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
