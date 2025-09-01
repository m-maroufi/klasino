import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckLine, Loader2, TimerIcon, UserCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AsideSection = () => {
  return (
    <aside className="order-1 md:order-2 w-full md:w-1/3 p-4 md:sticky md:top-24 h-fit">
      <div className="head block md:hidden">
        <h3 className="font-semibold text-xl">
          آموزش رایگان پایتون (python) - از مقدماتی تا پیشرفته
        </h3>
        <Badge
          variant="secondary"
          className="bg-green-500/50 my-4 text-green-800 dark:bg-green-500"
        >
          <Loader2 />
          درحال برگزاری
        </Badge>
      </div>
      <div className="asid-img relative h-[20rem] w-full">
        <Image
          src={
            "https://codeyad.com/_ipx/f_webp&q_100/codeyad/assets/images/Courses/e606cd76-2d81-4503-8c4a-d95c0d83fc63.webp"
          }
          alt="عکس دوره - پایتون"
          fill={true}
          className="absolute top-0 left-0 object-center h-full w-full"
        />
      </div>
      <Card className="teacher-info my-4 space-y-4 px-5">
        <CardHeader>
          <p className="font-bold text-2xl text-center py-3">2,480,000 تومان</p>
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
              <b>امیرحسین مقصودی</b>
            </h4>
          </div>
          <div className="space-y-2 flex flex-col gap-1">
            <span className="text-xs font-light">سطح دوره</span>
            <h4 className="flex items-center gap-2 text-sm px-2">
              <CheckLine size={"18"} />
              <b> مقدماتی تا پیشرفته</b>
            </h4>
          </div>
          <div className="space-y-2 flex flex-col gap-1">
            <span className="text-xs font-light">مدت زمان دوره</span>
            <h4 className="flex items-center gap-2 text-sm px-2">
              <TimerIcon size={"18"} />
              <b className=" font-mono"> 25 : 10 </b>
            </h4>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default AsideSection;
