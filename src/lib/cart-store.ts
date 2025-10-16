import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// نوع دوره آموزشی
export interface CourseItem {
  id: string;
  title: string;
  slug: string;
  price: number | null;
  instructor: string | null;
  image?: string | null; // URL تصویر دوره
}
interface ICartStore {
  items: CourseItem[];
  addItem: (course: CourseItem) => { success: boolean; message: string };
  removeItem: (id: string) => { success: boolean; message: string };
  clearCart: () => { success: boolean; message: string };
  totalPrice: number;
  itemCount: number;
}
// ایجاد store
export const useCartStore = create<ICartStore>()(
  persist(
    (set, get) => ({
      items: [],
      // محاسبه مجموع قیمت
      totalPrice: 0,

      // تعداد دوره‌ها
      itemCount: 0,
      addItem: (newCourse: CourseItem) => {
        const existingCourse = get().items.find(
          (item) => item.id === newCourse.id
        );

        if (existingCourse) {
          return {
            success: false,
            message: "این دوره از قبل در سبد خرید شما موجود است",
          };
        }

        const updatedItems = [...get().items, newCourse];
        set({
          items: updatedItems,
          totalPrice: updatedItems.reduce(
            (sum, course) => sum + (course.price ?? 0),
            0
          ),
          itemCount: updatedItems.length,
        });

        return {
          success: true,
          message: "دوره با موفقیت به سبد خرید شما اضافه شد",
        };
      },

      removeItem: (id: string) => {
        const updatedItems = get().items.filter((item) => item.id !== id);
        set({
          items: updatedItems,
          totalPrice: updatedItems.reduce(
            (sum, course) => sum + (course.price ?? 0),
            0
          ),
          itemCount: updatedItems.length,
        });
        return {
          success: true,
          message: "دوره با موفقیت از سبد خرید حذف شد.",
        };
      },

      clearCart: () => {
        set({
          items: [],
          totalPrice: 0,
          itemCount: 0,
        });
        return {
          success: true,
          message: "سبد خرید پاک شد",
        };
      },
    }),
    {
      name: "cart-storage-courses",
      storage: createJSONStorage(() => localStorage),
      // بعد از هر تغییر، totalPrice و itemCount رو آپدیت کن
      onRehydrateStorage: () => (state) => {
        if (state) {
          const items = state.items as CourseItem[];
          state.totalPrice = items.reduce(
            (sum, course) => sum + (course.price ?? 0),
            0
          );
          state.itemCount = items.length;
        }
      },
    }
  )
);
