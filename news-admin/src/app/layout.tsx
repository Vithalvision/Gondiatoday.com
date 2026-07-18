import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "NewsRoom Admin",
  description: "Professional News Platform Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FFFFFF] text-[#222222]">
        <AuthProvider>
          {children}

          {/* 🔥 Toast notifications */}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}