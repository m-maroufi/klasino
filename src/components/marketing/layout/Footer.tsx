import { Github, Instagram, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-blue-50 to-white relative">
      {/* Light Blue Noise Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%)",
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(147, 197, 253, 0.12) 1px, transparent 0)
          `,
          backgroundSize: "25px 25px, 30px 30px",
          backgroundPosition: "0 0, 15px 10px",
          opacity: 0.7,
        }}
      />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Klasino Info */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332.477-4.5 1.253"
                />
              </svg>
              کلاسینو
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              کلاسینو یک پلتفرم آموزشی آنلاین است که به شما امکان دسترسی به
              دوره‌های تخصصی در زمینه‌های مختلف را می‌دهد.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              لینک‌های مفید
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link
                  href="/collaboration"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  شرایط همکاری
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              شبکه‌های اجتماعی
            </h2>
            <div className="flex space-x-4 space-x-reverse">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="h-6 w-6" />
              </a>
              <a
                href="https://t.me/mehdidevlo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com/klasino"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/m-maroufi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 font-medium">
            © 2025 کلاسینو. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}
