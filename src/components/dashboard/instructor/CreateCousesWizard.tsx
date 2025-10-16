"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CreateCouresForm from "./CreateCouresForm";
import ManageLessons from "./ManageLessons";
import ManageSections from "./ManageSections";
export interface CourseType {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  price: string; // تغییر به number برای هماهنگی با خروجی اسکیما
  thumbnailUrl: string | null;
  status: "ongoing" | "completed" | "preorder";
  isPublished: boolean;
  level: string | null;
  language: string | null;
  duration: number | null;
  categories: { id: string; name: string; slug: string }[];
}

interface CreateCourseWizardProps {
  initialCourse?: CourseType;
  mode?: "create" | "edit";
}
export default function CreateCourseWizard({
  initialCourse,
  mode = "create",
}: CreateCourseWizardProps) {
  const [course, setCourse] = useState<CourseType | undefined>(initialCourse);

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
        <CreateCouresForm
          onCreated={(course) => setCourse(course)}
          mode={mode}
          initialData={initialCourse}
        />
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
