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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookOpen, DownloadCloud, Lock, Play, Timer } from "lucide-react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "sonner";
import { formatDurationReadable } from "@/lib/helper";

// تعریف تایپ‌ها
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

interface CourseVideosSectionProps {
  slug: string;
  checkedPurchased: boolean;
}

const CourseVideosSection = ({
  slug,
  checkedPurchased,
}: CourseVideosSectionProps) => {
  const { data, isLoading, error } = useCourseVideos(slug);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [selectedLessonTitle, setSelectedLessonTitle] = useState<string | null>(
    null
  );

  // مدیریت حالت لودینگ و خطا
  if (isLoading) return <LessonCourseSklaton />;
  if (error)
    return (
      <p className="text-red-500 font-vazir text-center py-8 text-sm">
        خطا در بارگذاری ویدئوها
      </p>
    );

  // هندلر پخش ویدیو
  const handlePlayVideo = (lesson: Lesson) => {
    if (lesson.isPreview || checkedPurchased) {
      if (lesson.videoUrl) {
        setSelectedLessonTitle(lesson.title);
        setSelectedVideoUrl(lesson.videoUrl);
        setIsModalOpen(true);
      } else {
        toast.error("ویدیو در دسترس نیست", {
          richColors: true,
          duration: 3000,
        });
      }
    } else {
      toast.error("برای مشاهده باید ابتدا دوره را خریداری کنید", {
        richColors: true,
        duration: 3000,
      });
    }
  };

  // هندلر دانلود ویدیو
  const handleDownloadVideo = (lesson: Lesson) => {
    if (lesson.isPreview || checkedPurchased) {
      if (!lesson.videoUrl) {
        toast.error("ویدیو برای دانلود در دسترس نیست", {
          richColors: true,
          duration: 3000,
        });
      }
      return; // دانلود از طریق تگ <a> انجام می‌شود
    } else {
      toast.error("برای دانلود باید ابتدا دوره را خریداری کنید", {
        richColors: true,
        duration: 3000,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* دیالوگ پخش ویدیو */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="max-w-[90vw] sm:max-w-2xl h-fit bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg transition-all duration-300"
          dir="rtl"
        >
          <DialogHeader>
            <DialogTitle className="font-vazir text-lg sm:text-xl font-medium text-gray-800 text-center py-2">
              {selectedLessonTitle || "در حال بارگذاری..."}
            </DialogTitle>
          </DialogHeader>
          {selectedVideoUrl ? (
            <div className="aspect-video rounded-lg overflow-hidden shadow-md bg-gray-800">
              <ReactPlayer
                src={selectedVideoUrl}
                controls={true}
                width="100%"
                height="100%"
                onError={(error) => {
                  console.error("ReactPlayer Error:", error);
                  toast.error("خطا در پخش ویدیو", {
                    richColors: true,
                    duration: 3000,
                  });
                }}
              />
            </div>
          ) : (
            <div className="aspect-video flex items-center justify-center bg-gray-100 rounded-lg">
              <p className="font-vazir text-gray-500 text-sm">
                در حال بارگذاری ویدیو...
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* آکاردئون بخش‌ها */}
      <Accordion type="single" collapsible className="w-full space-y-3">
        {data?.map((section: Section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="border border-gray-100 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            <AccordionTrigger className="font-vazir text-base sm:text-lg font-medium text-gray-700 px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-2">
              <span className="flex-1 text-right">{section.title}</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 bg-gradient-to-b from-gray-50 to-white rounded-b-lg">
              <ul className="space-y-2">
                {section.lessons.map((lesson: Lesson, index: number) => (
                  <li
                    key={lesson.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white border border-gray-100 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    {/* اطلاعات درس */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-vazir text-gray-600 text-sm">
                        {index + 1}. {lesson.title}
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-600 font-vazir flex items-center gap-1 py-0.5 px-2 rounded-full text-xs"
                      >
                        <Timer size={12} />
                        {formatDurationReadable(lesson.duration)}
                      </Badge>
                      {lesson.isPreview && (
                        <Badge
                          variant="secondary"
                          className="bg-green-50 text-green-600 font-vazir flex items-center gap-1 py-0.5 px-2 rounded-full text-xs"
                        >
                          <BookOpen size={12} />
                          رایگان
                        </Badge>
                      )}
                    </div>

                    {/* دکمه‌های عملیات */}
                    <div className="flex items-center gap-2">
                      {(lesson.isPreview || checkedPurchased) &&
                      lesson.videoUrl ? (
                        <a
                          href={lesson.videoUrl}
                          download={`${lesson.order}-${lesson.title.replace(
                            /[/\\?%*:|"<>]/g,
                            "-"
                          )}.mp4`}
                          onClick={() => handleDownloadVideo(lesson)}
                        >
                          <Button
                            variant="ghost"
                            className="flex items-center gap-1 bg-green-50 text-green-600 hover:bg-green-100 font-vazir text-xs py-1 px-2.5 rounded-full transition-all duration-200"
                          >
                            <DownloadCloud size={14} />
                            دانلود
                          </Button>
                        </a>
                      ) : (
                        <Button
                          variant="ghost"
                          disabled
                          className="flex items-center gap-1 bg-gray-50 text-gray-400 font-vazir text-xs py-1 px-2.5 rounded-full cursor-not-allowed opacity-60"
                          onClick={() => handleDownloadVideo(lesson)}
                        >
                          <Lock size={14} />
                          دانلود
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        className="flex items-center gap-1 bg-amber-50 text-amber-600 hover:bg-amber-100 font-vazir text-xs py-1 px-2.5 rounded-full transition-all duration-200"
                        onClick={() => handlePlayVideo(lesson)}
                        disabled={
                          (!lesson.isPreview && !checkedPurchased) ||
                          !lesson.videoUrl
                        }
                      >
                        <Play size={14} />
                        پخش
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseVideosSection;
