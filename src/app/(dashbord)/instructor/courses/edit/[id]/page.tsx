import CreateCourseWizard from "@/components/dashboard/instructor/CreateCousesWizard";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Card, CardContent } from "@/components/ui/card";
import { getCourseById } from "@/db/queries";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseById(id);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">ویرایش دوره </h1>
      <p className="text-muted-foreground">
        لطفا اطلاعات دوره خود را وارد کنید.
      </p>
      <Card>
        <CardContent>
          <ReactQueryProvider>
            <CreateCourseWizard
              mode="edit"
              initialCourse={course?.data ?? undefined}
            />
          </ReactQueryProvider>
        </CardContent>
      </Card>
    </div>
  );
}
