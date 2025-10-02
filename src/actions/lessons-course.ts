"use server";

import db from "@/db";
import { lessons } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export async function getLessonsBySectionId(sectionId: string) {
  const sectionLessons = await db.query.lessons.findMany({
    where: eq(lessons.sectionId, sectionId), // فقط درس‌های اون سکشن
    orderBy: asc(lessons.order), // مرتب بر اساس order
  });

  return sectionLessons;
}

export async function createLesson(data: {
  title: string;
  sectionId: string;
  duration?: number;
  videoUrl: string;
  isPreview?: boolean;
}) {
  // پیدا کردن آخرین order در اون سکشن
  const lastLesson = await db.query.lessons.findFirst({
    where: eq(lessons.sectionId, data.sectionId),
    orderBy: (l, { desc }) => [desc(l.order)],
  });

  const nextOrder = lastLesson ? lastLesson.order + 1 : 1;

  const result = await db
    .insert(lessons)
    .values({
      ...data,
      order: nextOrder,
    })
    .returning();

  return result[0];
}

export async function deleteLesson(lessonId: string) {
  await db.delete(lessons).where(eq(lessons.id, lessonId));
}
