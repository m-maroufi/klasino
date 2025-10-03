"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useLessons } from "@/hooks/useLessons";
import { useSection } from "@/hooks/useSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const createLessonSchema = z.object({
  title: z
    .string("عنوان نمی‌تواند خالی باشد")
    .min(3, "عنوان ویدئو حداقل باید 3 کاراکتر باشد"),
  duration: z.string("زمان نمی‌تواند خالی باشد").refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num > 0;
    },
    {
      message: "مدت زمان باید یک عدد مثبت باشد",
    }
  ),
  isPreview: z.boolean().default(false).optional(),
  videoUrl: z.url("لطفا آدرس ویدئوی درس را وارد کنید"),
  sectionId: z.string(),
});
type CreateLessonFormType = z.infer<typeof createLessonSchema>;

const ManageLessons = ({
  courseId,
  courseTitle,
}: {
  courseId: string;
  courseTitle: string | undefined | null;
}) => {
  const { data: sections, isLoading } = useSection({ courseId: courseId! });
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  if (isLoading) return <p>در حال بارگذاری سرفصل‌ها...</p>;

  return (
    <div className="p-4" dir="rtl">
      <h2 className="text-xl font-bold mb-4">
        مدیریت دروس برای دوره:{" "}
        <span className="bg-accent p-1">{courseTitle}</span>
      </h2>
      <p>
        در این بخش می‌توانید دروس خود را مدیریت کنید. ابتدا باید سرفصل‌ها را
        اضافه کرده باشید سپس می‌توانید برای هر سرفصل دروس مربوطه را اضافه کنید.
      </p>

      <Card className="border-dashed border-2 my-6 p-6">
        {}
        <Accordion
          type="single"
          collapsible
          className="w-full border rounded-2xl overflow-hidden "
        >
          {sections && sections.length === 0 && (
            <p className="text-muted-foreground p-3">
              ابتدا باید سرفصل‌ها را اضافه کنید سپس می‌توانید برای هر سرفصل دروس
              مربوطه را اضافه کنید.
            </p>
          )}

          {sections &&
            sections.length > 0 &&
            sections.map((section) => {
              const {
                data: lessons,
                addLesson,
                deleteLesson,
              } = useLessons({
                sectionId: section.id,
              });

              // فرم مربوط به هر سکشن
              const form = useForm<CreateLessonFormType>({
                resolver: zodResolver(createLessonSchema),
                defaultValues: {
                  title: "",
                  videoUrl: "",
                  isPreview: false,
                  duration: "",
                  sectionId: section.id,
                },
              });

              const onSubmitHandler = async (values: CreateLessonFormType) => {
                try {
                  await addLesson.mutateAsync({
                    ...values,
                    duration: Number(values.duration),
                  });
                  form.reset({ sectionId: section.id });
                  setActiveSectionId(null);
                } catch (error) {
                  console.error(error);
                }
              };
              const onDeletedHandler = async (lessonId: string) => {
                setLoading(true);
                try {
                  await deleteLesson.mutateAsync(lessonId);
                } catch (error) {
                  console.error(error);
                } finally {
                  setLoading(false);
                }
              };

              return (
                <AccordionItem
                  key={section.id}
                  value={`section-${section.id}`}
                  className="border-b"
                >
                  <AccordionTrigger className="font-bold text-xl underline-none hover:no-underline bg-gray-100 px-3">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground p-4">
                    {/* لیست دروس این سرفصل */}
                    {lessons && lessons.length > 0 ? (
                      <ul className="flex flex-col gap-3">
                        {lessons.map((lesson, index) => (
                          <li
                            key={lesson.id}
                            className="border-dashed border-2 rounded-2xl p-3 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-4">
                              <div className="border-r-2 w-14 h-14 bg-amber-400 flex flex-col justify-center items-center rounded-tr-2xl rounded-br-2xl text-white font-black text-3xl">
                                {index + 1}
                              </div>
                              <div className="flex items-center gap-4">
                                <div>
                                  <h3 className="font-bold">{lesson.title}</h3>
                                  {lesson.duration && (
                                    <p className="text-sm text-muted-foreground">
                                      مدت زمان: {lesson.duration} دقیقه
                                    </p>
                                  )}
                                </div>
                                {lesson.isPreview && (
                                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-lg">
                                    پیش‌نمایش
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button
                              variant={"ghost"}
                              size={"icon"}
                              disabled={loading}
                              onClick={() => {
                                onDeletedHandler(lesson.id);
                              }}
                              className="mt-2 hover:bg-transparent text-red-500 hover:text-red-700"
                            >
                              {loading ? (
                                <Loader2Icon className="animate-spin" />
                              ) : (
                                "حذف"
                              )}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground p-3">
                        هنوز درسی برای این سرفصل اضافه نشده است.
                      </p>
                    )}

                    {/* دکمه افزودن درس */}
                    <Button
                      className={`mt-4 ${
                        activeSectionId === section.id
                          ? "bg-red-700 hover:bg-red-600"
                          : ""
                      }`}
                      onClick={() =>
                        setActiveSectionId((prev) =>
                          prev === section.id ? null : section.id
                        )
                      }
                    >
                      {activeSectionId === section.id
                        ? "بستن فرم"
                        : "افزودن درس جدید"}
                    </Button>

                    {activeSectionId === section.id && (
                      <Card className="p-4 mt-4 border-dashed border-2">
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmitHandler)}
                            className="flex flex-col gap-6"
                          >
                            <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>عنوان درس</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="عنوان درس را کوتاه وارد کنید"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="duration"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>مدت زمان ویدئو (دقیقه)</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="زمان بر حسب دقیقه"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="videoUrl"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>آدرس اینترنتی ویدئو</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="لینک ویدئو را وارد کنید"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="isPreview"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center rounded-lg border p-3 shadow-sm">
                                  <div className="space-y-0.5">
                                    <FormLabel>این درس رایگان است؟</FormLabel>
                                  </div>
                                  <FormControl>
                                    <div className="flex items-center gap-2 mr-4">
                                      <span>بله</span>
                                      <Switch
                                        dir="ltr"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                      <span>خیر</span>
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <Button
                              type="submit"
                              className=" mt-2"
                              disabled={
                                form.formState.isSubmitting ||
                                form.formState.isLoading
                              }
                            >
                              {form.formState.isSubmitting ||
                              form.formState.isLoading
                                ? "در حال ارسال..."
                                : "ایجاد درس"}
                            </Button>
                          </form>
                        </Form>
                      </Card>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
        </Accordion>
      </Card>
    </div>
  );
};

export default ManageLessons;
