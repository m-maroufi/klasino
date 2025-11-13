"use server";

import db from "@/db";
import { users } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

// ✅ گرفتن اطلاعات کاربر
export async function getUserProfile() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/");

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!user) throw new Error("کاربر یافت نشد");

  // اطلاعات حساسی مثل password حذف می‌شن
  const { id, name, email, image } = user;
  return { id, name, email, image };
}

// ✅ ویرایش نام کاربر
export async function updateUserName(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/");

  const newName = formData.get("name")?.toString().trim();
  if (!newName) throw new Error("نام نمی‌تواند خالی باشد.");

  await db
    .update(users)
    .set({ name: newName })
    .where(eq(users.id, session.user.id));

  return { success: true };
}

// // ✅ تغییر رمز عبور
// export async function changePassword(formData: FormData) {
//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session?.user) redirect("/");

//   const currentPassword = formData.get("currentPassword")?.toString();
//   const newPassword = formData.get("newPassword")?.toString();

//   if (!currentPassword || !newPassword) {
//     throw new Error("رمز فعلی و جدید الزامی است.");
//   }

//   const user = await db.query.users.findFirst({
//     where: eq(users.id, session.user.id),
//   });

//   if (!user?.password) throw new Error("کاربر رمز عبور ندارد.");

//   const match = await bcrypt.compare(currentPassword, user.password);
//   if (!match) throw new Error("رمز فعلی اشتباه است.");

//   const hashed = await bcrypt.hash(newPassword, 10);

//   await db
//     .update(users)
//     .set({ password: hashed })
//     .where(eq(users.id, session.user.id));

//   return { success: true };
// }
