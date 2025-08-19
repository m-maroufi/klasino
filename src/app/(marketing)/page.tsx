import { Hero } from "@/components/marketing";
import NewCourse from "@/components/marketing/Home/NewCourse";
import Services from "@/components/marketing/Home/Services";
import Offer from "@/components/marketing/widget/Offer";
import { TitleSection } from "@/components/shared";

export default function Home() {
  return (
    <section className="">
      <Hero />
      <main className=" space-y-10 -mt-28 z-30 relative">
        <div className="container">
          <TitleSection
            title="جدید ترین دوره ها"
            link={{ href: "/course", text: "مشاهده بیشتر" }}
          />
          <div className="">
            <NewCourse />
          </div>
        </div>
        <div className="container">
          <TitleSection
            title="دوره های برگزار شده"
            link={{ href: "/course", text: "مشاهده بیشتر" }}
          />
          <div className="">
            <NewCourse />
          </div>
        </div>
        {/* offer section */}
        <Offer />
        <div className="container">
          <Services />
        </div>
      </main>
    </section>
  );
}
