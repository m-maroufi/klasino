import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
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
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${vazir.variable}`}>
      <body className={`antialiased `}>{children}</body>
    </html>
  );
}
