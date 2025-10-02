import CreateCourseWizard from "@/components/dashboard/instructor/CreateCousesWizard";
import { Card, CardContent } from "@/components/ui/card";
import ReactQueryProvider from "@/provider/ReactQueryProvider";

export default function CreateCoursePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">ایجاد دوره جدید</h1>
      <p className="text-muted-foreground">
        لطفا اطلاعات دوره جدید خود را وارد کنید.
      </p>
      <Card>
        <CardContent>
          <ReactQueryProvider>
            <CreateCourseWizard />
          </ReactQueryProvider>
        </CardContent>
      </Card>
    </div>
  );
}
