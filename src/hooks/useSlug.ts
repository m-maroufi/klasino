import { slugify } from "@/lib/helper";
import { useEffect, useState } from "react";

export function useSlug(title: string) {
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (title && title.trim().length > 0) {
      setSlug(slugify(title));
    } else {
      setSlug(""); // وقتی عنوان پاک شد → اسلاگ خالی
    }
  }, [title]);

  return slug;
}
