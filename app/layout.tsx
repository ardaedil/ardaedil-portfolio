import type { Metadata } from "next";
import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Arda Edil — Student Founder & Software Engineer",
  description: "University of Michigan Computer Science student building AgentSEO and technically ambitious software across AI, full-stack engineering, and applied ML.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#050505] text-[#151515]">{children}</body>
    </html>
  );
}
