"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useInstructorCourses } from "@/hooks/useInstructorCourses";
import CourseCard from "./CourseCard";

type Course = {
  id: string;
  title: string;
  thumbnail: string;
  studentsCount: number;
  price: number;
  status: "active" | "draft";
};

export const CourseCardContainer = ({
  instructorId,
}: {
  instructorId: string;
}) => {
  const { courses, isError, isLoading } = useInstructorCourses(instructorId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <h4>خطا</h4>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {courses?.map((course) => (
        <CourseCard
          course={course}
          key={course.id}
          instructorId={instructorId}
        />
      ))}
    </div>
  );
};
