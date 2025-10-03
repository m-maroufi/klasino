import AsideSection from "@/components/marketing/Course/AsideSection";
import TabCourse from "@/components/marketing/Course/TabCourse";
import Tags from "@/components/marketing/Course/Tags";
import { CourseStatusBadge } from "@/components/marketing/widget/CourseStatusBadge";
import PaymentButton from "@/components/marketing/widget/PaymentButton";
import { BreadcrumbsLinks } from "@/components/shared";
import { Separator } from "@/components/ui/separator";
import { getCourseBySlug } from "@/db/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CourseDetailsPage({ params }: Props) {
  const { slug } = await params;
  // Fetch course details using the slug if needed
  const course = await getCourseBySlug(slug);

  return (
    <main className="min-h-screen mt-20">
      <section className="container">
        <BreadcrumbsLinks />
        <section className="wrapper flex flex-col md:flex-row gap-4">
          <AsideSection course={course} />
          <section className="Content order-2 md:order-2 w-full md:w-2/3 p-4">
            <div className="head hidden md:block">
              <h3 className="font-semibold text-xl">{course.title}</h3>
              <CourseStatusBadge status={course.status} />
            </div>
            <div
              className="content_html font-vazir font-normal text-gray-600"
              dangerouslySetInnerHTML={{ __html: course.description || "" }}
            />
            <Separator className="my-4" />
            <TabCourse courseSlug={course.slug} />
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
