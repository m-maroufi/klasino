import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSection } from "@/hooks/useSection";
import { useState } from "react";
const ManageLessons = ({
  courseId,
  courseTitle,
}: {
  courseId: string;
  courseTitle: string | undefined | null;
}) => {
  const [showForm, setShowForm] = useState(false);
  const { data: sections, isLoading } = useSection({ courseId: courseId! });

  if (isLoading) return <p>در حال بارگذاری سرفصل‌ها...</p>;

  return (
    <div className="p-4" dir="rtl">
      <h2 className="text-xl font-bold mb-4">
        مدیریت دروس برای دوره:{" "}
        <span className="bg-accent p-1">{courseTitle}</span>
      </h2>
      <p>
        در این بخش میتوانید دروس خود را مدیریت کنید. ابتدا باید سرفصل‌ها را
        اضافه کرده باشید سپس میتوانید برای هر سرفصل دروس مربوطه را اضافه کنید.
      </p>
      <Card className="border-dashed border-2 my-6 p-6">
        <Accordion
          type="single"
          collapsible
          className="w-full border rounded-2xl overflow-hidden "
        >
          {sections && sections.length === 0 && (
            <p className="text-muted-foreground">
              ابتدا باید سرفصل‌ها را اضافه کنید سپس میتوانید برای هر سرفصل دروس
              مربوطه را اضافه کنید.
            </p>
          )}
          {sections &&
            sections.length > 0 &&
            sections.map((section, i) => (
              <AccordionItem
                key={section.id}
                value={`section-${section.id}`}
                className="border-b"
              >
                <AccordionTrigger className="font-bold text-xl underline-none hover:no-underline bg-gray-100 px-3">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground p-4">
                  {/* محتوای دروس این سرفصل */}
                  <p>اینجا میتوانید دروس مربوط به این سرفصل را مدیریت کنید.</p>
                  <Button
                    className={`mt-4 ${
                      showForm ? "bg-red-700 hover:bg-red-600" : ""
                    }`}
                    onClick={() => setShowForm(!showForm)}
                  >
                    {showForm ? "بستن فرم" : "افزودن درس جدید"}
                  </Button>
                  {showForm && (
                    <Card className="p-4 mt-4 border-dashed border-2">
                      <form className="flex flex-col gap-4">
                        <div className="flex flex-col">
                          <label className="mb-1 font-bold">عنوان درس</label>
                          <input
                            type="text"
                            className="border p-2 rounded"
                            placeholder="عنوان درس را وارد کنید"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="mb-1 font-bold">
                            توضیحات (اختیاری)
                          </label>
                          <textarea
                            className="border p-2 rounded"
                            placeholder="توضیحات درس را وارد کنید"
                          />
                        </div>
                        <Button type="submit" className=" mt-2">
                          ایجاد درس
                        </Button>
                      </form>
                    </Card>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          {/* مثال از یک آیتم آکاردئون */}
        </Accordion>
      </Card>
    </div>
  );
};

export default ManageLessons;
