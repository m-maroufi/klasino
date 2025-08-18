import { Hero } from "@/components/marketing";
import { CardCourse } from "@/components/shared";
export default function Home() {
  return (
    <section className="">
      <Hero />
      <section className="new-courses -mt-28 z-30 relative">
        <div className="container">
          <h1 className="scroll-m-20text-xl md:text-2xl font-extrabold tracking-tight text-balance mb-8">
            جدید ترین دوره ها
          </h1>
          <div className="corsers-list py-5 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <CardCourse />
            <CardCourse />
            <CardCourse />
          </div>
        </div>
      </section>
    </section>
  );
}
