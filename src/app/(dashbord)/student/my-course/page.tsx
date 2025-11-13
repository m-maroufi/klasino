// app/dashboard/courses/page.tsx
import { getStudentCourses } from "@/actions/student-courses";
import { TitleSection } from "@/components/shared";
import SkletonLoadingSection from "@/components/shared/SkletonLoadingSection";
import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import Image from "next/image";
import Link from "next/link";

import { Suspense } from "react";

// این باعث میشه صفحه قابلیت Partial Prerendering داشته باشه
export const experimental_ppr = true;

export default function Page() {
  return (
    <div className="space-y-6">
      <TitleSection title="دوره‌های من" />

      <Suspense fallback={<SkletonLoadingSection />}>
        <CoursesList />
      </Suspense>
    </div>
  );
}

async function CoursesList() {
  try {
    const courses = await getStudentCourses();

    if (!courses || courses.length === 0) {
      return (
        <div className="p-8 text-center text-gray-500 border rounded-2xl">
          هنوز هیچ دوره‌ای ثبت‌نام نکردی 🥺
        </div>
      );
    }

    return (
      <div className=" mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Item
            key={course.courseId}
            variant={"outline"}
            className="max-w-fit w-fit hover:bg-accent"
          >
            <ItemHeader className=" flex items-center justify-center">
              <Link href={`/course/${course.slug}`}>
                <Image
                  src={course.thumbnailUrl!}
                  alt={course.title}
                  width={200}
                  height={200}
                  className="object-cover rounded-2xl"
                />
              </Link>
            </ItemHeader>
            <ItemContent className="px-3">
              <ItemTitle>
                <Link
                  href={`/course/${course.slug}`}
                  className="font-bold text-lg text-nowrap"
                >
                  {course.title}
                </Link>
              </ItemTitle>
            </ItemContent>
          </Item>
        ))}
      </div>
    );
  } catch (err) {
    return (
      <div className="p-8 text-center text-red-500 border border-red-300 rounded-2xl">
        خطایی در دریافت اطلاعات پیش آمد 😞
      </div>
    );
  }
}
