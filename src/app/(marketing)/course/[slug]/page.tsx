import { userCheckedCoursePurchased } from "@/actions/checkedPurchased";
import AsideSection from "@/components/marketing/Course/AsideSection";
import TabCourse from "@/components/marketing/Course/TabCourse";
import Tags from "@/components/marketing/Course/Tags";
import { CourseStatusBadge } from "@/components/marketing/widget/CourseStatusBadge";
import PaymentButton from "@/components/marketing/widget/PaymentButton";
import { BreadcrumbsLinks } from "@/components/shared";
import { Separator } from "@/components/ui/separator";
import { getCourseBySlug } from "@/db/queries";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CourseDetailsPage({ params }: Props) {
  const { slug } = await params;
  // Fetch course details using the slug if needed
  const course = await getCourseBySlug(slug);
  if (!course) {
    notFound();
  }

  const checkedPurchased = await userCheckedCoursePurchased(course.id);

  return (
    <main className="min-h-screen mt-20">
      <section className="container">
        <BreadcrumbsLinks />
        <section className="wrapper flex flex-col md:flex-row gap-4">
          <ReactQueryProvider>
            <AsideSection course={course} checkedPurchased={checkedPurchased} />
          </ReactQueryProvider>
          <section className="Content order-2 md:order-2 w-full md:w-2/3 p-4">
            <div className="head hidden md:block">
              <h3 className="font-semibold text-xl">{course.title}</h3>
              <CourseStatusBadge status={course.status} />
            </div>
            <div className="course-description mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="font-vazir text-sm font-semibold text-gray-800 mb-2">
                درباره دوره
              </h4>
              <div
                className="font-vazir text-sm text-gray-600"
                dangerouslySetInnerHTML={{
                  __html:
                    course.description ||
                    "توضیحاتی برای این دوره در دسترس نیست.",
                }}
              />
            </div>
            <Separator className="my-4" />
            <TabCourse
              courseSlug={course.slug}
              checkedPurchased={checkedPurchased}
            />
            <Separator className="my-8" />
            {/* {تگ ها} */}
            <Tags />
          </section>
        </section>
      </section>
      <PaymentButton />
    </main>
  );
}
