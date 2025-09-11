"use client";

import { singUpFormSchema } from "@/lib/validator.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "../ui/base-input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const form = useForm<z.infer<typeof singUpFormSchema>>({
    resolver: zodResolver(singUpFormSchema),
    reValidateMode: "onSubmit",
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const signUpHandler = (data: z.infer<typeof singUpFormSchema>) => {
    console.log(data);
  };

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader>
        <CardTitle>
          <h2>ایجاد حساب کاربری</h2>
        </CardTitle>
        <CardDescription>
          لطفاً اطلاعات خود را وارد کنید تا یک حساب کاربری جدید ایجاد کنید.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(signUpHandler)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام و نام خانوادگی</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pr-2">
                      <MailIcon className="h-5 w-5 text-muted-foreground" />
                      <Input
                        className="border-0 focus-visible:ring-0 shadow-none"
                        placeholder="مثلا : محمد احمدی"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> ایمیل</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pr-2">
                      <MailIcon className="h-5 w-5 text-muted-foreground" />
                      <Input
                        className="border-0 focus-visible:ring-0 shadow-none"
                        placeholder="مثلا :  mohamad@gmail.com"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> کلمه عبور</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring px-2">
                      <LockIcon className="h-5 w-5 text-muted-foreground" />
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="حداقل 6 کاراکتر"
                        className="border-0 focus-visible:ring-0 shadow-none"
                      />
                      <button type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="pt-4">
              <Button className="w-full " type="submit">
                <span className="text-sm">ثبت نام</span>
              </Button>
            </div>
            <div>
              <p className="text-center text-sm text-gray-500">
                قبلاً حساب کاربری ساخته‌اید؟{" "}
                <Link
                  href="/sign-in"
                  className="text-blue-500 hover:underline hover:text-blue-600"
                >
                  وارد شوید
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
