import FiltersSection from "@/components/marketing/Course/FiltersSection";
import { BreadcrumbsLinks, CardCourse } from "@/components/shared";
import { getAllCourses } from "@/db/queries";
import { BookOpen } from "lucide-react";

export default async function CoursesPage() {
  const courses = await getAllCourses();
  return (
    <main className="">
      <header className="relative w-full min-h-[400px] bg-gradient-to-b from-blue-950 to-blue-600 overflow-hidden">
        {/* Animated Gradient Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #BFDBFE 100%)",
            animation: "gradientWave 15s ease infinite",
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
        <section className="container relative z-10 pt-16 pb-12">
          <BreadcrumbsLinks />
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 animate-fade-in">
              <BookOpen className="h-10 w-10 text-yellow-300" />

              <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
                دوره‌های آموزشی کلاسینو
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              با دوره‌های تخصصی کلاسینو در برنامه‌نویسی، طراحی، و توسعه فردی،
              مهارت‌های خود را به سطح حرفه‌ای برسانید.
            </p>
          </div>
        </section>
      </header>

      <section className="container py-12">
        <FiltersSection />
        <div className="courses grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
          {courses.map((item, index) => (
            <CardCourse key={index} {...item} />
          ))}
        </div>
      </section>
    </main>
  );
}
