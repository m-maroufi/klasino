"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/lib/cart-store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function PaymentResultPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const { clearCart } = useCartStore((state) => state);
  useEffect(() => {
    if (status === "success") {
      clearCart(); // یا هر کلیدی که در Zustand ذخیره می‌کنی
      toast.success("پرداخت با موفقیت انجام شد!", {
        description: "دوره‌های خریداری‌شده به حساب شما اضافه شدند.",
        richColors: true,
      });
    } else if (status === "failed") {
      toast.error("پرداخت ناموفق بود!", {
        description: "لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.",
        richColors: true,
      });
    } else if (status === "failed_server") {
      toast.error("خطایی در سرور رخ داد!", {
        description: "لطفاً با پشتیبانی تماس بگیرید.",
        richColors: true,
      });
    }
  }, [status]);

  return (
    <div className="container py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {status === "success" ? "پرداخت موفق" : "پرداخت ناموفق"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          {status === "success" ? (
            <div className="space-y-4">
              <div className="text-green-600">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="mt-2 text-lg">پرداخت شما با موفقیت انجام شد!</p>
                <p className="text-gray-600">
                  دوره‌های خریداری‌شده در حساب کاربری شما قابل دسترسی هستند.
                </p>
              </div>
              <Link href="/course">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  مشاهده دوره‌ها
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-red-600">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <p className="mt-2 text-lg">
                  {status === "failed"
                    ? "پرداخت شما ناموفق بود!"
                    : "خطایی در پردازش پرداخت رخ داد!"}
                </p>
                <p className="text-gray-600">
                  {status === "failed"
                    ? "لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید."
                    : "لطفاً با پشتیبانی تماس بگیرید."}
                </p>
              </div>
              <Link href="/cart">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  بازگشت به سبد خرید
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
