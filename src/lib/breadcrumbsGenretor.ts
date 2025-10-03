export interface BreadcrumbsItem {
  href: string;
  label: string;
}

const labelMapRecord: Record<string, string> = {
  course: "دوره ها",
  blog: "وبلاگ",
  about: "درباره ما",
  contact_us: "تماس با ما",
  dashboard: "پنل کاربری",
};

export function breadcrumbsGenrator(pathname: string): BreadcrumbsItem[] {
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs: BreadcrumbsItem[] = [{ href: "/", label: "خانه" }];

  let currentPath = "";
  for (let index = 0; index < segments.length; index++) {
    currentPath += `/${segments[index]}`;
    const segment = segments[index];

    let label = labelMapRecord[segment];
    if (!label) {
      label = decodeURIComponent(segment).replace(/_/g, " ");
    }

    breadcrumbs.push({ label, href: currentPath });
  }

  return breadcrumbs;
}
