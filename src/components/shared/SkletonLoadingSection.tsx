import { CardCourseSklaton } from "./CardCourseSklaton";

const SkletonLoadingSection = () => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6">
      <CardCourseSklaton />
      <CardCourseSklaton />
      <CardCourseSklaton />
    </div>
  );
};

export default SkletonLoadingSection;
