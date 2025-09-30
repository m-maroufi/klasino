"use server";
import { sleep } from "@/lib/helper";
import { count, desc, eq } from "drizzle-orm";
import db from "./index";
import { categories, courses, purchases, users } from "./schema";
export async function getAllCourses(limit: number = 12) {
  await sleep(1500); // simulate delay
  return db
    .select({
      courseId: courses.id,
      title: courses.title,
      slug: courses.slug,
      thumbnailUrl: courses.thumbnailUrl,
      price: courses.price,
      isPublished: courses.isPublished,
      instructorName: users.name,
    })
    .from(courses)
    .leftJoin(users, eq(users.id, courses.instructorId))
    .orderBy(desc(courses.createdAt))
    .limit(limit);
}

export async function getCourseBySlug(slug: string) {
  // decode URL-encoded slug
  const decodedSlug = decodeURIComponent(slug);

  // join دستی با instructor
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
      purchasesCount: count(purchases.id).as("purchasesCount"), // ✅ درستش اینه
    })
    .from(courses)
    .leftJoin(users, eq(users.id, courses.instructorId))
    .leftJoin(purchases, eq(purchases.courseId, courses.id))
    .where(eq(courses.slug, decodedSlug))
    .groupBy(courses.id, users.id) // مهم برای count درست
    .limit(1);

  if (result.length === 0) {
    throw new Error("Course not found");
  }

  return result[0];
}

export async function getCategories() {
  // console.log("cod");
  // const result = await db.select().from(categories);
  // console.log(result);

  return db.select().from(categories).orderBy(desc(categories.createdAt));
}
