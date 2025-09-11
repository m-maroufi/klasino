import db from "@/db";
import { courses, lessons, sections } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params; // await کردن context برای استخراج params
  const decodedSlug = decodeURIComponent(slug); // حالا می‌توانید به params.slug دسترسی پیدا کنید
  try {
    // پیدا کردن course id
    const courseRow = await db
      .select({ id: courses.id })
      .from(courses)
      .where(eq(courses.slug, decodedSlug))
      .limit(1);

    if (!courseRow || courseRow.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    const courseId = courseRow[0].id;

    // گرفتن سکشن‌ها و لسن‌ها با مرتب‌سازی در DB
    const rows = await db
      .select({
        sectionId: sections.id,
        sectionTitle: sections.title,
        sectionOrder: sections.order,
        lessonId: lessons.id,
        lessonTitle: lessons.title,
        lessonDuration: lessons.duration,
        lessonOrder: lessons.order,
        videoUrl: lessons.videoUrl,
        isPreview: lessons.isPreview,
      })
      .from(sections)
      .leftJoin(lessons, eq(sections.id, lessons.sectionId))
      .where(eq(sections.courseId, courseId))
      .orderBy(asc(sections.order), asc(lessons.order));

    // استفاده از Map برای group کردن
    const sectionMap = new Map<string, any>();

    rows.forEach((row) => {
      if (!sectionMap.has(row.sectionId)) {
        sectionMap.set(row.sectionId, {
          id: row.sectionId,
          title: row.sectionTitle,
          order: row.sectionOrder,
          lessons: [],
        });
      }

      if (row.lessonId) {
        sectionMap.get(row.sectionId).lessons.push({
          id: row.lessonId,
          title: row.lessonTitle ?? "",
          duration: row.lessonDuration ?? null,
          order: row.lessonOrder ?? 0,
          videoUrl: row.videoUrl ?? null,
          isPreview: !!row.isPreview,
        });
      }
    });

    // تبدیل Map به آرایه
    const structured = Array.from(sectionMap.values());

    return NextResponse.json(structured);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
