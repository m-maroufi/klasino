import { TitleSection } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Plus } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <TitleSection title="داشبورد مدرس" />
      <div className="mt-4 p-4 bg-green-300/50 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-sm font-semibold mb-2">
          به داشبورد مدرس خوش آمدید!
        </h2>
        <p className="text-gray-600 text-xs">
          از اینجا می‌توانید دوره‌ها، بخش‌ها و درس‌های خود را مدیریت کنید.
        </p>
      </div>
      <section className="intro grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-linear-to-r from-green-600 to-green/10  border border-gray-200 rounded-lg shadow-sm">
          <div className="head flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
              دوره‌ها
            </h3>
            <h5 className="scale-150 font-black text-white">29</h5>
          </div>
          <div className="btn flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/instructor/courses/create`}
                  className="border border-gray-200 rounded-lg p-2 inline-flex items-center hover:bg-gray-100 transition"
                >
                  <Plus className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>ایجاد دوره جدید</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/instructor/view-course`}
                  className="border border-gray-200 rounded-lg p-2 inline-flex items-center hover:bg-gray-100 transition"
                >
                  <Eye className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>ایجاد دوره جدید</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="p-4 bg-linear-to-r from-purple-700 to-purple/10 border border-gray-200 rounded-lg shadow-sm">
          <div className="head flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
              دانشجویان
            </h3>
            <h5 className="scale-150 font-black text-white">1234</h5>
          </div>
          <div className="btn flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/instructor/students`}
                  className="border border-gray-200 rounded-lg p-2 inline-flex items-center hover:bg-gray-100 transition"
                >
                  <Eye className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>مشاهده دانشجویان</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="p-4 bg-linear-to-r from-orange-600 to-orange/10  border border-gray-200 rounded-lg shadow-sm">
          <div className="head flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
              درآمد کل
            </h3>
            <h5 className="font-black text-lg text-white">25,000,000 تومان</h5>
          </div>
          <div className="btn flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/instructor/create-course`}
                  className="border border-gray-200 rounded-lg p-2 inline-flex items-center hover:bg-gray-100 transition"
                >
                  <Plus className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>ایجاد دوره جدید</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/instructor/view-course`}
                  className="border border-gray-200 rounded-lg p-2 inline-flex items-center hover:bg-gray-100 transition"
                >
                  <Eye className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>ایجاد دوره جدید</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </section>
      <section className="review my-5">
        <Card>
          <CardHeader>
            <CardTitle>نظرات اخیر دانشجویان</CardTitle>
            <CardDescription>
              نظراتی که دانشجویان در دوره‌های شما گذاشته‌اند
            </CardDescription>
            <Separator className="my-4" />
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            <div className="comments space-y-4">
              <Card className="">
                <CardHeader className="mb-2">
                  <CardTitle className="text-sm font-semibold">
                    محمد حسینی
                  </CardTitle>
                  <CardDescription className="text-xs">
                    15 مهر 1403 - دوره React برای مبتدیان
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    دوره بسیار مفید و کاربردی بود. از مدرس بابت توضیحات کامل و
                    مثال‌های عملی تشکر می‌کنم.
                  </p>
                </CardContent>
                <CardFooter>
                  <CardAction>
                    <Button>پاسخ دادن</Button>
                  </CardAction>
                </CardFooter>
              </Card>
              <Card className="">
                <CardHeader className="mb-2">
                  <CardTitle className="text-sm font-semibold">
                    محمد حسینی
                  </CardTitle>
                  <CardDescription className="text-xs">
                    15 مهر 1403 - دوره React برای مبتدیان
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    دوره بسیار مفید و کاربردی بود. از مدرس بابت توضیحات کامل و
                    مثال‌های عملی تشکر می‌کنم.
                  </p>
                </CardContent>
                <CardFooter>
                  <CardAction>
                    <Button>پاسخ دادن</Button>
                  </CardAction>
                </CardFooter>
              </Card>
              <Card className="">
                <CardHeader className="mb-2">
                  <CardTitle className="text-sm font-semibold">
                    محمد حسینی
                  </CardTitle>
                  <CardDescription className="text-xs">
                    15 مهر 1403 - دوره React برای مبتدیان
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    دوره بسیار مفید و کاربردی بود. از مدرس بابت توضیحات کامل و
                    مثال‌های عملی تشکر می‌کنم.
                  </p>
                </CardContent>
                <CardFooter>
                  <CardAction>
                    <Button>پاسخ دادن</Button>
                  </CardAction>
                </CardFooter>
              </Card>
              <Card className="">
                <CardHeader className="mb-2">
                  <CardTitle className="text-sm font-semibold">
                    محمد حسینی
                  </CardTitle>
                  <CardDescription className="text-xs">
                    15 مهر 1403 - دوره React برای مبتدیان
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    دوره بسیار مفید و کاربردی بود. از مدرس بابت توضیحات کامل و
                    مثال‌های عملی تشکر می‌کنم.
                  </p>
                </CardContent>
                <CardFooter>
                  <CardAction>
                    <Button>پاسخ دادن</Button>
                  </CardAction>
                </CardFooter>
              </Card>
              <Card className="">
                <CardHeader className="mb-2">
                  <CardTitle className="text-sm font-semibold">
                    محمد حسینی
                  </CardTitle>
                  <CardDescription className="text-xs">
                    15 مهر 1403 - دوره React برای مبتدیان
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    دوره بسیار مفید و کاربردی بود. از مدرس بابت توضیحات کامل و
                    مثال‌های عملی تشکر می‌کنم.
                  </p>
                </CardContent>
                <CardFooter>
                  <CardAction>
                    <Button>پاسخ دادن</Button>
                  </CardAction>
                </CardFooter>
              </Card>
              <Card className="">
                <CardHeader className="mb-2">
                  <CardTitle className="text-sm font-semibold">
                    محمد حسینی
                  </CardTitle>
                  <CardDescription className="text-xs">
                    15 مهر 1403 - دوره React برای مبتدیان
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    دوره بسیار مفید و کاربردی بود. از مدرس بابت توضیحات کامل و
                    مثال‌های عملی تشکر می‌کنم.
                  </p>
                </CardContent>
                <CardFooter>
                  <CardAction>
                    <Button>پاسخ دادن</Button>
                  </CardAction>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
