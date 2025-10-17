"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCourseVideos } from "@/hooks/useCourseVideos"; // هوک برای گرفتن داده‌های ویدیوها
import { useCartStore } from "@/lib/cart-store";
import { formatDurationReadable, formatPrice } from "@/lib/helper"; // فرض بر این است که formatDurationReadable اصلاح‌شده است
import { CheckCircle, Timer, UserCheck } from "lucide-react"; // آیکون‌های مدرن‌تر و رنگی
import Image from "next/image";
import { toast } from "sonner";
import { CourseStatusBadge } from "../widget/CourseStatusBadge";

type AsideSectionProps = {
  course: {
    id: string;
    title: string;
    status: "ongoing" | "completed" | "preorder";
    price: number | null;
    instructorName: string | null;
    level: string | null;
    thumbnailUrl: string | null;
    slug: string;
  };
  checkedPurchased: boolean;
};

// تعریف تایپ‌ها برای بخش‌ها و درس‌ها (از کد قبلی کپی شده)
interface Lesson {
  id: string;
  title: string;
  videoUrl: string | null;
  duration: number | null;
  isPreview: boolean;
  order: number;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

// فانکشن محاسبه زمان کل دوره بر اساس مجموع زمان ویدیوها (بر حسب دقیقه)
function calculateTotalDuration(sections: Section[] | undefined): number {
  if (!sections) return 0;
  return sections.reduce((total, section) => {
    return (
      total +
      section.lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0)
    );
  }, 0);
}

const AsideSection = ({ course, checkedPurchased }: AsideSectionProps) => {
  const { addItem } = useCartStore((state) => state);
  const { data: sections, isLoading: videosLoading } = useCourseVideos(
    course.slug
  ); // گرفتن داده‌های ویدیوها
  const totalDuration = calculateTotalDuration(sections); // محاسبه زمان کل بر اساس ویدیوها
  const addToCartHandler = () => {
    const result = addItem({
      id: course.id,
      slug: course.slug,
      title: course.title,
      instructor: course.instructorName,
      price: course.price,
      image: course.thumbnailUrl,
    });
    if (result.success) {
      toast.success(`${result.message}`, {
        richColors: true,
      });
      return;
    } else {
      toast.warning(`${result.message}`, {
        richColors: true,
      });
      return;
    }
  };
  return (
    <aside className="order-1 md:order-2 w-full md:w-1/3 p-4 md:sticky md:top-24 h-fit bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="head block md:hidden mb-4">
        <h3 className="font-medium text-xl text-gray-800">{course.title}</h3>
        <CourseStatusBadge status={course.status} />
      </div>
      <div className="relative h-48 sm:h-64 w-full rounded-lg overflow-hidden shadow-lg mb-4">
        <Image
          src={course.thumbnailUrl || "/placeholder.png"}
          alt={`عکس دوره - ${course.title}`}
          fill
          className="object-cover transform transition-transform duration-500 hover:scale-105"
        />
      </div>
      <Card className="teacher-info space-y-4 bg-white rounded-lg shadow-inner">
        <CardHeader className="text-center">
          <p className="font-mikhak font-bold text-2xl text-indigo-600 py-3">
            {formatPrice(course.price)} تومان
          </p>
          {checkedPurchased ? (
            <Button className="w-full rounded-full font-vazir font-medium bg-green-500 hover:bg-green-600 text-white shadow-md transition-all duration-200">
              شما دانشجوی دوره هستید
            </Button>
          ) : (
            <Button
              onClick={() => addToCartHandler()}
              className="w-full rounded-full font-vazir font-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-md transition-all duration-200"
            >
              افزودن دوره به سبد خرید
            </Button>
          )}
        </CardHeader>
        <Separator className="my-2 bg-gray-200" />
        <CardContent className="space-y-4 px-4">
          <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg shadow-sm">
            <UserCheck size={20} className="text-blue-500" />
            <div>
              <span className="text-xs font-vazir font-light text-gray-600">
                مدرس
              </span>
              <h4 className="font-vazir text-sm text-gray-800 font-semibold">
                {course.instructorName || "نامعلوم"}
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg shadow-sm">
            <CheckCircle size={20} className="text-green-500" />
            <div>
              <span className="text-xs font-vazir font-light text-gray-600">
                سطح دوره
              </span>
              <h4 className="font-vazir text-sm text-gray-800 font-semibold">
                {course.level || "جامع"}
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-lg shadow-sm">
            <Timer size={20} className="text-amber-500" />
            <div>
              <span className="text-xs font-vazir font-light text-gray-600">
                مدت زمان دوره
              </span>
              <h4 className=" text-sm text-gray-800 font-semibold font-mono">
                {videosLoading
                  ? "در حال محاسبه..."
                  : formatDurationReadable(totalDuration)}
              </h4>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default AsideSection;
