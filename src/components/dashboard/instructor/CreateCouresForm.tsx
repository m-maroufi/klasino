"use client";

import { createCourse } from "@/actions/create-course";
import ImageUpload from "@/components/shared/ImageUploader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getCategories } from "@/db/queries";
// import { getCategories } from "@/db/queries";
import { useSlug } from "@/hooks/useSlug";
import { cn } from "@/lib/utils";
import { CreateCourseFormSchema } from "@/lib/validator.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// QuillEditor رو فقط کلاینتی لود کن
const QuillEditor = dynamic(
  () => import("@/components/shared/QuillTextEditor"),
  {
    ssr: false, // ❌ سرور رندر نشه
  }
);
const languages = [
  { label: "English", value: "انگلیسی" },
  { label: "فارسی", value: "فارسی" },
] as const;
const levels = [];
export const categories = [
  { label: "برنامه نویسی", value: "programming" },
  { label: "طراحی وب", value: "web-design" },
  { label: "هوش مصنوعی", value: "ai" },
  { label: "زبان‌های خارجی", value: "languages" },
  { label: "مالی و سرمایه گذاری", value: "finance" },
];

const CreateCouresForm = ({
  onCreated,
}: {
  onCreated: (course: {
    id: string;
    title: string;
    description: string | null;
  }) => void;
}) => {
  const [categoriesList, setCategoriesList] = useState<
    { name: string; id: string; slug: string }[]
  >([]);
  const form = useForm<z.infer<typeof CreateCourseFormSchema>>({
    resolver: zodResolver(CreateCourseFormSchema),
    reValidateMode: "onChange",
    mode: "onSubmit",
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      thumbnailUrl: "",
      isPublished: false,
      level: "beginner",
      language: "فارسی",
      status: "preorder",
      category: [],
    },
  });

  const title = form.watch("title");
  const slug = useSlug(title);
  useEffect(() => {
    form.setValue("slug", slug, { shouldValidate: true });
    console.log(form.getValues("description"));
  }, [slug, form]);
  async function onsubmitHandler(data: z.infer<typeof CreateCourseFormSchema>) {
    const result = await createCourse(data);
    if (result.success && result.data) {
      onCreated?.({
        id: result.data.id,
        title: result.data.title,
        description: result.data.description,
      });
      toast.success(` دوره ${result.data.title} با موفقیت ایجاد شد`, {
        richColors: true,
      });
      form.reset();
    }
  }

  useEffect(() => {
    async function fetchCategories() {
      const cats = await getCategories();
      setCategoriesList(cats);
    }
    fetchCategories();
  }, []);

  return (
    <div className="py-6">
      <Form {...form}>
        <form
          className="space-y-4 w-full md:max-w-10/12 mx-auto"
          onSubmit={form.handleSubmit(onsubmitHandler)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان دوره</FormLabel>
                <FormControl>
                  <Input placeholder="عنوان دوره کوتاه باشد" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسلاگ</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="این فیلد بر اساس عنوان دوره خودکار تکمیل میگردد"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>قیمت دوره</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="قیمت دوره به تومان وارد کنید"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        field.onChange(isNaN(val) ? "" : val);
                      }}
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
                  <FormLabel>مدت زمان دوره</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="مدت زمان بر حسب دقیقه"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.valueAsNumber;
                        field.onChange(isNaN(val) ? "" : val);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>آیا دوره انتشار یابد؟</FormLabel>
                  <FormControl>
                    <RadioGroup
                      dir="rtl"
                      onValueChange={(val) => field.onChange(val === "true")}
                      value={field.value ? "true" : "false"}
                      className="flex"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="true" defaultChecked />
                        </FormControl>
                        <FormLabel className="font-normal">بله</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">خیر</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>زبان دوره</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? languages.find(
                                (language) => language.value === field.value
                              )?.label
                            : "انتخاب زبان"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="جستو جو کنید..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>زبان مورد نظر یافت نشد.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.label}
                                key={language.value}
                                onSelect={() => {
                                  form.setValue("language", language.value);
                                }}
                              >
                                {language.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>توضیحات دوره</FormLabel>
                <FormControl>
                  <QuillEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="توضیحات دوره..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="thumbnailUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تامنیل دوره</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">دسته بندی ها</FormLabel>
                    <FormDescription>
                      (می‌توانید چندین دسته‌بندی را انتخاب کنید)
                    </FormDescription>
                  </div>

                  {categoriesList.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="category"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-center gap-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>سطح دوره</FormLabel>
                  <FormControl>
                    <RadioGroup
                      dir="rtl"
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value="beginner" />
                        </FormControl>
                        <FormLabel className="font-normal">مبتدی</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value="intermediate" />
                        </FormControl>
                        <FormLabel className="font-normal">متوسط</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value="advanced" />
                        </FormControl>
                        <FormLabel className="font-normal">پیشرفته</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>وضعیت دوره</FormLabel>
                  <FormControl>
                    <RadioGroup
                      dir="rtl"
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value="ongoing" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          در حال برگزاری
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value="completed" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          اتمام یافته
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value="preorder" />
                        </FormControl>
                        <FormLabel className="font-normal">پیش‌فروش</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="btn mt-6">
            <Button type="submit">ایجاد دوره و ادامه</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCouresForm;
