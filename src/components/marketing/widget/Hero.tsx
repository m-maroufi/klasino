import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative w-full min-h-[calc(100vh-50rem)] overflow-hidden">
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0 z-0 gradient-wave"
        style={{
          background:
            "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #BFDBFE 100%)",
          backgroundSize: "200% 200%",
        }}
      >
        <div
          className="absolute inset-0 noise-overlay"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.3) 1px, transparent 0)
            `,
            backgroundSize: "25px 25px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container min-h-screen flex items-center justify-center py-12 px-4 sm:px-8">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-fade-in">
            با کلاسینو، آینده‌ات را بساز!
          </h1>
          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            به پلتفرم آموزشی آنلاین کلاسینو بپیوندید و با دوره‌های تخصصی در
            برنامه‌نویسی، طراحی و توسعه فردی، مهارت‌های خود را به سطح بعدی
            ببرید.
          </p>
          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 mt-6">
            <div className="flex items-center gap-3 text-white animate-count-up">
              <Users className="h-8 w-8 text-yellow-300" />
              <div>
                <p className="text-2xl font-bold">+۱۰,۰۰۰</p>
                <p className="text-sm">دانشجو</p>
              </div>
            </div>
            <div
              className="flex items-center gap-3 text-white animate-count-up"
              style={{ animationDelay: "0.2s" }}
            >
              <BookOpen className="h-8 w-8 text-yellow-300" />
              <div>
                <p className="text-2xl font-bold">+۵۰</p>
                <p className="text-sm">دوره آموزشی</p>
              </div>
            </div>
          </div>
          {/* CTA Button */}
          <Button
            asChild
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-lg shadow-lg flex items-center gap-2 mx-auto animate-fade-in"
          >
            <Link href="/course">
              شروع یادگیری
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
