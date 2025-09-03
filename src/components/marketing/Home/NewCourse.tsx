import { CardCourse, CardCourseSklaton } from "@/components/shared";
import { getAllCourses } from "@/db/queries";
export const revalidate = 120; // cache 60 ثانیه
const NewCourse = async ({ limit }: { limit: number }) => {
  const courses = await getAllCourses(limit);
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6">
      {courses.length === 0 ? (
        <>
          {Array.from({ length: limit }).map((_, index) => (
            <CardCourseSklaton key={index} />
          ))}
        </>
      ) : (
        courses.map((course) => (
          <CardCourse key={course.courseId} course={course} />
        ))
      )}
    </div>
  );
};

export default NewCourse;
