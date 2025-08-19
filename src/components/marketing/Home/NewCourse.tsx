import { CardCourse, CardCourseSklaton } from "@/components/shared";

const NewCourse = () => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6">
      <CardCourseSklaton />
      <CardCourseSklaton />
      <CardCourseSklaton />
      <CardCourse />
      <CardCourse />
      <CardCourse />
    </div>
  );
};

export default NewCourse;
