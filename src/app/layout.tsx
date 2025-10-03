import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
export const metadata: Metadata = {
  title: "کلاسینو",
  description: "کلاسینو - کلبه آنلاین یادگیری برنامه نویسی",
};
const vazir = Vazirmatn({
  variable: "--vazir",
  weight: ["100", "300", "400", "500"],
  style: "normal",
  display: "swap",
  subsets: ["arabic"], // ← اضافه کن
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${vazir.variable}`}>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`antialiased `}>
        {children}
        <Toaster position="top-center" dir="rtl" />
      </body>
    </html>
  );
}
