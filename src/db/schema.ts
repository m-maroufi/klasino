import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// ========== ENUMS ==========
export const userRoleEnum = pgEnum("user_role", [
  "student",
  "instructor",
  "admin",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "paid",
  "failed",
]);
export const courseStatusEnum = pgEnum("course_status", [
  "ongoing",
  "completed",
  "preorder",
]);

// ========== USERS ==========
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  role: text("role").default("student").notNull(),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

// ========== SESSION ==========
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

// ========== ACCOUNT ==========
export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// ========== VERIFICATION ==========
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// ========== COURSES ==========
export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  price: integer("price"),
  isPublished: boolean("is_published").default(false).notNull(),
  level: varchar("level", { length: 20 }),
  language: varchar("language", { length: 50 }),
  duration: integer("duration"),
  status: courseStatusEnum("status").default("ongoing").notNull(),
  instructorId: text("instructor_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ========== SECTIONS ==========
export const sections = pgTable("sections", {
  id: uuid("id").primaryKey().defaultRandom(),

  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ========== LESSONS ==========
export const lessons = pgTable("lessons", {
  id: uuid("id").primaryKey().defaultRandom(),

  sectionId: uuid("section_id")
    .notNull()
    .references(() => sections.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  videoUrl: text("video_url").notNull(),
  duration: integer("duration"),
  isPreview: boolean("is_preview").default(false).notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ========== PURCHASES ==========
export const purchases = pgTable("purchases", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  pricePaid: integer("price_paid").notNull(),
  paymentStatus: paymentStatusEnum("payment_status")
    .default("pending")
    .notNull(),
  paymentProvider: varchar("payment_provider", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ========== PROGRESS ==========
export const progress = pgTable(
  "progress",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    isCompleted: boolean("is_completed").default(false).notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [unique("user_lesson_unique").on(table.userId, table.lessonId)]
);

// ========== ORDERS ==========
export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  totalAmount: integer("total_amount").notNull(), // مجموع مبلغ سبد خرید
  discountAmount: integer("discount_amount").default(0).notNull(), // تخفیف احتمالی
  finalAmount: integer("final_amount").notNull(), // مبلغ نهایی پس از تخفیف

  status: paymentStatusEnum("status").default("pending").notNull(), // وضعیت سفارش (pending | paid | failed)

  // اگر خواستی آیتم‌ها رو در JSON نگه داری (برای حفظ snapshot از سبد خرید)
  items: text("items").notNull(), // JSON.stringify(cartItems)

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// ========== PAYMENTS ==========
export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),

  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),

  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  provider: varchar("provider", { length: 50 }).notNull(), // مثلا "zibal"
  amount: integer("amount").notNull(),

  status: paymentStatusEnum("status").default("pending").notNull(),

  authority: varchar("authority", { length: 100 }), // شناسه تراکنش در درگاه
  refId: varchar("ref_id", { length: 100 }), // کد رهگیری نهایی درگاه
  message: text("message"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// ========== REVIEWS ==========
export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ========== CATEGORIES ==========
export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ========== COURSE_CATEGORIES ==========
export const courseCategories = pgTable(
  "course_categories",
  {
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      name: "course_categories_pk",
      columns: [table.courseId, table.categoryId],
    }),
  ]
);

// جدول discounts
export const discounts = pgTable("discounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull().unique(), // کد تخفیف (مثل "summer20")
  discountAmount: integer("discount_amount").notNull(), // میزان تخفیف (مثل 20 برای 20%)
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // کاربر ایجادکننده
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// روابط
export const discountRelations = relations(discounts, ({ one }) => ({
  user: one(users, {
    fields: [discounts.userId],
    references: [users.id],
  }),
}));
// ================= RELATIONS =================

// --- User relations ---
export const userRelations = relations(users, ({ many }) => ({
  courses: many(courses),
  purchases: many(purchases),
  reviews: many(reviews),
}));

// --- Course relations ---
export const courseRelations = relations(courses, ({ one, many }) => ({
  instructor: one(users, {
    fields: [courses.instructorId],
    references: [users.id],
  }),
  sections: many(sections),
  courseCategories: many(courseCategories),
  purchases: many(purchases),
  reviews: many(reviews),
}));

// --- Section relations ---
export const sectionRelations = relations(sections, ({ one, many }) => ({
  course: one(courses, {
    fields: [sections.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

// --- Lesson relations ---
export const lessonRelations = relations(lessons, ({ one }) => ({
  section: one(sections, {
    fields: [lessons.sectionId],
    references: [sections.id],
  }),
}));

// --- Category relations ---
export const categoryRelations = relations(categories, ({ many }) => ({
  courseCategories: many(courseCategories),
}));

// --- CourseCategory (pivot table) relations ---
export const courseCategoryRelations = relations(
  courseCategories,
  ({ one }) => ({
    course: one(courses, {
      fields: [courseCategories.courseId],
      references: [courses.id],
    }),
    category: one(categories, {
      fields: [courseCategories.categoryId],
      references: [categories.id],
    }),
  })
);

// --- Purchase relations ---
export const purchaseRelations = relations(purchases, ({ one }) => ({
  user: one(users, {
    fields: [purchases.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [purchases.courseId],
    references: [courses.id],
  }),
}));

// --- Review relations ---
export const reviewRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [reviews.courseId],
    references: [courses.id],
  }),
}));

// --- Order relations ---
export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  payments: many(payments),
}));

// --- Payment relations ---
export const paymentRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
}));
