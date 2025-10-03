import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/dashboard/layout/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { menusDashboard } from "@/config/menus";
import { auth, User } from "@/lib/auth";
import { MenuGroup } from "@/types/menu";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
interface SessionData {
  user: User;
  menus: MenuGroup[];
}
async function getSessionData(): Promise<SessionData | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  }); // مستقیم از Better Auth

  if (!session?.user) {
    return null;
  }

  const role = session.user.role;
  return {
    user: session.user,
    menus: menusDashboard[role] || [],
  };
}
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionData = await getSessionData();

  if (!sessionData) {
    redirect("/");
  }

  const user = sessionData.user;
  const menus = sessionData.menus;
  return (
    <section dir="rtl">
      <section className="flex min-h-screen bg-sidebar">
        <SidebarProvider dir="rtl" className="">
          <AppSidebar menus={menus} user={user} />
          <main className="flex-1 bg-white">
            <DashboardHeader />
            <div className="p-4">{children}</div>
          </main>
        </SidebarProvider>
      </section>
    </section>
  );
}
