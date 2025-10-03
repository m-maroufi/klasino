"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-md w-full p-8 text-center shadow-lg border">
        <div className="flex flex-col items-center">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            صفحه پیدا نشد
          </h1>
          <p className="text-gray-600 mb-4">
            متاسفانه صفحه‌ای که دنبال آن هستید وجود ندارد یا حذف شده است.
          </p>
          <Separator className="my-4" />
          <Button onClick={() => router.push("/")} className="mt-2">
            بازگشت به صفحه اصلی
          </Button>
        </div>
      </Card>
    </div>
  );
}
