"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// OfferCode Component
const OfferCode = () => {
  const [code] = useState("SUMMER30"); // کد تخفیف نمونه

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast.success("کد تخفیف کپی شد!", {
          description: `کد ${code} آماده استفاده است.`,
          richColors: true,
        });
      })
      .catch(() => {
        toast.error("خطا در کپی کردن کد!");
      });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <Input
        value={code}
        readOnly
        className="bg-white/95 text-gray-900 font-mono text-base rounded-lg py-6 border-none shadow-md focus:ring-2 focus:ring-blue-400 transition-all"
      />
      <Button
        onClick={copyToClipboard}
        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 py-6 rounded-lg shadow-md"
        aria-label="Copy discount code"
      >
        <Copy className="h-5 w-5" />
        کپی کد
      </Button>
    </div>
  );
};

export default function Offer() {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #BFDBFE 100%)",
          animation: "gradientWave 12s ease infinite",
          backgroundSize: "200% 200%",
        }}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.3) 1px, transparent 0)
            `,
            backgroundSize: "25px 25px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto space-y-8 px-4 sm:px-8">
        {/* Animated Gift Icon */}
        <div className="bounceGift">
          <svg
            className="h-16 w-16 text-yellow-300 drop-shadow-lg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
        </div>

        {/* Main Heading */}
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
          جشنواره تابستانه
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            کلاسینو
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-lg sm:text-xl text-gray-100 max-w-lg leading-relaxed animate-fade-in">
          با استفاده از کد تخفیف زیر{" "}
          <mark className="px-3 py-1 text-xl font-bold text-yellow-300 bg-blue-900/60 rounded-lg">
            30 درصد
          </mark>{" "}
          برای خرید خود تخفیف بگیرید
        </p>

        {/* Offer Code */}
        <div className="animate-fade-in">
          <OfferCode />
        </div>
      </div>
    </div>
  );
}
