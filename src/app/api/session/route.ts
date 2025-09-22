import { menusDashboard } from "@/config/menus";
import { auth, User } from "@/lib/auth";
import { MenuGroup, MenuItem } from "@/types/menu";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
interface SessionResponse {
  user: User;
  menus: MenuGroup[];
}
export async function GET(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  // اگر session وجود نداره
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const role = session.user.role;
  const response: SessionResponse = {
    user: session.user,
    menus: menusDashboard[role] || [],
  };
  const nextResponse = NextResponse.json(response);
  nextResponse.headers.set(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59"
  );
  return nextResponse;
}
