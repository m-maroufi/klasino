export interface BreadcrumbsItem {
  href: string;
  label: string;
}

const labelMapRecord: Record<string, string> = {
  course: "دوره‌ها",
  blog: "وبلاگ",
  about: "درباره ما",
  contact_us: "تماس با ما",
  dashboard: "پنل کاربری",
  cart: "سبد خرید",
};

// نگاشت استاتیک برای دوره‌ها (جایگزین API یا هوک)
const courseMap: Record<string, string> = {
  "آموزش-حرفه‌ای-جاوااسکریپت": "آموزش حرفه‌ای جاوااسکریپت",
  "آموزش-پایتون": "آموزش پایتون",
  // سایر دوره‌ها رو می‌تونید اینجا اضافه کنید
};

export function breadcrumbsGenerator(pathname: string): BreadcrumbsItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbsItem[] = [{ href: "/", label: "خانه" }];

  let currentPath = "";
  for (let index = 0; index < segments.length; index++) {
    currentPath += `/${segments[index]}`;
    const segment = segments[index];

    let label = labelMapRecord[segment];
    if (!label) {
      // بررسی نگاشت دوره‌ها
      label =
        courseMap[segment] || decodeURIComponent(segment).replace(/-/g, " ");
    }

    breadcrumbs.push({ label, href: currentPath });
  }

  return breadcrumbs;
}
