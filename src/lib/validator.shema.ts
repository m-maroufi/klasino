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

export { signInFormSchema, singUpFormSchema };
