import { Skeleton } from "../ui/skeleton";

const LessonCourseSklaton = () => {
  return (
    <>
      <div className="flex items-center justify-between w-full py-5">
        <Skeleton className="h-[40px] w-2/4  rounded-xl bg-gray-200" />
        <div className="flex gap-6">
          <Skeleton className="w-[50px] h-[30px]" />
          <Skeleton className="w-[50px] h-[30px]" />
        </div>
      </div>
      <div className="flex items-center justify-between w-full py-5">
        <Skeleton className="h-[40px] w-2/4  rounded-xl bg-gray-200" />
        <div className="flex gap-6">
          <Skeleton className="w-[50px] h-[30px]" />
          <Skeleton className="w-[50px] h-[30px]" />
        </div>
      </div>
    </>
  );
};

export default LessonCourseSklaton;
