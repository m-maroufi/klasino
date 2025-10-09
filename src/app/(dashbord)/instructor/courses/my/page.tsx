import { CourseCardContainer } from "@/components/dashboard/instructor/CourseCardContainer";
import { TitleSection } from "@/components/shared";
import { auth } from "@/lib/auth";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function MyCoursesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/");
  }
  if (session.user.role !== "instructor") {
    redirect("/");
  }
  return (
    <div className="p-6">
      <TitleSection title="🎓 دوره‌های من" />
      <Suspense fallback={<h1>در حال بارگزاری ...</h1>}>
        <ReactQueryProvider>
          <CourseCardContainer instructorId={session.user.id} />
        </ReactQueryProvider>
      </Suspense>
    </div>
  );
}
