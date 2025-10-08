import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // console.log(session);

  if (!session?.user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  const role = session.user.role;
  const path = request.nextUrl.pathname;
  // const currentUrl = request.url;

  // نقش admin فقط به مسیرهای /admin دسترسی داره
  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // نقش instructor فقط به مسیرهای /instructor دسترسی داره
  if (path.startsWith("/instructor") && role !== "instructor") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // نقش student فقط به مسیرهای /user دسترسی داره
  if (path.startsWith("/student") && role !== "user") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// فقط روی روت‌های داشبورد اعمال بشه
export const config = {
  matcher: ["/admin/:path*", "/instructor/:path*", "/student/:path*"],
  runtime: "nodejs",
};
