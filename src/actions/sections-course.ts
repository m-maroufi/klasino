"use server";

import db from "@/db";
import { sections } from "@/db/schema";
import { eq } from "drizzle-orm";

// گرفتن همه سکشن‌های یک دوره
export async function getSections(courseId: string) {
  return await db.query.sections.findMany({
    where: (s, { eq }) => eq(s.courseId, courseId),
    orderBy: (s, { asc }) => [asc(s.order)],
  });
}

// ایجاد سکشن جدید
export async function createSection(data: {
  courseId: string;
  title: string;
  description?: string;
}) {
  // آخرین order رو پیدا کن
  const lastSection = await db.query.sections.findFirst({
    where: (s, { eq }) => eq(s.courseId, data.courseId),
    orderBy: (s, { desc }) => [desc(s.order)],
  });

  const nextOrder = lastSection ? lastSection.order + 1 : 1;

  const result = await db
    .insert(sections)
    .values({
      ...data,
      order: nextOrder,
    })
    .returning();

  return result[0];
}
export async function deleteSection(sectionId: string) {
  await db.delete(sections).where(eq(sections.id, sectionId));
}
