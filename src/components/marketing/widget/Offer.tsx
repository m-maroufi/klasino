"use client";
import { OfferCode } from "@/components/shared";
import dynamic from "next/dynamic";
import React from "react";

const GridBackground = dynamic(
  () =>
    import("@/components/ui/grid-background").then(
      (mod) => mod.GridBackground // 👈 اکسپورت درست
    ),
  { ssr: false }
);
const Offer = () => {
  return (
    <div className="relative h-96 w-full  overflow-hidden">
      <GridBackground gridSize="6:6">
        {/* Content */}
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto space-y-10 h-full px-8">
          {/* Main heading */}
          <h1 className="text-center text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-fuchsia-400 bg-clip-text text-transparent animate-fade-in">
            جشنواره تابستانه
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              کلاسینو
            </span>
          </h1>
          {/* Subtitle */}
          <p className="text-center leading-10 text-xl text-purple-100 max-w-lg mx-auto animate-fade-in">
            با استفاده از کد تخفیف زیر{" "}
            <mark className="px-3 text-2xl font-bold text-red-500">
              {" "}
              30 درصد
            </mark>
            برای خرید خود تخفیف بگیرید
          </p>
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <OfferCode />
          </div>
        </div>
      </GridBackground>
    </div>
  );
};

export default Offer;
