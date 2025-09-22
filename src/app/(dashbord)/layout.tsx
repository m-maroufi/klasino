import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "@/lib/auth";
import { MenuGroup, MenuItem } from "@/types/menu";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
interface SessionData {
  user: User;
  menus: MenuGroup[];
}
async function getSessionData(): Promise<SessionData | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/session`,
    {
      headers: await headers(),
      cache: "force-cache",
    }
  );
  if (!response.ok) {
    return null;
  }
  return await response.json();
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
          <main className="flex-1 p-6 bg-white">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </section>
    </section>
  );
}
