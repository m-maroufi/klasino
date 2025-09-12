"use client";

import { signInFormSchema } from "@/lib/validator.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EyeIcon,
  EyeOffIcon,
  HomeIcon,
  LockIcon,
  MailIcon,
} from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    reValidateMode: "onSubmit",
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInHandler = (data: z.infer<typeof signInFormSchema>) => {
    console.log(data);
  };

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader className=" relative">
        <CardTitle>
          <h2>ورود به حساب</h2>
        </CardTitle>
        <CardDescription>
          لطفا ایمیل و کلمه عبور خود را وارد کنید
        </CardDescription>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="absolute -top-1 left-4 flex items-center gap-1"
              >
                <HomeIcon className="h-6 w-6 text-muted-foreground" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>بازگشت به خانه</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(signInHandler)}
            className="space-y-4"
          >
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
                        placeholder="کلمه عبور خود را وارد کنید"
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
                حساب کاربری ندارید؟{" "}
                <Link
                  href="/sign-up"
                  className="text-blue-500 hover:underline hover:text-blue-600"
                >
                  ایحاد حساب کاربری
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
