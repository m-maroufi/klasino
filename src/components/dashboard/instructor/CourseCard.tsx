"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InstructorCourse } from "@/db/queries";
import { MoreVertical } from "lucide-react";

const CourseCard = ({ course }: { course: InstructorCourse }) => {
  const handleEdit = (id: string) => {
    console.log("ویرایش دوره:", id);
  };

  const handleDelete = (id: string) => {
    console.log("حذف دوره:", id);
  };
  return (
    <Card
      key={course.id}
      className="hover:shadow-lg py-0 transition-shadow duration-300 rounded-2xl overflow-hidden gap-0"
    >
      <CardHeader className="relative p-0 m-0">
        <img
          src={course.thumbnailUrl || ""}
          alt={course.title}
          className="w-full h-50 object-cover"
        />

        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 left-2 bg-white/80 hover:bg-white/100"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(course.id)}>
              ✏️ ویرایش
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(course.id)}
              className="text-red-500"
            >
              🗑 حذف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="py-4 space-y-4">
        <CardTitle className="text-lg">{course.title}</CardTitle>

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>👨‍🎓 {course.students_count} دانشجو</span>
          <span>💰 {course.price?.toLocaleString() || 0} تومان</span>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <div
            className={`text-xs font-medium px-2 py-1 rounded-lg inline-block ${
              course.status === "ongoing"
                ? "bg-green-100 text-green-700"
                : course.status === "completed"
                ? "bg-blue-100-100 text-blue-500"
                : "bg-orange-100 text-orange-500"
            }`}
          >
            {course.status === "ongoing"
              ? "در حال برگزاری"
              : course.status === "completed"
              ? "اتمام دوره"
              : "پیش فروش"}
          </div>

          <div
            className={`text-xs font-medium px-2 py-1 rounded-lg inline-block ${
              course.isPublished
                ? "bg-pink-100 text-pink-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {course.isPublished ? "دوره منتشر شده" : "دوره در حالت پیش نویس"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
