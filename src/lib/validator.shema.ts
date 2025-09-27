import z from "zod";

const singUpFormSchema = z.object({
  name: z.string().min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  email: z.email("ایمیل نامعتبر است"),
  password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
});

const signInFormSchema = z.object({
  email: z.email("ایمیل نامعتبر است"),
  password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
});
const CreateCourseFormSchema = z.object({
  title: z.string().min(5, "عنوان دوره باید حداقل ۵ کاراکتر باشد"),
  slug: z.string().optional(),
  description: z.string().min(20, "توضیحات دوره باید حداقل ۲۰ کاراکتر باشد"),
  thumbnailUrl: z.url("لطفا لینک تامنیل را وارد کنید"),
  price: z.number("قیمت باید یک عدد باشد").min(0, "قیمت نمی‌تواند منفی باشد"),
  isPublished: z.boolean().optional(),
  level: z.enum(["beginner", "intermediate", "advanced"], {
    message: "لطفا یک سطح معتبر انتخاب کنید",
  }),
  language: z.string("لطفا زبان دوره را انتخاب کنید").optional(),
  duration: z.number().optional(),
  status: z.enum(["ongoing", "completed", "preorder"], {
    message: "لطفا یک وضعیت معتبر انتخاب کنید",
  }),
  category: z.array(z.string()).min(1, "لطفا حداقل یک دسته‌بندی انتخاب کنید"),
});

export { signInFormSchema, singUpFormSchema, CreateCourseFormSchema };
