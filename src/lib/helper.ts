export function formatPrice(price: number | null) {
  if (price === null || 0) return "رایگان"; // یا هر متن دلخواه برای رایگان
  return new Intl.NumberFormat("en-IR").format(price);
}

// sleep function to simulate delay
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function formatDurationReadable(minutes: number | null): string {
  if (!minutes || minutes <= 0) {
    return "نامشخص";
  }

  const hrs = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);

  if (hrs > 0 && mins > 0) return `${hrs} ساعت و ${mins} دقیقه`;
  if (hrs > 0) return `${hrs} ساعت`;
  if (mins > 0) return `${mins} دقیقه`;
  return "کمتر از یک دقیقه";
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
