import { BreadcrumbsLinks } from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpenText,
  CheckLine,
  Loader2,
  MessageCircleCode,
  ShieldCheck,
  TimerIcon,
  UserCheck2,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CourseDetailsPage() {
  return (
    <main className="min-h-screen mt-20">
      <section className="container">
        <BreadcrumbsLinks />
        <section className="wrapper flex flex-col md:flex-row gap-4">
          <aside className="order-1 md:order-2 w-full md:w-1/3 p-4">
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
                <p className="font-bold text-2xl text-center py-3">
                  2,480,000 تومان
                </p>
                <Button
                  asChild
                  className="w-full rounded-2xl font-medium shadow-md"
                >
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
          <section className="Content order-2 md:order-2 w-full md:w-2/3 p-4">
            <div className="head hidden md:block">
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
            <div className="content_html font-vazir font-normal ">
              اگر شما هم قصد یادگیری زبان همه کاره پایتون را دارید، مسیر درستی
              را انتخاب کرده اید. فرقی نمی کند که ابتدای راه باشید یا نیمه های
              مسیر، دوره آموزش پایتون (python) یک تجربه یادگیری گام به گام را
              ارائه می دهد که هم مفاهیم پایه و هم مفاهیم پیشرفته را پوشش می دهد.
              در این راهنمای جامع، ما به بررسی چیستی پایتون، کاربرد های آن،
              ویژگی ‌های کلیدی، پیش نیاز ها، بازار کار، مهارت‌ های تکمیلی، آینده
              پایتون و ... خواهیم پرداخت. در طول دوره نیز، پروژه‌ هایی عملی برای
              تقویت مهارت‌ های شما ارائه می شود.
            </div>
            <Separator className="my-4" />
            <Tabs
              defaultValue="profile"
              className="text-sm text-muted-foreground"
            >
              <TabsList variant="line" dir="rtl">
                <TabsTrigger value="profile">
                  <BookOpenText /> سرفصل ها
                </TabsTrigger>
                <TabsTrigger value="security">
                  <MessageCircleCode /> نظرات و پرسش ها
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile" dir="rtl">
                <Accordion
                  type="single"
                  variant="outline"
                  collapsible
                  className="w-full"
                >
                  <AccordionItem value="reui-1">
                    <AccordionTrigger className="font-vazir">
                      بخش مقدماتی
                    </AccordionTrigger>
                    <AccordionContent>
                      ReUI provides ready-to-use CRUD examples for developers.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="reui-2">
                    <AccordionTrigger className="font-vazir">
                      بخش مقدماتی
                    </AccordionTrigger>
                    <AccordionContent>
                      Developers looking to save time with pre-built CRUD
                      solutions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="reui-3">
                    <AccordionTrigger className="font-vazir">
                      بخش مقدماتی
                    </AccordionTrigger>
                    <AccordionContent>
                      ReUI simplifies development with plug-and-play CRUDs.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
              <TabsContent value="security" dir="rtl">
                Content for Security
              </TabsContent>
            </Tabs>
          </section>
        </section>
      </section>
      <section
        className="payments  bottom-app-bar fixed bottom-0 left-0 w-full h-16 
  bg-amber-100/10 backdrop-blur-xs border-t border-white/20 
  z-50 flex md:hidden justify-center items-center shadow-[0_-4px_30px_rgba(0,0,0,0.1)]"
      >
        <div className="container px-4">
          <Button asChild className="w-full rounded-2xl font-medium shadow-md">
            <Link href="?">ثبت نام در دوره</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
