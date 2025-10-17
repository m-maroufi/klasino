import db from "@/db";
import { orders, payments, purchases } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trackId = searchParams.get("trackId");
  const status = searchParams.get("status");
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  // 🧩 بررسی مقادیر اولیه
  if (!orderId || !trackId) {
    console.error("❌ Missing orderId or trackId in callback");
    return NextResponse.redirect(
      new URL("/payment?status=invalid", process.env.NEXT_PUBLIC_BASE_URL!)
    );
  }

  // ❌ پرداخت لغو‌شده توسط کاربر
  if (success !== "1") {
    await Promise.all([
      db.update(orders).set({ status: "failed" }).where(eq(orders.id, orderId)),
      db
        .update(payments)
        .set({ status: "failed", message: "پرداخت لغو شد" })
        .where(eq(payments.orderId, orderId)),
    ]);

    return NextResponse.redirect(
      new URL("/payment?status=failed", process.env.NEXT_PUBLIC_BASE_URL!)
    );
  }

  try {
    // تأیید پرداخت از زیبال
    const verifyResponse = await fetch("https://gateway.zibal.ir/v1/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchant: "zibal",
        trackId,
      }),
    });
    console.log(verifyResponse);

    const data = await verifyResponse.json();
    if (data.result === 100) {
      // ✅ پرداخت موفق
      await Promise.all([
        db.update(orders).set({ status: "paid" }).where(eq(orders.id, orderId)),
        db
          .update(payments)
          .set({
            status: "paid",
            refId: String(data.refNumber ?? ""),
            message: data.message ?? "موفق",
          })
          .where(eq(payments.orderId, orderId)),
      ]);
      const [order] = await db
        .select()
        .from(orders)
        .where(eq(orders.id, orderId))
        .execute();

      if (order) {
        const parsedItems = JSON.parse(order.items); // parsedItems: { items: [...] }

        // حالا cartItems خودش array هست
        const cartItems = parsedItems.items;

        console.log(cartItems); // [ { courseId: "...", price: 7900000 } ]
        const purchaseData = cartItems.map(
          (course: { courseId: string; price: number }) => ({
            userId: order.userId,
            courseId: course.courseId,
            pricePaid: course.price,
            paymentStatus: "paid" as const,
            paymentProvider: "zibal",
          })
        );

        await db.insert(purchases).values(purchaseData);
      }

      return NextResponse.redirect(
        new URL("/payment?status=success", process.env.NEXT_PUBLIC_BASE_URL!)
      );
    } else {
      // ❌ پرداخت ناموفق
      await Promise.all([
        db
          .update(orders)
          .set({ status: "failed" })
          .where(eq(orders.id, orderId)),
        db
          .update(payments)
          .set({
            status: "failed",
            message: data.message ?? "خطا در پرداخت",
          })
          .where(eq(payments.orderId, orderId)),
      ]);
      return NextResponse.redirect(
        new URL("/payment?status=failed", process.env.NEXT_PUBLIC_BASE_URL!)
      );
    }
  } catch (error) {
    console.error("خطا در تأیید پرداخت:", error);
    // 🧯 در صورت بروز خطای سرور
    await Promise.all([
      db.update(orders).set({ status: "failed" }).where(eq(orders.id, orderId)),
      db
        .update(payments)
        .set({ status: "failed", message: "خطا در تأیید پرداخت" })
        .where(eq(payments.orderId, orderId)),
    ]);
    return NextResponse.redirect(
      new URL(
        "/payment?status=failed_server",
        process.env.NEXT_PUBLIC_BASE_URL!
      )
    );
  }
}
