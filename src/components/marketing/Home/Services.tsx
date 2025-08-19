import { ServicesCard } from "@/components/shared";
import React from "react";
const service = [
  {
    title: "دوره‌های تخصصی",
    description:
      "دوره‌های تخصصی در زمینه‌های مختلف، از جمله برنامه‌نویسی، طراحی و بازاریابی دیجیتال.",
  },
  {
    title: "پشتیبانی 24/7",
    description:
      "تیم پشتیبانی ما در هر ساعت از شبانه‌روز آماده پاسخگویی به سوالات شماست.",
  },
  {
    title: "منابع آموزشی رایگان",
    description:
      "دسترسی به منابع آموزشی رایگان شامل مقالات، ویدئوها و کتاب‌های الکترونیکی.",
  },
  {
    title: "گواهینامه‌های معتبر",
    description:
      "دریافت گواهینامه‌های معتبر پس از اتمام دوره‌ها، که به شما در بازار کار کمک می‌کند.",
  },
];
const Services = () => {
  return (
    <div className="my-6 min-h-[300px]">
      <h2 className="scroll-m-20 text-xl md:text-2xl font-extrabold tracking-tight text-balance mb-10">
        خدمات <mark className="px-3">کلاسینو</mark> چیست؟
      </h2>
      <div className="grid grid-cols-1 items-center place-content-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {service.map((item, index) => (
          <ServicesCard
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
