// /app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "./context/AuthContext"; // 👈 import AuthProvider

export const metadata: Metadata = {
  title: "Loka",
  icons: {
    icon: "/logo.png", // ✅ correct path in Next.js App Router
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
        <AuthProvider> {/* 👈 wrap children and Navbar */}
          {children}
          <Navbar />
        </AuthProvider>
      </body>
    </html>
  );
}
