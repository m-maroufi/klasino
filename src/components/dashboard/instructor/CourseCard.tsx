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
import { useInstructorCourses } from "@/hooks/useInstructorCourses";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteCourseDialog } from "./DeleteCourseDialog";

const CourseCard = ({
  course,
  instructorId,
}: {
  course: InstructorCourse;
  instructorId: string;
}) => {
  const { deleteCourse } = useInstructorCourses(instructorId);
  const router = useRouter();
  const [open, setIsOpen] = useState(false);

  const onOpenDialog = () => {
    setIsOpen(!open);
  };

  const handleEdit = (id: string) => {
    router.push(`/instructor/courses/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteCourse(id);
    setIsOpen(false);
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
            <DropdownMenuItem onClick={() => onOpenDialog()}>
              ❌ حذف
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
      <DeleteCourseDialog
        courseId={course.id}
        onDelete={handleDelete}
        open={open}
        onOpenDialog={onOpenDialog}
      />
    </Card>
  );
};

export default CourseCard;
