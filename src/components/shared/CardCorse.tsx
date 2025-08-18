import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CardCourse() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
        <Link href={"/"}>
          <img
            src="/placeholder.png"
            alt="Product Image"
            width={600}
            height={400}
            className="w-full h-64 object-cover"
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          />
        </Link>
        <div className="p-4 space-y-2">
          <Link href={"/"}>
            <h3 className="text-xl font-semibold">دوره تلویند</h3>
          </Link>
          <p className="text-gray-500 dark:text-gray-400">
            مدرس : <span> مجید حیدری</span>
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">
              <span> 2,400,000 </span>
              تومان
            </span>
            <Button>افزودن به سبد خرید</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
