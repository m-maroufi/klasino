"use client";
import CommentsTab from "@/components/marketing/Course/CommentsTab";
import CourseVideosSection from "@/components/marketing/Course/CourseVideosSection";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BookOpenText, MessageCircleCode } from "lucide-react";
import { useState } from "react";
const TabCourse = ({
  courseSlug,
  checkedPurchased,
}: {
  courseSlug: string;
  checkedPurchased: boolean;
}) => {
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <ReactQueryProvider>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="text-sm text-muted-foreground "
      >
        <TabsList
          variant="line"
          dir="rtl"
          className="sticky top-16 z-10 bg-white"
        >
          <TabsTrigger value="profile">
            <BookOpenText /> سرفصل ها
          </TabsTrigger>
          <TabsTrigger value="security">
            <MessageCircleCode /> نظرات و پرسش ها
          </TabsTrigger>
        </TabsList>
        {/* محتوای همه تب‌ها را رندر کنید، اما با hidden مخفی کنید */}
        <div
          className={activeTab === "profile" ? "block my-5" : "hidden my-3"}
          dir="rtl"
        >
          <CourseVideosSection
            slug={courseSlug}
            checkedPurchased={checkedPurchased}
          />
        </div>
        <div
          className={activeTab === "security" ? "block" : "hidden"}
          dir="rtl"
        >
          <CommentsTab />
        </div>
      </Tabs>
    </ReactQueryProvider>
  );
};

export default TabCourse;
