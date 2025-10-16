"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CourseItem } from "@/lib/cart-store";
import { formatPrice } from "@/lib/helper";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface ICartItemProps {
  onRemove: (id: string) => { success: boolean; message: string };
  item: CourseItem;
}
const CartItem = ({ onRemove, item }: ICartItemProps) => {
  const removeHandler = (id: string) => {
    const result = onRemove(id);
    if (result.success) {
      toast.success(`${result.message}`, {
        richColors: true,
      });
      return;
    } else {
      toast.warning(`${result.message}`, {
        richColors: true,
      });
      return;
    }
  };
  return (
    <li className="flex relative gap-4 justify-center items-center flex-col sm:flex-row border p-3 rounded-3xl bg-white">
      <div className="img relative h-25 w-25 rounded-xl overflow-hidden">
        <Image
          src={`${item.image}`}
          alt={item.title}
          fill
          className="absolute"
        />
      </div>
      <div className="info flex-1">
        <div className=" absolute top-3 left-3 tag flex items-center justify-between">
          <div></div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                asChild
                size={"icon"}
                variant={"ghost"}
                className="bg-card hover:bg-destructive-foreground hover:text-destructive mr-auto p-1"
              >
                <Trash2 className="text-gray-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent dir="rtl" className=" flex-row-reverse">
              <AlertDialogHeader dir="rtl" className="text-right">
                <AlertDialogTitle className="text-right">
                  آیا از حذف اطمینان دارید ؟
                </AlertDialogTitle>
                <AlertDialogDescription className="text-right">
                  با تائید این فرآیند دوره{" "}
                  <mark>
                    {" "}
                    <b>{item.title}</b>{" "}
                  </mark>{" "}
                  از سبد خرید شما حذف میشود
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>انصراف</AlertDialogCancel>
                <AlertDialogAction onClick={() => removeHandler(item.id)}>
                  تائید و ادامه
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Link href={"/course"}>{item.title}</Link>
        <div className="font-mikhak text-xs my-3 text-gray-600">
          مدرس : <span>{item.instructor}</span>
        </div>
        <div className="font-mikhak text-xs my-3 bg-blue-700/10 rounded-4xl p-1 shadow-2xl max-w-fit px-2  text-blue-700">
          قیمت دوره : <b className="text-lg px-2">{formatPrice(item.price)}</b>{" "}
          <span>تومان</span>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
