import { getCoursesByInstructor, InstructorCourse } from "@/db/queries";
import CourseCard from "./CourseCard";

type Course = {
  id: string;
  title: string;
  thumbnail: string;
  studentsCount: number;
  price: number;
  status: "active" | "draft";
};
const courses: Course[] = [
  {
    id: "1",
    title: "آموزش Next.js پیشرفته",
    thumbnail: "/images/next-course.jpg",
    studentsCount: 120,
    price: 490000,
    status: "active",
  },
  {
    id: "2",
    title: "Node.js برای بک‌اند",
    thumbnail: "/images/node-course.jpg",
    studentsCount: 80,
    price: 390000,
    status: "draft",
  },
  {
    id: "3",
    title: "TypeScript کاربردی",
    thumbnail: "/images/ts-course.jpg",
    studentsCount: 54,
    price: 290000,
    status: "active",
  },
];

export const CourseCardContainer = async ({
  instructorId,
}: {
  instructorId: string;
}) => {
  const courses: InstructorCourse[] = await getCoursesByInstructor(
    instructorId
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard course={course} key={course.id} />
      ))}
    </div>
  );
};
