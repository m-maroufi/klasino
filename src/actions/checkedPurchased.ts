"use server";

import db from "@/db";
import { courses, purchases, users } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function userCheckedCoursePurchased(courseId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return false;
  }
  const userId = session.user.id;
  const [coursePurchased] = await db
    .select()
    .from(purchases)
    .where(and(eq(purchases.userId, userId), eq(purchases.courseId, courseId)))
    .limit(1); // فقط اولین مورد

  return !!coursePurchased; //
}

export interface CourseItem {
  id: string;
  title: string;
  slug: string;
  price: number | null;
  instructor: string | null;
  image?: string | null;
}

export async function getPurchaseCourseWithUserId(
  userId: string
): Promise<CourseItem[]> {
  const purchasedCourses = await db
    .select({
      id: courses.id,
      title: courses.title,
      slug: courses.slug,
      price: courses.price,
      instructorName: users.name, // join با جدول users برای نام استاد
      thumbnailUrl: courses.thumbnailUrl,
    })
    .from(purchases)
    .leftJoin(courses, eq(courses.id, purchases.courseId))
    .leftJoin(users, eq(users.id, courses.instructorId))
    .where(eq(purchases.userId, userId));

  return purchasedCourses
    .filter((course) => course.id && course.title && course.slug) // فقط رکوردهای معتبر
    .map((course) => ({
      id: course.id!,
      title: course.title!,
      slug: course.slug!,
      price: course.price ?? 0,
      instructor: course.instructorName ?? null,
      image: course.thumbnailUrl ?? null,
    }));
}
