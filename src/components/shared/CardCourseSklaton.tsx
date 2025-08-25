import { Skeleton } from "../ui/skeleton";

export const CardCourseSklaton = () => {
  return (
    <div className="flex flex-col space-y-3 w-full max-w-md mx-auto">
      <Skeleton className="h-[150px]  rounded-xl bg-gray-200" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-200" />
        <Skeleton className="h-4 w-[150px] bg-gray-200" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-[100px] bg-gray-200" />
          <Skeleton className="h-8 w-[150px] bg-gray-200" />
        </div>
      </div>
    </div>
  );
};
