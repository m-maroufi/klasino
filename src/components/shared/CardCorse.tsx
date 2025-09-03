import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/helper";
import Link from "next/link";
type Props = {
  course: {
    courseId: string;
    title: string;
    slug: string;
    thumbnailUrl: string | null;
    price: number | null;
    isPublished: boolean;
    instructorName: string | null;
  };
};

export function CardCourse({ course }: Props) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
        <Link href={"/course/" + course.slug}>
          <img
            src={course.thumbnailUrl || "/placeholder.png"}
            alt="Product Image"
            width={600}
            height={400}
            className="w-full h-64 object-cover"
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          />
        </Link>
        <div className="p-4 space-y-2">
          <Link href={"/course/" + course.slug}>
            <h3 className="text-xl font-semibold"> {course.title}</h3>
          </Link>
          <p className="text-gray-500 dark:text-gray-400">
            مدرس : <span> {course.instructorName}</span>
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">
              <span> {formatPrice(course.price)} </span>
              تومان
            </span>
            <Button>شرکت در دوره</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
