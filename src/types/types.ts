// یک لسن
export interface Lesson {
  id: string;
  title: string;
  duration: number | null; // ممکنه null باشه
  order: number;
  videoUrl: string | null; // ممکنه null باشه
  isPreview: boolean;
}

// یک سکشن
export interface Section {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

// خروجی structured
export type CourseSections = Section[];
