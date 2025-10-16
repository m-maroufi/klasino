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
  thumbnailUrl: z.string().url("لطفا لینک تامنیل معتبر وارد کنید"),
  price: z.string().optional(),
  duration: z.number().optional(),
  isPublished: z.boolean().optional(),
  level: z.enum(["beginner", "intermediate", "advanced"], {
    message: "لطفا یک سطح معتبر انتخاب کنید",
  }),
  language: z.string("لطفا زبان دوره را انتخاب کنید").optional(),
  status: z.enum(["ongoing", "completed", "preorder"], {
    message: "لطفا یک وضعیت معتبر انتخاب کنید",
  }),
  category: z.array(z.string()).min(1, "لطفا حداقل یک دسته‌بندی انتخاب کنید"),
});

// Schema for form validation
const ContactFormSchema = z.object({
  name: z
    .string("نام نمیتواند خالی باشد")
    .min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  email: z.email("لطفاً یک ایمیل معتبر وارد کنید"),
  subject: z.enum(["request_teacher", "support", "general"], {
    message: "لطفاً یک موضوع معتبر انتخاب کنید",
  }),
  priority: z.enum(["low", "medium", "high"], {
    message: "لطفاً یک اولویت معتبر انتخاب کنید",
  }),
  message: z
    .string("لطفا متن پیام خود را وارد کنید")
    .min(10, "پیام باید حداقل ۱۰ کاراکتر باشد"),
});

export {
  ContactFormSchema,
  CreateCourseFormSchema,
  signInFormSchema,
  singUpFormSchema,
};
