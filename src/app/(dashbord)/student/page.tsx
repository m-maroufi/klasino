import { getStudentCourses } from "@/actions/student-courses";
import { CardCourse, TitleSection } from "@/components/shared";
import SkletonLoadingSection from "@/components/shared/SkletonLoadingSection";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { getAllCourses } from "@/db/queries";
import { BookAIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function StudentDashboard() {
  return (
    <div className="">
      <TitleSection title="داشبورد" />

      <Suspense fallback={<SkletonLoadingSection />}>
        <StudentStats />
      </Suspense>

      <Separator className="my-6" />
      <section>
        <TitleSection title="دوره های پیشنهادی" />
        <section>
          <Suspense fallback={<SkletonLoadingSection />}>
            <SuggestedCourses />
          </Suspense>
        </section>
      </section>
    </div>
  );
}

async function SuggestedCourses() {
  const courses = await getAllCourses();
  return (
    <ItemGroup className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 gap-10">
      {courses.map((course) => (
        <CardCourse {...course} key={course.courseId} />
      ))}
    </ItemGroup>
  );
}

async function StudentStats() {
  // 📦 گرفتن لیست دوره‌ها از سرور اکشن
  const courses = await getStudentCourses();

  const totalCourses = courses.length;
  // اینجا بعداً می‌تونی تعداد دوره‌های گذرانده‌شده رو هم بر اساس progress حساب کنی

  return (
    <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* --- تعداد کل دوره‌ها --- */}
      <Item variant="muted" className="w-fit text-nowrap">
        <ItemMedia variant="icon">
          <BookAIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>دوره‌های خریداری‌شده</ItemTitle>
        </ItemContent>
        <ItemActions className="flex items-center justify-between w-full">
          <Button size="icon" variant="default" className="text-2xl font-black">
            {String(totalCourses).padStart(2, "0")}
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/student/my-course">مشاهده</Link>
          </Button>
        </ItemActions>
      </Item>
    </section>
  );
}
