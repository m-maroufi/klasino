"use client";
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
import { Textarea } from "@/components/ui/textarea";
import { useSection } from "@/hooks/useSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface ManageSectionsProps {
  courseId: string | undefined;
  courseTitle?: string | null;
}

interface Section {
  id: string;
  title: string;
  order: number;
  description?: string | null;
}
const sectionSchema = z.object({
  title: z.string("سرفصل نمیتواند خالی باشد").min(1, "عنوان الزامی است"),
  description: z.string().optional(),
});

type SectionFormData = z.infer<typeof sectionSchema>;
const ManageSections = ({ courseId, courseTitle }: ManageSectionsProps) => {
  const form = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema),
    defaultValues: { title: "", description: "" },
  });
  const { data, isLoading, addSection, deleteSectionById } = useSection({
    courseId: courseId!,
  });
  const [showForm, setShowForm] = useState(false);
  const onSubmitHandler = async (values: SectionFormData) => {
    if (!courseId) return;
    addSection.mutate({
      title: values.title,
      description: values.description,
      courseId: courseId,
    });
    form.reset();
    setShowForm(false);
  };
  const onDeleteHandler = (id: string) => {
    deleteSectionById.mutate(id);
  };
  return (
    <div className="p-4" dir="rtl">
      <h2 className="text-xl font-bold mb-4">
        مدیریت سرفصل‌ها برای دوره:{" "}
        <span className="bg-accent p-1">{courseTitle}</span>
      </h2>
      <p>
        ابتدا سرفصل های مورد نظر خود را اضافه کنید سپس به تب درس ها بروید و برای
        هر فصل دروس را پلود کنید
      </p>

      <Card className="border-dashed border-2 my-6 p-6">
        {isLoading ? (
          <h3>درحال بارگزاری ...</h3>
        ) : (
          <>
            {/* لیست سرفصل‌ها */}
            {data && data.length > 0 && (
              <ul className="flex flex-col gap-4 mb-6">
                {data.map((section: Section, i: number) => (
                  <li
                    key={section.id}
                    className="border-dashed border-2 h-16 rounded-2xl bg-gray-200/40 flex items-center gap-4"
                  >
                    <div className="border-r-2 w-14 h-full bg-amber-400 flex flex-col justify-center items-center rounded-tr-2xl rounded-br-2xl text-white font-black text-3xl">
                      {i + 1}
                    </div>
                    <div className="px-4 py-2 flex items-center justify-between w-full">
                      <div>
                        <h3 className="font-bold md:text-lg">
                          {section.title}
                        </h3>
                        {section.description && (
                          <p className="text-sm text-muted-foreground">
                            {section.description}
                          </p>
                        )}
                      </div>
                      <Button
                        asChild
                        variant={"ghost"}
                        size={"icon"}
                        className="mt-2 hover:bg-transparent text-red-500 hover:text-red-700"
                        onClick={() => onDeleteHandler(section.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* فرم اینلاین */}
            {showForm && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmitHandler)}
                  className="flex flex-col gap-4 p-4 border rounded-xl bg-gray-50"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان سرفصل</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="عنوان فصل را کوتاه وارد کنید"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>توضیحات کوتاه</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={
                        form.formState.isSubmitting || form.formState.isLoading
                      }
                      className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
                    >
                      {form.formState.isSubmitting || form.formState.isLoading
                        ? "درحال ارسال ..."
                        : "افزودن سرفصل"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        form.reset();
                      }}
                      className="px-4 py-2 bg-gray-300 rounded"
                    >
                      انصراف
                    </button>
                  </div>
                </form>
              </Form>
            )}

            {/* دکمه افزودن سرفصل */}
            {!showForm && (
              <div className="flex flex-col items-center justify-center p-10">
                {(!data || data.length === 0) && (
                  <p className="mb-2">هیچ سرفصلی برای این دوره وجود ندارد.</p>
                )}
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
                >
                  افزودن سرفصل جدید
                </button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default ManageSections;
