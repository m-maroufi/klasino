import type { Session } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    // گرفتن سشن از API با فچ عادی
    const res = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
      method: "GET",
      headers: {
        cookie: request.headers.get("cookie") || "", // فوروارد کردن کوکی‌های Better Auth
      },
      cache: "no-store", // جلوگیری از کش شدن (خیلی مهم برای سشن)
    });

    if (!res.ok) {
      console.error("Failed to fetch session:", res.status);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const session: Session | null = await res.json();

    // اگه کاربر لاگین نیست
    if (!session?.user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const role = session.user.role;
    const path = request.nextUrl.pathname;

    // نقش admin فقط به مسیرهای /admin دسترسی داره
    if (path.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // نقش instructor فقط به مسیرهای /instructor دسترسی داره
    if (path.startsWith("/instructor") && role !== "instructor") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // نقش student فقط به مسیرهای /student دسترسی داره
    if (path.startsWith("/student") && role !== "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/instructor/:path*", "/student/:path*"],
};
