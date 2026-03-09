import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DemoBookingProvider } from "@/components/ui/DemoBookingContext";
import DemoBooking from "@/components/ui/DemoBooking";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "СЕРВЕКС — цифровой администратор нового поколения",
  description: "Берёт на себя общение с клиентами, запись, переносы и отмены — чтобы бизнес перестал терять выручку на первой линии сервиса",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-sx-deep text-sx-cream font-body">
        <DemoBookingProvider>
          <Header />
          {children}
          <Footer />
          <DemoBooking />
        </DemoBookingProvider>
      </body>
    </html>
  );
}
