import z from "zod";

const singUpFormSchema = z.object({
  name: z.string().min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  email: z.email("ایمیل نامعتبر است"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

const signInFormSchema = z.object({
  email: z.email("ایمیل نامعتبر است"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export { signInFormSchema, singUpFormSchema };
