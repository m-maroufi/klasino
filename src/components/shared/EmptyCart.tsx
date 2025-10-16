import Link from "next/link";
import React from "react";

const EmptyCart: React.FC = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
        {/* آیکون سبد خرید */}
        <div className="relative mb-6">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs animate-bounce">
            خالی!
          </span>
        </div>

        {/* متن */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          سبد خرید شما خالی است!
        </h1>
        <p className="text-gray-500 mb-6">
          به نظر می‌رسه هنوز دوره‌ای انتخاب نکردید. بیایید دوره‌های جذاب رو با
          هم کشف کنیم!
        </p>

        {/* دکمه */}
        <Link href="/course">
          <button className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300">
            مشاهده دوره‌های آموزشی
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
