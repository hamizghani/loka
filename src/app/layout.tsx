import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { icons } from "lucide-react";

// /app/layout.tsx
export const metadata = {
  title: "Loka",
  icons: {
    icon: "../../public/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        {children}
      <Navbar />  
      </body>
    </html>
  );
}
