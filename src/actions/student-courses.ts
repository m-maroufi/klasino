"use server";

import db from "@/db";
import { courses, purchases, users } from "@/db/schema"; // ✅ users اضافه شد
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { z } from "zod";

const StudentCourseSchema = z.object({
  courseId: z.string(),
  title: z.string(),
  slug: z.string(),
  thumbnailUrl: z.string().nullable(),
  price: z.number().nullable(),
  status: z.string(),
  isPublished: z.boolean(),
  instructorId: z.string(),
  createdAt: z.date(),
  instructorName: z.string().nullable(), // ✅ ممکنه خالی باشه
});

export type StudentCourse = z.infer<typeof StudentCourseSchema>;

/**
 * 📦 اکشن برای گرفتن لیست دوره‌های خریداری‌شده دانش‌آموز
 * - چک Auth با Better Auth
 * - join با courses و users برای آوردن instructorName
 * - cache شدن نتیجه برای هر کاربر
 */
export const getStudentCourses = cache(async (): Promise<StudentCourse[]> => {
  // مرحله ۱: بررسی Auth
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/");
  }

  const userId = session.user.id;

  try {
    // مرحله ۲: کوئری با join به courses و users
    const result = await db
      .select({
        courseId: courses.id,
        title: courses.title,
        slug: courses.slug,
        thumbnailUrl: courses.thumbnailUrl,
        price: courses.price,
        status: courses.status,
        isPublished: courses.isPublished,
        instructorId: courses.instructorId,
        createdAt: courses.createdAt,
        instructorName: users.name, // ✅ گرفتن اسم مدرس از جدول users
      })
      .from(purchases)
      .innerJoin(courses, eq(purchases.courseId, courses.id))
      .leftJoin(users, eq(users.id, courses.instructorId)) // ✅ join برای نام مدرس
      .where(
        and(eq(purchases.userId, userId), eq(purchases.paymentStatus, "paid"))
      );

    // مرحله ۳: اعتبارسنجی خروجی
    const safeResult = result.map((item) => StudentCourseSchema.parse(item));

    return safeResult;
  } catch (err) {
    console.error("❌ خطا در getStudentCourses:", err);
    throw new Error("مشکلی در دریافت دوره‌ها پیش آمد. لطفاً دوباره تلاش کنید.");
  }
});
