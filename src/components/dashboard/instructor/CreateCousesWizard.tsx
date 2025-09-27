"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CreateCouresForm from "./CreateCouresForm";

export default function CreateCourseWizard() {
  const [courseId, setCourseId] = useState<string | null>(null);

  return (
    <Tabs defaultValue="course" className="w-full" dir="rtl">
      <TabsList variant={"line"}>
        <TabsTrigger value="course">اطلاعات دوره</TabsTrigger>
        <TabsTrigger value="sections" disabled={!courseId}>
          سرفصل‌ها
        </TabsTrigger>
        <TabsTrigger value="lessons" disabled={!courseId}>
          درس‌ها
        </TabsTrigger>
      </TabsList>

      <TabsContent value="course">
        {/* onCreated={(id) => setCourseId(id)} */}
        <CreateCouresForm />
      </TabsContent>

      <TabsContent value="sections">
        {/* <ManageSections courseId={courseId!} /> */}
      </TabsContent>

      <TabsContent value="lessons">
        {/* <ManageLessons courseId={courseId!} /> */}
      </TabsContent>
    </Tabs>
  );
}
