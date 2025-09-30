"use server";

import db from "@/db";
import { courseCategories, courses } from "@/db/schema";
import { auth } from "@/lib/auth";
import { CreateCourseFormSchema } from "@/lib/validator.shema";
import { headers } from "next/headers";
import z from "zod";

export async function createCourse(
  values: z.infer<typeof CreateCourseFormSchema>
) {
  //1- check session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized: لطفاً وارد شوید.");
  }
  if (session.user.role !== "instructor") {
    throw new Error("Forbidden: فقط مدرس‌ها می‌توانند دوره بسازند.");
  }
  //2- check validete
  const validated = CreateCourseFormSchema.parse(values);

  // Ensure all required fields are present and not undefined
  const insertData = {
    title: validated.title ?? "",
    price: validated.price ?? 0,
    thumbnailUrl: validated.thumbnailUrl ?? "",
    slug: validated.slug ?? "",
    status: validated.status ?? "ongoing",
    isPublished: validated.isPublished ?? false,
    description: validated.description ?? "",
    level: validated.level ?? "beginner", // مطمئن شو یکی از enum هاست
    language: validated.language ?? "فارسی",
    duration: validated.duration ?? 0, // عدد باشه
    instructorId: session.user.id,
  };
  console.log(insertData, validated.category);
  const result = await db.insert(courses).values(insertData).returning({
    id: courses.id,
    title: courses.title,
    slug: courses.slug,
    description: courses.description,
    thumbnailUrl: courses.thumbnailUrl,
  });
  const courseId = result[0].id;
  if (!courseId) {
    return {
      success: false,
      message: "❌ خطا در ایجاد دوره، لطفاً دوباره تلاش کنید.",
    };
  }
  const selectedCategoryIds = validated.category || [];
  if (selectedCategoryIds.length !== 0) {
    const insertCategories = selectedCategoryIds.map((categoryId) => ({
      courseId,
      categoryId,
    }));
    await db.insert(courseCategories).values(insertCategories);
  }
  // آماده کردن مقادیر برای اینسرت
  return {
    success: true,
    message: "✅ دوره با موفقیت ایجاد شد",
    data: result[0],
  };
}
