import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css"; // ✅ Absolute path to CSS
import { ConditionalLayout } from "@/components/conditional-layout";
import { ConditionalFooter } from "@/components/conditional-footer";
import { AuthProvider } from "@/context/auth-context";
import IntroSection from "@/components/intro/intro_section";

const grotesk = localFont({
  src: [
    { path: "../app/fonts/Grotesk-Regular.ttf", weight: "400" }, // ✅ Stepping up to find fonts
    { path: "../app/fonts/Grotesk-DemiBold.ttf", weight: "600" },
    { path: "../app/fonts/Grotesk-Bold.ttf", weight: "700" },
  ],
  variable: "--font-grotesk",
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
      className={grotesk.variable}>
      <body className="antialiased font-sans">
        <AuthProvider>
          <IntroSection />
          <ConditionalLayout />
          {children}
          <ConditionalFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
