// menusDashboard.ts
import { MenuGroup } from "@/types/menu";
import {
  BarChart,
  BookOpen,
  Home,
  PlusCircle,
  Settings,
  User,
  Users,
} from "lucide-react";

export const menusDashboard: { [role: string]: MenuGroup[] } = {
  admin: [
    {
      groupLabel: "مدیریت سیستم",
      items: [
        {
          label: "Dashboard",
          fa_label: "داشبورد",
          path: "/admin",
          icon: Home,
        },
        {
          label: "Reports",
          fa_label: "گزارشات",
          path: "/admin/reports",
          icon: BarChart,
        },
      ],
    },
    {
      groupLabel: "مدیریت کاربران",
      items: [
        {
          label: "Management",
          fa_label: "مدیریتی",
          path: "/admin/management",
          subMenus: [
            {
              label: "Users",
              fa_label: "کاربران",
              path: "/admin/users",
              icon: Users,
            },
            {
              label: "Settings",
              fa_label: "تنظیمات",
              path: "/admin/settings",
              icon: Settings,
            },
          ],
        },
      ],
    },
  ],

  instructor: [
    {
      groupLabel: "مدرس",
      items: [
        {
          label: "Dashboard",
          fa_label: "داشبورد",
          path: "/instructor",
          icon: Home,
        },
        {
          label: "Students",
          fa_label: "دانشجویان",
          path: "/instructor/students",
          icon: Users,
        },
        {
          label: "Courses",
          fa_label: "دوره‌ها",
          path: "/instructor/courses",
          icon: BookOpen,
          subMenus: [
            {
              label: "My Courses",
              fa_label: "دوره‌های من",
              path: "/instructor/courses/my",
              icon: BookOpen,
            },
            {
              label: "Create Course",
              fa_label: "ایجاد دوره",
              path: "/instructor/courses/create",
              icon: PlusCircle,
            },
          ],
        },
      ],
    },
  ],

  user: [
    {
      groupLabel: "کاربری",
      items: [
        {
          label: "Dashboard",
          fa_label: "داشبورد",
          path: "/user",
          icon: Home,
        },
        {
          label: "Account",
          fa_label: "حساب کاربری",
          path: "/user/account",
          icon: User,
          subMenus: [
            {
              label: "Profile",
              fa_label: "پروفایل",
              path: "/user/profile",
              icon: User,
            },
            {
              label: "Settings",
              fa_label: "تنظیمات",
              path: "/user/settings",
              icon: Settings,
            },
          ],
        },
      ],
    },
  ],
};
