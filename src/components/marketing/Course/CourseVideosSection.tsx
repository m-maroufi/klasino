"use client";
import LessonCourseSklaton from "@/components/shared/LessonCourseSklaton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCourseVideos } from "@/hooks/useCourseVideos";
import { formatDurationReadable } from "@/lib/helper";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // shadcn Dialog
import { DownloadCloud, Play, Timer } from "lucide-react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "sonner";
const CourseVideosSection = ({ slug }: { slug: string }) => {
  const { data, isLoading, error } = useCourseVideos(slug);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [selectedLessonTitle, setSelectedLessonTitle] = useState<string | null>(
    null
  );
  if (isLoading) return <LessonCourseSklaton />;
  if (error) return <p>خطا در بارگذاری ویدئوها</p>;
  console.log(data);

  function playerHandler(lessonTitle: string, lessenUrl: string | null) {
    setSelectedLessonTitle(lessonTitle);
    setSelectedVideoUrl(lessenUrl);
    setIsModalOpen(true);
  }

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className=" h-fit" dir="rtl">
          <DialogHeader>
            <DialogTitle className="font-vazir text-center">
              {selectedLessonTitle}
            </DialogTitle>
          </DialogHeader>
          {selectedVideoUrl && (
            <div className="aspect-video h-fit">
              <ReactPlayer
                src={selectedVideoUrl}
                controls
                controlsList="false"
                width="100%"
                height="100%"
                onError={(e) => toast.error("خطا در پخش ویدیو")}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Accordion type="single" collapsible className="w-full">
        {data?.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger className="font-vazir">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-4">
                {section.lessons.map((lesson, index) => (
                  <li
                    key={lesson.id}
                    className="space-y-2 border border-gray-300 p-4 rounded-lg"
                  >
                    <div className="list-box">
                      <div className="flex items-center gap-2">
                        <span>
                          {index + 1}. {lesson.title}
                        </span>
                        <Badge className="bg-blue-500/10 text-blue-500">
                          <Timer size={14} />
                          {/* می‌تونی از فانکشن durationReadable استفاده کنی */}
                          {formatDurationReadable(lesson.duration || 0)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={lesson.videoUrl ?? undefined}
                          download={`${lesson.order}-${lesson.title.replace(
                            /[/\\?%*:|"<>]/g,
                            "-"
                          )}.mp4`}
                        >
                          <Button variant="outline" asChild>
                            <Badge className="bg-green-500/10 text-green-500 text-xs">
                              <DownloadCloud size={14} />
                              دانلود
                            </Badge>
                          </Button>
                        </a>

                        <Button
                          variant="outline"
                          asChild
                          onClick={() => {
                            if (lesson.isPreview) {
                              playerHandler(lesson.title, lesson.videoUrl);
                            } else {
                              toast.error(
                                "برای مشاهده باید ابتدا دوره را خریداری کنید",
                                {
                                  richColors: true,
                                }
                              );
                            }
                          }}
                        >
                          <Badge className="bg-amber-500/10 text-amber-500 text-xs">
                            <Play size={14} />
                            پخش آنلاین
                          </Badge>
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default CourseVideosSection;
