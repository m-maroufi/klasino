"use client";
import { CourseSections } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useCourseVideos = (slug: string) => {
  return useQuery<CourseSections, Error>({
    queryKey: ["course-videos", slug],
    queryFn: async () => {
      const { data } = await axios.get(`/api/courses/${slug}/lessons`);
      return data as CourseSections;
    },
    staleTime: 5 * 60 * 1000, // ۵ دقیقه
    gcTime: 1000 * 60 * 10, // 10 دقیقه کش تایم
    refetchOnMount: false, // جلوگیری از refetch خودکار هنگام mount/remount
    refetchOnWindowFocus: false, // اختیاری: جلوگیری از refetch هنگام فوکوس پنجره (اگر لازم نیست)
  });
};
