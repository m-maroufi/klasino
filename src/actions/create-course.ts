"use server";

import db from "@/db";
import { courseCategories, courses } from "@/db/schema";
import { auth } from "@/lib/auth";
import { CreateCourseFormSchema } from "@/lib/validator.shema";
import { and, eq, sql } from "drizzle-orm";
import { headers } from "next/headers";
import z from "zod";

export async function createCourse(
  values: z.infer<typeof CreateCourseFormSchema>
) {
  // 1️⃣ بررسی سشن
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized: لطفاً وارد شوید.");
  }
  if (session.user.role !== "instructor") {
    throw new Error("Forbidden: فقط مدرس‌ها می‌توانند دوره بسازند.");
  }

  // 2️⃣ اعتبارسنجی فرم
  const validated = CreateCourseFormSchema.parse(values);

  // 3️⃣ آماده‌سازی داده‌ها برای اینسرت
  const insertData = {
    title: validated.title ?? "",
    price: validated.price ?? 0,
    thumbnailUrl: validated.thumbnailUrl ?? "",
    slug: validated.slug ?? "",
    status: validated.status ?? "ongoing",
    isPublished: validated.isPublished ?? false,
    description: validated.description ?? "",
    level: validated.level ?? "beginner",
    language: validated.language ?? "فارسی",
    duration: validated.duration ?? 0,
    instructorId: session.user.id,
  };

  // 4️⃣ ایجاد رکورد در جدول courses
  const result = await db.insert(courses).values(insertData).returning({
    id: courses.id,
    title: courses.title,
    slug: courses.slug,
    description: courses.description,
    thumbnailUrl: courses.thumbnailUrl,
    price: courses.price,
    status: courses.status,
    isPublished: courses.isPublished,
    level: courses.level,
    language: courses.language,
    duration: courses.duration,
  });

  const courseId = result[0].id;
  if (!courseId) {
    return {
      success: false,
      message: "❌ خطا در ایجاد دوره، لطفاً دوباره تلاش کنید.",
    };
  }

  // 5️⃣ مدیریت دسته‌بندی‌ها
  const selectedCategoryIds = validated.category || [];

  if (selectedCategoryIds.length > 0) {
    const insertCategories = selectedCategoryIds.map((categoryId) => ({
      courseId,
      categoryId,
    }));
    await db.insert(courseCategories).values(insertCategories);
  }

  // 6️⃣ واکشی دسته‌بندی‌ها برای برگشت به فرم
  const courseCategoriesData = await db.query.categories.findMany({
    where: (cat) =>
      sql`${cat.id} IN (SELECT category_id FROM course_categories WHERE course_id = ${courseId})`,
  });

  // 7️⃣ بازگرداندن داده کامل
  return {
    success: true,
    message: "✅ دوره با موفقیت ایجاد شد",
    data: {
      ...result[0],
      categories: courseCategoriesData,
    },
  };
}
export interface UpdateCourseValueType {
  courseId: string;
  values: z.infer<typeof CreateCourseFormSchema>;
}

export async function updateCourse({
  courseId,
  values,
}: UpdateCourseValueType) {
  // 1️⃣ بررسی سشن و نقش مدرس
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized: لطفاً وارد شوید.");
  }
  if (session.user.role !== "instructor") {
    throw new Error("Forbidden: فقط مدرس‌ها می‌توانند دوره را ویرایش کنند.");
  }

  // 2️⃣ اعتبارسنجی داده‌ها
  const validated = CreateCourseFormSchema.parse(values);

  // 3️⃣ بررسی مالکیت دوره
  const existingCourse = await db.query.courses.findFirst({
    where: and(
      eq(courses.id, courseId),
      eq(courses.instructorId, session.user.id)
    ),
  });

  if (!existingCourse) {
    return {
      success: false,
      message: "❌ دوره یافت نشد یا متعلق به این مدرس نیست.",
    };
  }

  // 4️⃣ آماده‌سازی داده‌ها برای آپدیت
  const updateData = {
    title: validated.title ?? existingCourse.title,
    price: validated.price ?? existingCourse.price,
    thumbnailUrl: validated.thumbnailUrl ?? existingCourse.thumbnailUrl,
    slug: validated.slug || existingCourse.slug, // slug در صورت عدم تغییر همون قبلی بمونه
    status: validated.status ?? existingCourse.status,
    isPublished: validated.isPublished ?? existingCourse.isPublished,
    description: validated.description ?? existingCourse.description,
    level: validated.level ?? existingCourse.level,
    language: validated.language ?? existingCourse.language,
    duration: validated.duration ?? existingCourse.duration,
  };

  // 5️⃣ آپدیت جدول courses
  const result = await db
    .update(courses)
    .set(updateData)
    .where(
      and(eq(courses.id, courseId), eq(courses.instructorId, session.user.id))
    )
    .returning({
      id: courses.id,
      title: courses.title,
      slug: courses.slug,
      description: courses.description,
      thumbnailUrl: courses.thumbnailUrl,
      price: courses.price,
      status: courses.status,
      isPublished: courses.isPublished,
      level: courses.level,
      language: courses.language,
      duration: courses.duration,
    });

  // 6️⃣ مدیریت دسته‌بندی‌ها (پاک و درج مجدد)
  const selectedCategoryIds = validated.category ?? [];

  await db
    .delete(courseCategories)
    .where(eq(courseCategories.courseId, courseId));

  if (selectedCategoryIds.length > 0) {
    const insertCategories = selectedCategoryIds.map((categoryId) => ({
      courseId,
      categoryId,
    }));
    await db.insert(courseCategories).values(insertCategories);
  }
  const categories = await db.query.categories.findMany({
    where: (cat) =>
      sql`${cat.id} IN (SELECT category_id FROM course_categories WHERE course_id = ${courseId})`,
  });

  return {
    success: true,
    message: "✅ دوره با موفقیت ویرایش شد",
    data: {
      ...result[0],
      categories,
    },
  };
}
export type DeleteCourseResponse =
  | { success: boolean; message: string; data?: undefined }
  | { success: boolean; message: string; data: { id: string } };
export async function deleteCourse(
  courseId: string
): Promise<DeleteCourseResponse> {
  try {
    const result = await db
      .delete(courses)
      .where(eq(courses.id, courseId)) // استفاده از eq به صورت تابع
      .returning({ id: courses.id });

    if (result.length === 0) {
      return { success: false, message: "دوره‌ای با این آی‌دی پیدا نشد." };
    }

    return {
      success: true,
      message: "دوره با موفقیت حذف شد.",
      data: result[0],
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "خطا در حذف دوره." };
  }
}
