import ContactForm from "@/components/marketing/ContactUs/ContactForm";
import {
  Award,
  BookOpen,
  Mail,
  MapPin,
  MessageCircleCode,
  Users,
} from "lucide-react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">تماس با ما</h1>
          <p className="mt-4 text-lg text-gray-600">
            با تیم کلاسینو در ارتباط باشید! سوالات، پیشنهادات یا درخواست‌های خود
            را با ما در میان بگذارید.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              فرم تماس
            </h2>
            <ContactForm />
          </div>

          {/* About Us Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                درباره کلاسینو
              </h2>
              <p className="text-gray-600 leading-relaxed">
                کلاسینو یک پلتفرم آموزشی آنلاین است که با هدف ارائه دوره‌های
                باکیفیت در زمینه‌های مختلف از جمله برنامه‌نویسی، طراحی،
                بازاریابی دیجیتال و زبان‌های خارجی تأسیس شده است. ما در کلاسینو
                تلاش می‌کنیم تا با ارائه منابع آموزشی رایگان، پشتیبانی 24/7 و
                گواهینامه‌های معتبر، تجربه‌ای متفاوت و مؤثر برای دانشجویان فراهم
                کنیم. هدف ما توانمندسازی شما برای موفقیت در مسیر حرفه‌ای‌تان
                است!
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                اطلاعات تماس
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-blue-600" />
                  <p className="text-gray-600">support@klasino.com</p>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircleCode className="h-6 w-6 text-blue-600" />
                  <p className="text-gray-600">
                    آیدی تلگرام ما{" "}
                    <a
                      href="https://t.me/mehdidevlo"
                      className="text-blue-600"
                      target="_blank"
                    >
                      (mehdidevlo)
                    </a>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <p className="text-gray-600">
                    هرمزگان-شهرستان رودان ،خیابان آموزش پرورش
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    دوره‌های تخصصی
                  </h4>
                  <p className="text-gray-600">
                    دوره‌های متنوع در زمینه‌های حرفه‌ای.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">پشتیبانی 24/7</h4>
                  <p className="text-gray-600">همیشه در کنار شما هستیم.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="h-8 w-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    گواهینامه معتبر
                  </h4>
                  <p className="text-gray-600">مدارک معتبر برای پیشرفت شغلی.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
