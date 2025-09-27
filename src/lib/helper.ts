export function formatPrice(price: number | null) {
  if (price === null) return "رایگان"; // یا هر متن دلخواه برای رایگان
  return new Intl.NumberFormat("en-IR").format(price);
}

// sleep function to simulate delay
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatDurationReadable(seconds: number): string {
  if (!seconds || seconds <= 0) {
    return "نامشخص";
  }
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  if (hrs > 0 && mins > 0) return `${hrs} ساعت و ${mins} دقیقه`;
  if (hrs > 0) return `${hrs} ساعت`;
  if (mins > 0) return `${mins} دقیقه`;
  return `${seconds} ثانیه`;
}
export function slugify(title: string): string {
  return title
    .toString()
    .normalize("NFD") // نرمال‌سازی
    .replace(/[\u0300-\u036f]/g, "") // حذف علائم اضافی
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, "") // نگه داشتن فارسی + انگلیسی + عدد
    .replace(/\s+/g, "-") // فاصله‌ها → -
    .replace(/-+/g, "-"); // چندتا - → یکی
}
