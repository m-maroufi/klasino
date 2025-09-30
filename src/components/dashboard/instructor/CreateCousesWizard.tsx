"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CreateCouresForm from "./CreateCouresForm";
import ManageLessons from "./ManageLessons";
import ManageSections from "./ManageSections";

export default function CreateCourseWizard() {
  const [courseId, setCourseId] = useState<string | null>(
    "129bcc0f-c4a9-4f95-bb64-301fd5b21218"
  );

  return (
    <Tabs
      defaultValue={!courseId ? "course" : "sections"}
      className="w-full"
      dir="rtl"
    >
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
        <CreateCouresForm onCreated={(id) => setCourseId(id)} />
      </TabsContent>

      <TabsContent value="sections">
        <ManageSections courseId={courseId!} />
      </TabsContent>

      <TabsContent value="lessons">
        <ManageLessons courseId={courseId!} />
      </TabsContent>
    </Tabs>
  );
}
