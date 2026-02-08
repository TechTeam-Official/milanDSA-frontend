import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css"; // ✅ Absolute path to CSS
import { ConditionalLayout } from "@/components/conditional-layout";
import { ConditionalFooter } from "@/components/conditional-footer";
import { AuthProvider } from "@/context/auth-context";
import IntroSection from "@/components/intro/intro_section";

const stampPress = localFont({
  src: "./fonts/StampPressRegular-pgMYy.otf",
  variable: "--font-stamp-press",
  display: "swap",
});

const foglihten = localFont({
  src: "./fonts/Foglihtenno07-e9wz3.otf",
  variable: "--font-foglihten",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MILAN 2026 | SRMIST",
  description:
    "National Cultural Festival of SRM Institute of Science and Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${stampPress.variable} ${foglihten.variable}`}>
      <body className="antialiased font-sans">
        <AuthProvider>
          <ConditionalLayout />
          {children}
          <ConditionalFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
