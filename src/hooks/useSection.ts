"use client";

import {
  createSection,
  deleteSection,
  getSections,
} from "@/actions/sections-course";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSection = ({ courseId }: { courseId: string }) => {
  const queryClient = useQueryClient();
  const sectionQuery = useQuery({
    queryKey: ["sections", courseId],
    queryFn: () => getSections(courseId),
    enabled: !!courseId,
  });
  // افزودن سکشن
  const addSection = useMutation({
    mutationFn: async (data: {
      title: string;
      courseId: string;
      description?: string;
    }) => createSection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections", courseId] });
    },
  });
  const deleteSectionById = useMutation({
    mutationFn: (id: string) => deleteSection(id),
    onSuccess: () => {
      // وقتی حذف شد، لیست رو دوباره fetch کن
      queryClient.invalidateQueries({ queryKey: ["sections", courseId] });
    },
  });
  return { ...sectionQuery, addSection, deleteSectionById };
};
