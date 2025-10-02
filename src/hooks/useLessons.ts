"use clinet";

import { createLesson, getLessonsBySectionId } from "@/actions/lessons-course";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLessons = ({ sectionId }: { sectionId: string }) => {
  const queryClient = useQueryClient();
  const lessonQuery = useQuery({
    queryKey: ["lessons", sectionId],
    queryFn: () => getLessonsBySectionId(sectionId),
    enabled: !!sectionId,
  });
  const addLesson = useMutation({
    mutationFn: async (data: {
      title: string;
      sectionId: string;
      duration?: number;
      videoUrl: string;
      isPreview?: boolean;
    }) => createLesson(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons", sectionId] });
    },
  });
  return { ...lessonQuery, addLesson };
};
