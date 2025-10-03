"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CreateCouresForm from "./CreateCouresForm";
import ManageLessons from "./ManageLessons";
import ManageSections from "./ManageSections";
interface CourseType {
  id: string;
  title: string;
  description: string | null;
}
export default function CreateCourseWizard() {
  const [course, setCourse] = useState<CourseType | null>(null);

  return (
    <Tabs
      defaultValue={!course?.id ? "course" : "sections"}
      className="w-full"
      dir="rtl"
    >
      <TabsList variant={"line"}>
        <TabsTrigger value="course">اطلاعات دوره</TabsTrigger>
        <TabsTrigger value="sections" disabled={!course?.id}>
          سرفصل‌ها
        </TabsTrigger>
        <TabsTrigger value="lessons" disabled={!course?.id}>
          درس‌ها
        </TabsTrigger>
      </TabsList>

      <TabsContent value="course">
        {/* onCreated={(id) => setCourseId(id)} */}
        <CreateCouresForm onCreated={(course) => setCourse(course)} />
      </TabsContent>

      <TabsContent value="sections">
        <ManageSections courseId={course?.id} courseTitle={course?.title} />
      </TabsContent>

      <TabsContent value="lessons">
        <ManageLessons courseId={course?.id!} courseTitle={course?.title} />
      </TabsContent>
    </Tabs>
  );
}
