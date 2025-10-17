import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // بررسی احراز هویت
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "لطفاً وارد حساب کاربری شوید" },
        { status: 401 }
      );
    }
    // چک کردن بادی درخواست
    const body = await request.json();
    console.log(body);

    // ارسال درخواست به زیبال برای ایجاد درگاه پرداخت

    const zibalResopnse = await fetch("https://gateway.zibal.ir/v1/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchant: "zibal",
        amount: body.pricePayment,
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/callback`,
        description: "خرید دوره از کلاسینو",
        orderId: body.orderId,
      }),
    });
    const zibalRsult = await zibalResopnse.json(); // 👈 حالا اینجا تبدیل میشه به JSON واقعی
    console.log(zibalRsult);
    if (zibalRsult.result == 100) {
      return NextResponse.json({
        success: true,
        trackId: zibalRsult.trackId,
        message: zibalRsult.message,
        zibalPaymentUrl: `https://gateway.zibal.ir/start/${zibalRsult.trackId}`,
      });
    }
    return NextResponse.json({
      success: false,
      message: "پاسخی از درگاه پرداخت یافت نشد",
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "خطای سرور - لطفا با پشتبانی تماس بگیرید.",
    });
  }
}
