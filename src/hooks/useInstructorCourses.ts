"use client";

import { deleteCourse, DeleteCourseResponse } from "@/actions/create-course";
import { getCoursesByInstructor, InstructorCourse } from "@/db/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useInstructorCourses = (instructorId: string) => {
  const queryClient = useQueryClient();

  // 1️⃣ گرفتن دوره‌ها
  const {
    data: courses,
    isLoading,
    isError,
    refetch,
  } = useQuery<InstructorCourse[]>({
    queryKey: ["courses", instructorId],
    queryFn: () => getCoursesByInstructor(instructorId),
  });

  const deleteMutation = useMutation<DeleteCourseResponse, Error, string>({
    mutationFn: (courseId: string) => deleteCourse(courseId),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("✅ دوره با موفقیت حذف شد.");
        queryClient.invalidateQueries({ queryKey: ["courses", instructorId] });
      } else {
        toast.error(`❌ ${response.message}`);
      }
    },
    onError: () => {
      toast.error("❌ خطا در حذف دوره.");
    },
  });

  return {
    courses,
    isLoading,
    isError,
    refetch,
    deleteCourse: deleteMutation.mutateAsync,
  };
};
