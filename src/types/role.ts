type Role = "admin" | "instructor" | "user";

export const roleLabels: Record<Role, string> = {
  admin: "ادمین",
  instructor: "مدرس",
  user: "دانشجو",
};

export function getRoleLabel(role: string): string {
  return roleLabels[role as Role] || "کاربر";
}
