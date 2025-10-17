"use server";
import { discounts } from "@/db/schema";
import { count, desc, eq, sql } from "drizzle-orm";
import db from "./index";
import { categories, courses, purchases, reviews, users } from "./schema";

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

// ✅ Type خروجی تابع
export type InstructorCourse = {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string | null;
  price: number | null;
  isPublished: boolean;
  status: string;
  createdAt: Date;
  instructorName: string | null;
  students_count: number;
  average_rating: number;
};

export async function getCoursesByInstructor(
  instructorId: string
): Promise<InstructorCourse[]> {
  try {
    const instructorCourses = await db
      .select({
        id: courses.id,
        title: courses.title,
        slug: courses.slug,
        thumbnailUrl: courses.thumbnailUrl,
        price: courses.price,
        isPublished: courses.isPublished,
        status: courses.status,
        createdAt: courses.createdAt,
        instructorName: users.name,
        students_count: sql<number>`COUNT(DISTINCT ${purchases.userId})`.as(
          "students_count"
        ),
        average_rating: sql<number>`COALESCE(AVG(${reviews.rating}), 0)`.as(
          "average_rating"
        ),
      })
      .from(courses)
      .leftJoin(users, eq(users.id, courses.instructorId))
      .leftJoin(purchases, eq(purchases.courseId, courses.id))
      .leftJoin(reviews, eq(reviews.courseId, courses.id))
      .where(eq(courses.instructorId, instructorId))
      .groupBy(courses.id, users.name)
      .orderBy(courses.createdAt);

    return instructorCourses;
  } catch (error) {
    console.error("❌ Error fetching instructor courses:", error);
    return [];
  }
}

export async function getCourseById(id: string) {
  try {
    // 1️⃣ گرفتن اطلاعات اصلی دوره
    const course = await db.query.courses.findFirst({
      where: eq(courses.id, id),
      with: {
        // 2️⃣ گرفتن دسته‌بندی‌های مرتبط (اختیاری)
        courseCategories: {
          with: {
            category: true,
          },
        },
      },
    });

    // 3️⃣ بررسی وجود دوره
    if (!course) {
      return {
        success: false,
        message: "دوره پیدا نشد.",
        data: null,
      };
    }

    // 4️⃣ آماده‌سازی خروجی نهایی
    return {
      success: true,
      message: "✅ دوره با موفقیت دریافت شد.",
      data: {
        id: course.id,
        title: course.title,
        slug: course.slug,
        price: course.price,
        description: course.description,
        thumbnailUrl: course.thumbnailUrl,
        status: course.status,
        isPublished: course.isPublished,
        level: course.level,
        language: course.language,
        duration: course.duration,
        // دسته‌بندی‌ها
        categories:
          course.courseCategories?.map((cc) => ({
            id: cc.category.id,
            name: cc.category.name,
            slug: cc.category.slug,
          })) ?? [],
      },
    };
  } catch (error) {
    console.error("❌ Error in getCourseById:", error);
    return {
      success: false,
      message: "خطایی در دریافت اطلاعات دوره رخ داد.",
      data: null,
    };
  }
}

export async function checkDiscountCode(code: string) {
  try {
    const discount = await db
      .select()
      .from(discounts)
      .where(eq(discounts.code, code))
      .limit(1);

    if (discount.length === 0) {
      return {
        success: false,
        statusCode: 404,
        discount: null,
      };
    }
    return {
      success: false,
      statusCode: 200,
      discount: discount[0],
    }; // { id, code, discountAmount, userId, createdAt, updatedAt }
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      discount: null,
    };
  }
}
