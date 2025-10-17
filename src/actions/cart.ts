"use server";
import db from "@/db";
import { checkDiscountCode } from "@/db/queries";
import { orders, payments } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export interface IGDCWCode {
  success: boolean;
  data?: {
    id: string;
    code: string;
    discountAmount: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  error?: {
    code: number;
    message: string;
  };
}
export async function getDisCountWithCode(code: string): Promise<IGDCWCode> {
  try {
    const res = await checkDiscountCode(code);
    if (res.statusCode == 200) {
      return {
        success: true,
        data: res.discount,
      };
    }
    if (res.statusCode == 404) {
      return {
        success: false,
        error: {
          code: 404,
          message: "کد تخفیف وارد شده یافت نشد!",
        },
      };
    }
    throw new Error("خطا در اعمال کد تخفیف");
  } catch (error) {
    return {
      success: false,
      error: {
        code: 500,
        message: "خطا در پردازش کد تخفیف",
      },
    };
  }
}

export async function addNewOrder(data: {
  cartItems: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return {
      code: 402,
      message: "لطفا ابتدا وارد شوید",
    };
  }
  const insertData = {
    userId: session.user.id,
    totalAmount: data.totalAmount,
    discountAmount: data.discountAmount,
    finalAmount: data.finalAmount,
    items: data.cartItems,
  };
  try {
    const insertItem = await db
      .insert(orders)
      .values({
        ...insertData,
      })
      .returning();
    return {
      code: 200,
      message: "سفارش با موفقیت ثبت شد",
      data: insertItem[0],
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      message: "خطا در ثبت سفارش",
    };
  }
}
interface IAddPayment {
  orderId: string;
  provider: string;
  amount: number;
  authority: string;
  refId: string;
  message: string;
}
export async function addNewPayment(data: IAddPayment) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return {
      code: 402,
      message: "لطفا ابتدا وارد شوید",
    };
  }
  // insert data to payment table
  try {
    const insertItem = await db
      .insert(payments)
      .values({
        userId: session.user.id,
        ...data,
      })
      .returning();
    return {
      code: 200,
      message: "سفارش با موفقیت ثبت شد",
      data: insertItem[0],
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      message: "خطا در ثبت سفارش",
    };
  }
}
