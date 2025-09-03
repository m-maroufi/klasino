import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDurationReadable, formatPrice } from "@/lib/helper";
import { CheckLine, TimerIcon, UserCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CourseStatusBadge } from "../widget/CourseStatusBadge";

type AsideSectionProps = {
  course: {
    title: string;
    status: "ongoing" | "completed" | "preorder";
    price: number | null;
    instructorName: string | null;
    level: string | null;
    duration: number | null;
    thumbnailUrl: string | null;
  };
};

const AsideSection = ({ course }: AsideSectionProps) => {
  return (
    <aside className="order-1 md:order-2 w-full md:w-1/3 p-4 md:sticky md:top-24 h-fit">
      <div className="head block md:hidden">
        <h3 className="font-semibold text-xl">{course.title}</h3>
        <CourseStatusBadge status={course.status} />
      </div>
      <div className="asid-img relative h-[20rem] w-full">
        <Image
          src={course.thumbnailUrl || "/placeholder.png"}
          alt="عکس دوره - پایتون"
          fill={true}
          className="absolute top-0 left-0 object-center h-full w-full"
        />
      </div>
      <Card className="teacher-info my-4 space-y-4 px-5">
        <CardHeader>
          <p className="font-bold text-2xl text-center py-3">
            {formatPrice(course.price)} تومان
          </p>
          <Button asChild className="w-full rounded-2xl font-medium shadow-md">
            <Link href="?">ثبت نام در دوره</Link>
          </Button>
        </CardHeader>
        <Separator className="my-1" />
        <CardContent className="space-y-3">
          <div className="space-y-2 flex flex-col gap-1">
            <span className="text-xs font-light">مدرس</span>
            <h4 className="flex items-center gap-2 text-sm px-2">
              <UserCheck2 size={"18"} />
              <b>{course.instructorName}</b>
            </h4>
          </div>
          <div className="space-y-2 flex flex-col gap-1">
            <span className="text-xs font-light">سطح دوره</span>
            <h4 className="flex items-center gap-2 text-sm px-2">
              <CheckLine size={"18"} />
              <b> {course.level || "جامع"}</b>
            </h4>
          </div>
          <div className="space-y-2 flex flex-col gap-1">
            <span className="text-xs font-light">مدت زمان دوره</span>
            <h4 className="flex items-center gap-2 text-sm px-2">
              <TimerIcon size={"18"} />
              <b className=" font-mono">
                {" "}
                {formatDurationReadable(course.duration || 0)}{" "}
              </b>
            </h4>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default AsideSection;
