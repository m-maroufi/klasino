import AsideSection from "@/components/marketing/Course/AsideSection";
import CommentsTab from "@/components/marketing/Course/CommentsTab";
import Tags from "@/components/marketing/Course/Tags";
import PaymentButton from "@/components/marketing/widget/PaymentButton";
import { BreadcrumbsLinks } from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpenText,
  DownloadCloud,
  Loader2,
  MessageCircleCode,
  Play,
  Timer,
} from "lucide-react";

export default function CourseDetailsPage() {
  return (
    <main className="min-h-screen mt-20">
      <section className="container">
        <BreadcrumbsLinks />
        <section className="wrapper flex flex-col md:flex-row gap-4">
          <AsideSection />
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
            <div className="content_html font-vazir font-normal text-gray-600">
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
              className="text-sm text-muted-foreground "
            >
              <TabsList
                variant="line"
                dir="rtl"
                className="sticky top-16 z-10 bg-white"
              >
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
                      <ul className="space-y-4">
                        <li className="space-y-2 border border-gray-300 p-4 rounded-lg">
                          <div className="list-box">
                            <div className="flex items-center gap-2">
                              <span>1. آشنایی با دوره و مدرس</span>
                              <Badge className="bg-blue-500/10 text-blue-500">
                                <Timer size={14} />
                                02:15
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" asChild>
                                <Badge className="bg-green-500/10 text-green-500 text-xs">
                                  <DownloadCloud size={14} />
                                  دانلود
                                </Badge>
                              </Button>

                              <Button variant="outline" asChild>
                                <Badge className="bg-amber-500/10 text-amber-500 text-xs">
                                  <Play size={14} />
                                  پخش آنلاین
                                </Badge>
                              </Button>
                            </div>
                          </div>
                        </li>
                        <li className="space-y-2 border border-gray-300 p-4 rounded-lg">
                          <div className="list-box">
                            <div className="flex items-center gap-2">
                              <span>2. نصب و راه اندازی پایتون و ابزارها</span>
                              <Badge className="bg-blue-500/10 text-blue-500">
                                <Timer size={14} />
                                02:15
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" asChild>
                                <Badge className="bg-green-500/10 text-green-500 text-xs">
                                  <DownloadCloud size={14} />
                                  دانلود
                                </Badge>
                              </Button>

                              <Button variant="outline" asChild>
                                <Badge className="bg-amber-500/10 text-amber-500 text-xs">
                                  <Play size={14} />
                                  پخش آنلاین
                                </Badge>
                              </Button>
                            </div>
                          </div>
                        </li>
                        <li className="space-y-2 border border-gray-300 p-4 rounded-lg">
                          <div className="list-box">
                            <div className="flex items-center gap-2">
                              <span>3. دیتا تایپ ها در پایتون</span>
                              <Badge className="bg-blue-500/10 text-blue-500">
                                <Timer size={14} />
                                02:15
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" asChild>
                                <Badge className="bg-green-500/10 text-green-500 text-xs">
                                  <DownloadCloud size={14} />
                                  دانلود
                                </Badge>
                              </Button>

                              <Button variant="outline" asChild>
                                <Badge className="bg-amber-500/10 text-amber-500 text-xs">
                                  <Play size={14} />
                                  پخش آنلاین
                                </Badge>
                              </Button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="reui-2">
                    <AccordionTrigger className="font-vazir">
                      بخش متوسطه
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-4">
                        <li className="space-y-2 border border-gray-300 p-4 rounded-lg">
                          <div className="list-box">
                            <div className="flex items-center gap-2">
                              <span>1. آشنایی با دوره و مدرس</span>
                              <Badge className="bg-blue-500/10 text-blue-500">
                                <Timer size={14} />
                                02:15
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" asChild>
                                <Badge className="bg-green-500/10 text-green-500 text-xs">
                                  <DownloadCloud size={14} />
                                  دانلود
                                </Badge>
                              </Button>

                              <Button variant="outline" asChild>
                                <Badge className="bg-amber-500/10 text-amber-500 text-xs">
                                  <Play size={14} />
                                  پخش آنلاین
                                </Badge>
                              </Button>
                            </div>
                          </div>
                        </li>
                        <li className="space-y-2 border border-gray-300 p-4 rounded-lg">
                          <div className="list-box">
                            <div className="flex items-center gap-2">
                              <span>2. نصب و راه اندازی پایتون و ابزارها</span>
                              <Badge className="bg-blue-500/10 text-blue-500">
                                <Timer size={14} />
                                02:15
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" asChild>
                                <Badge className="bg-green-500/10 text-green-500 text-xs">
                                  <DownloadCloud size={14} />
                                  دانلود
                                </Badge>
                              </Button>

                              <Button variant="outline" asChild>
                                <Badge className="bg-amber-500/10 text-amber-500 text-xs">
                                  <Play size={14} />
                                  پخش آنلاین
                                </Badge>
                              </Button>
                            </div>
                          </div>
                        </li>
                        <li className="space-y-2 border border-gray-300 p-4 rounded-lg">
                          <div className="list-box">
                            <div className="flex items-center gap-2">
                              <span>3. دیتا تایپ ها در پایتون</span>
                              <Badge className="bg-blue-500/10 text-blue-500">
                                <Timer size={14} />
                                02:15
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" asChild>
                                <Badge className="bg-green-500/10 text-green-500 text-xs">
                                  <DownloadCloud size={14} />
                                  دانلود
                                </Badge>
                              </Button>

                              <Button variant="outline" asChild>
                                <Badge className="bg-amber-500/10 text-amber-500 text-xs">
                                  <Play size={14} />
                                  پخش آنلاین
                                </Badge>
                              </Button>
                            </div>
                          </div>
                        </li>
                      </ul>
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
                <CommentsTab />
              </TabsContent>
            </Tabs>
            <Separator className="my-8" />
            {/* {تگ ها} */}
            <Tags />
          </section>
        </section>
      </section>
      <PaymentButton />
    </main>
  );
}
