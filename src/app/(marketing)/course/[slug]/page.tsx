import AsideSection from "@/components/marketing/Course/AsideSection";
import CommentsTab from "@/components/marketing/Course/CommentsTab";
import Tags from "@/components/marketing/Course/Tags";
import { CourseStatusBadge } from "@/components/marketing/widget/CourseStatusBadge";
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
import { getCourseBySlug } from "@/db/queries";

import {
  BookOpenText,
  DownloadCloud,
  MessageCircleCode,
  Play,
  Timer,
} from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CourseDetailsPage({ params }: Props) {
  const { slug } = await params;
  // Fetch course details using the slug if needed
  const course = await getCourseBySlug(slug);
  console.log("course:", course);
  return (
    <main className="min-h-screen mt-20">
      <section className="container">
        <BreadcrumbsLinks />
        <section className="wrapper flex flex-col md:flex-row gap-4">
          <AsideSection course={course} />
          <section className="Content order-2 md:order-2 w-full md:w-2/3 p-4">
            <div className="head hidden md:block">
              <h3 className="font-semibold text-xl">{course.title}</h3>
              <CourseStatusBadge status={course.status} />
            </div>
            <div className="content_html font-vazir font-normal text-gray-600">
              {course.description}
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
