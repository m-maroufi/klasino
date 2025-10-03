import FiltersSection from "@/components/marketing/Course/FiltersSection";
import {
  BreadcrumbsLinks,
  CardCourse,
  TitleSection,
} from "@/components/shared";
import { getAllCourses } from "@/db/queries";

export default async function CoursesPage() {
  const courses = await getAllCourses();
  return (
    <main className="">
      <div className="min-h-14 w-full bg-white relative pt-24 pb-8 mb-5">
        {/* Dual Gradient Overlay (Bottom) Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 100%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 100% 80%, rgba(59,130,246,0.3), transparent)
      `,
            backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
          }}
        />
        {/* Your Content/Components */}
        <section className="container relative z-10">
          <BreadcrumbsLinks />
        </section>
        <section className="container my-6 relative z-10">
          <TitleSection title="دوره ها" />
        </section>
      </div>

      <section className="container">
        <FiltersSection />
        <div className="courses grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 my-8">
          {courses.map((item, index) => (
            <CardCourse key={index} {...item} />
          ))}
        </div>
      </section>
    </main>
  );
}
