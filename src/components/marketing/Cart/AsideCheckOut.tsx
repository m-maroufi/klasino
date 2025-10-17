"use client";

import {
  addNewOrder,
  addNewPayment,
  getDisCountWithCode,
} from "@/actions/cart";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Session } from "@/lib/auth";
import { CourseItem, useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ICart {
  cartItem: CourseItem[];
  totalPrice: number;
  finalPayment: number;
  discountPercent: number;
  userId?: string;
}

export default function AsideCheckOut({
  session,
}: {
  session: Session | null;
}) {
  const { totalPrice, items } = useCartStore();
  const router = useRouter();
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<ICart>({
    cartItem: items,
    totalPrice: 0,
    finalPayment: 0,
    discountPercent: 0,
    userId: session?.user.id,
  });

  // محاسبه مبلغ نهایی با تخفیف
  const finalPayment =
    discountPercent === 100
      ? 0
      : Math.round(totalPrice * (1 - discountPercent / 100));

  // به‌روزرسانی cart هنگام تغییر totalPrice یا discountPercent
  useEffect(() => {
    setCart({
      cartItem: items,
      totalPrice,
      finalPayment,
      discountPercent,
      userId: session?.user.id,
    });
  }, [items, totalPrice, discountPercent, session]);

  // بررسی کد تخفیف
  const handleDiscount = async () => {
    if (!discountCode.trim()) {
      toast.error("لطفاً کد تخفیف را وارد کنید", { richColors: true });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const discount = await getDisCountWithCode(discountCode);
      if (discount.success) {
        const amount = discount.data?.discountAmount || 0;
        setDiscountPercent(amount);
        toast.success(`کد تخفیف ${discountCode} اعمال شد! ${amount}% تخفیف`, {
          richColors: true,
        });
      } else {
        setError(discount.error?.message || "خطا در اعمال کد تخفیف");
        toast.error(discount.error?.message || "خطا در اعمال کد تخفیف", {
          richColors: true,
        });
      }
    } catch (error) {
      setError("خطا در ارتباط با سرور");
      toast.error("خطا در ارتباط با سرور", { richColors: true });
    } finally {
      setLoading(false);
    }
  };

  // ارسال به درگاه پرداخت
  const handlePayment = async () => {
    if (!session?.user.id) {
      router.push("/sign-in");
      return;
    }
    if (items.length === 0) {
      toast.error("سبد خرید خالی است!", { richColors: true });
      return;
    }
    // if (finalPayment === 0) {
    //   // ثبت خرید مستقیم برای تخفیف 100%
    //   try {
    //     await db.insert(purchases).values(
    //       items.map((item) => ({
    //         id: crypto.randomUUID(),
    //         userId: session.user.id,
    //         courseId: item.id,
    //         pricePaid: 0,
    //         paymentStatus: "paid",
    //         paymentProvider: "discount",
    //         createdAt: new Date(),
    //       }))
    //     );
    //     toast.success("دوره‌ها با موفقیت ثبت شدند!", { richColors: true });
    //     router.push("/courses?success=purchase");
    //   } catch (error) {
    //     toast.error("خطا در ثبت خرید!", { richColors: true });
    //   }
    //   return;
    // }

    try {
      const insertOrderResopnse = await addNewOrder({
        cartItems: JSON.stringify({
          items: items.map((item) => ({
            courseId: item.id,
            // title: item.title,
            price: item.price,
            // instructorName: item.instructor,
          })),
        }),
        totalAmount: totalPrice,
        discountAmount: discountPercent,
        finalAmount: finalPayment,
      });
      if (insertOrderResopnse.code === 200 && insertOrderResopnse.data) {
        const paymentResopnse = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pricePayment: insertOrderResopnse.data?.finalAmount,
            discountPercent: insertOrderResopnse.data?.discountAmount,
            orderId: insertOrderResopnse.data?.id,
            userId: insertOrderResopnse.data?.userId,
          }),
        });
        const paymentResult = await paymentResopnse.json();
        console.log(paymentResult);
        if (paymentResult.success) {
          const res = await addNewPayment({
            refId: paymentResult.trackId,
            orderId: insertOrderResopnse.data.id,
            authority: paymentResult.trackId,
            amount: insertOrderResopnse.data.finalAmount,
            message: paymentResult.message,
            provider: "zibal",
          });
          if (res.code === 200) {
            router.push(paymentResult.zibalPaymentUrl);
          } else {
            toast.error("خطا در ایجاد درخواست پرداخت!", { richColors: true });
          }
        }
      }
    } catch (error) {
      toast.error("خطا در ارتباط با سرور!", { richColors: true });
    }
  };

  return (
    <aside className="min-h-16 w-full md:w-3/12">
      <Card className="shadow-lg">
        <CardHeader className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">اطلاعات پرداخت</h3>
          <Separator />
          <p className="text-sm text-gray-600">کد تخفیف دارید؟</p>
          <div className="space-y-2">
            {discountPercent > 0 ? (
              <p className="text-sm text-green-700 bg-green-100 rounded-lg p-2 text-center">
                کد تخفیف <b>{discountCode}</b> ({discountPercent}%) اعمال شد
              </p>
            ) : (
              <div className="flex gap-2 flex-col">
                <Input
                  className="bg-white placeholder:text-gray-400 text-sm"
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="کد تخفیف را وارد کنید"
                />
                <Button
                  onClick={handleDiscount}
                  disabled={loading}
                  variant="default"
                  className="w-2/2"
                >
                  {loading ? "در حال بررسی..." : "اعمال"}
                </Button>
              </div>
            )}
            {error && (
              <p className="text-sm text-red-600 bg-red-100 rounded-lg p-2 text-center">
                {error}
              </p>
            )}
          </div>
          <Separator />
          <div className="space-y-2 text-right">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">
                مبلغ کل:
              </span>
              {discountPercent > 0 ? (
                <del className="text-gray-500 text-lg font-semibold relative animate-fade-in">
                  <span className="absolute w-full h-0.5 bg-red-500/80 top-1/2 transform -rotate-3"></span>
                  {formatPrice(totalPrice)} تومان
                </del>
              ) : (
                <span className="text-lg font-semibold text-blue-700">
                  {formatPrice(totalPrice)} تومان
                </span>
              )}
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  تخفیف ({discountPercent}%):
                </span>
                <span className="text-green-600">
                  {formatPrice(totalPrice * (discountPercent / 100))} تومان
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">
                مبلغ قابل پرداخت:
              </span>
              <span className="text-xl font-bold text-blue-700">
                {formatPrice(finalPayment)} تومان
              </span>
            </div>
          </div>
        </CardHeader>
        <CardFooter>
          {!session ? (
            <Link href="/sign-in" className="w-full">
              <Button variant="link" className="w-full text-blue-600">
                برای پرداخت وارد شوید
              </Button>
            </Link>
          ) : (
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handlePayment}
              disabled={items.length === 0 || loading}
            >
              {finalPayment === 0 ? "ثبت رایگان دوره" : "پرداخت صورت‌حساب"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </aside>
  );
}
