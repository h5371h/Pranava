import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from './navbar';
import SessionProviderWrapper from './SessionProviderWrapper'; // Import the client-side provider
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pranava - Online Yoga Platform",
  description: "Discover balance through online yoga with Pranava",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          {/* Wrap the app in SessionProviderWrapper */}
          <SessionProviderWrapper>
            <Navbar />
            <main className="flex-grow">{children}</main>
          </SessionProviderWrapper>
        </div>
      </body>
    </html>
  );
}