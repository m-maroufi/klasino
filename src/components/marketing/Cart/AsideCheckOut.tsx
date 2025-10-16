"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Session } from "@/lib/auth";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/helper";
import Link from "next/link";

const AsideCheckOut = ({ session }: { session: Session | null }) => {
  const { totalPrice } = useCartStore((state) => state);
  return (
    <aside className="min-h-16 w-full md:w-3/12">
      <Card>
        <CardHeader>
          <h3 className="font-bold mb-2">اطلاعات تکمیلی</h3>
          <Separator className="my-3" />
          <p className="text-sm font-vazir">کد تخفیف دارید؟</p>
          <div className="flex flex-col w-full max-w-full items-center gap-2">
            <Input
              className="bg-white placeholder:text-xs "
              type="text"
              placeholder="کد تخفیف را اینجا وارد کنید"
            />
            <Button type="submit" variant="secondary" className="w-full">
              اعمال کد تخفیف
            </Button>
          </div>
          <Separator className="my-3" />
          <div className="space-y-3">
            <h4>مبلغ قابل پرداخت:</h4>
            <div className="text-center">
              <b className="space-x-3 text-xl text-blue-700 ">
                {formatPrice(totalPrice)}
              </b>
              <span className="px-2">تومان</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter>
          {!session ? (
            <Link href={"/sign-in"} className="w-full">
              <Button variant={"link"} className="w-full">
                برای ادامه روند پرداخت ابتدا وارد شوید
              </Button>
            </Link>
          ) : (
            <>
              {totalPrice >= 0 ? (
                ""
              ) : (
                <Button className="w-full">پرداخت صورت حساب</Button>
              )}
            </>
          )}
        </CardFooter>
      </Card>
    </aside>
  );
};

export default AsideCheckOut;
