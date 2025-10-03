"use server";
import { count, desc, eq } from "drizzle-orm";
import db from "./index";
import { categories, courses, purchases, users } from "./schema";

export async function getAllCourses(limit: number = 12) {
  try {
    const result = await db
      .select({
        courseId: courses.id,
        title: courses.title,
        slug: courses.slug,
        thumbnailUrl: courses.thumbnailUrl,
        price: courses.price,
        isPublished: courses.isPublished,
        instructorName: users.name,
        instructorId: users.id,
      })
      .from(courses)
      .leftJoin(users, eq(users.id, courses.instructorId))
      .orderBy(desc(courses.createdAt))
      .limit(limit);

    return result;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return []; // برمیگردونه یه آرایه خالی به جای کرش
  }
}

export async function getCourseBySlug(slug: string) {
  try {
    const decodedSlug = decodeURIComponent(slug);

    const result = await db
      .select({
        id: courses.id,
        title: courses.title,
        slug: courses.slug,
        description: courses.description,
        thumbnailUrl: courses.thumbnailUrl,
        price: courses.price,
        isPublished: courses.isPublished,
        level: courses.level,
        language: courses.language,
        duration: courses.duration,
        createdAt: courses.createdAt,
        updatedAt: courses.updatedAt,
        instructorName: users.name,
        instructorId: users.id,
        status: courses.status,
        purchasesCount: count(purchases.id).as("purchasesCount"),
      })
      .from(courses)
      .leftJoin(users, eq(users.id, courses.instructorId))
      .leftJoin(purchases, eq(purchases.courseId, courses.id))
      .where(eq(courses.slug, decodedSlug))
      .groupBy(courses.id, users.id)
      .limit(1);

    if (result.length === 0) {
      return null; // به جای throw
    }

    return result[0];
  } catch (error) {
    console.error("Error fetching course by slug:", error);
    return null; // به جای کرش
  }
}

export async function getCategories() {
  try {
    return await db
      .select()
      .from(categories)
      .orderBy(desc(categories.createdAt));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // آرایه خالی اگر مشکل اتصال پیش آمد
  }
}
