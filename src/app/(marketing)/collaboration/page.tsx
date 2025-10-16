import { Button } from "@/components/ui/button";
import {
  Briefcase,
  CheckCircle,
  Clock,
  FileText,
  Percent,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

export default function Collaboration() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            شرایط همکاری با کلاسینو
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            به جمع مدرسان حرفه‌ای کلاسینو بپیوندید و دانش خود را با دانشجویان به
            اشتراک بگذارید!
          </p>
        </div>

        {/* Collaboration Conditions */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            شرایط همکاری
          </h2>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <Briefcase className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  سابقه کاری
                </h3>
                <p className="text-gray-600">
                  حداقل ۲ سال سابقه کار حرفه‌ای در حوزه‌ای که قصد تدریس آن را
                  دارید.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Percent className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  سهم پلتفرم
                </h3>
                <p className="text-gray-600">
                  ۲۰٪ از درآمد دوره‌ها به‌عنوان کارمزد پلتفرم کسر می‌شود.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <FileText className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  ارائه رزومه
                </h3>
                <p className="text-gray-600">
                  ارائه رزومه کامل شامل سوابق کاری، تحصیلی و نمونه‌کارهای مرتبط.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  تعهد به کیفیت
                </h3>
                <p className="text-gray-600">
                  ارائه محتوای آموزشی باکیفیت و به‌روز مطابق با استانداردهای
                  کلاسینو.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  پاسخگویی به موقع
                </h3>
                <p className="text-gray-600">
                  پاسخگویی سریع به سوالات و نیازهای دانشجویان در طول دوره.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <UserCheck className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  تأیید صلاحیت
                </h3>
                <p className="text-gray-600">
                  بررسی و تأیید صلاحیت توسط تیم کلاسینو قبل از شروع همکاری.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-blue-600 text-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            آماده همکاری با کلاسینو هستید؟
          </h2>
          <p className="text-lg mb-6">
            اگر شرایط بالا را دارید، رزومه و درخواست خود را از طریق صفحه تماس با
            ما ثبت کنید یا مستقیماً از طریق تلگرام برای ما ارسال کنید. در پیام
            خود، شرایط و رزومه خود را به‌صورت کامل شرح دهید.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link href="/contact-us">ثبت درخواست در صفحه تماس با ما</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white bg-primary hover:text-white hover:bg-blue-700"
            >
              <a
                href="https://t.me/mehdidevlo"
                target="_blank"
                rel="noopener noreferrer"
              >
                ارسال رزومه در تلگرام (@mehdidevlo)
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
