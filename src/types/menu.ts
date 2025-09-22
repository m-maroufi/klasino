// types/menu.ts
import { LucideIcon } from "lucide-react";

export interface MenuItem {
  label: string; // نام انگلیسی
  fa_label: string; // نام فارسی
  path: string; // مسیر
  icon?: LucideIcon; // آیکون
  permissions?: string[];
  subMenus?: MenuItem[];
}

export interface MenuGroup {
  groupLabel: string; // عنوان گروه
  items: MenuItem[]; // آیتم‌های داخل گروه
}
