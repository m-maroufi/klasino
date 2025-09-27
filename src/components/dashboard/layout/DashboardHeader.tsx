"use client";
import { signOut } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const DashboardHeader = () => {
  async function handleLogout(event: React.FormEvent) {
    event.preventDefault();
    const result = await signOut();
    if (result.success) {
      redirect("/"); // Redirect to home page after logout
    } else {
      console.error("Logout failed:");
      toast.error("خطا در خروج از حساب کاربری. لطفا دوباره تلاش کنید.");
    }
  }
  return (
    <div className="flex items-center justify-between px-4 h-14 border-b border-gray-200 sticky top-0 bg-white z-10">
      <SidebarTrigger />

      <form action="" onSubmit={handleLogout}>
        <Button
          type="submit"
          variant="outline"
          size="sm"
          className="cursor-pointer"
        >
          <LogOut className="size-4 ml-2" />
          خروج
        </Button>
      </form>
    </div>
  );
};

export default DashboardHeader;
