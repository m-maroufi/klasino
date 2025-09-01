import { Badge } from "@/components/ui/badge";

const Tags = () => {
  return (
    <div className="tags my-6 flex items-center gap-2 flex-wrap">
      <span className="text-sm font-light">تگ ها:</span>
      <Badge className="bg-blue-500/10 text-blue-500">#python</Badge>
      <Badge className="bg-amber-500/10 text-amber-500">#django</Badge>
      <Badge className="bg-purple-500/10 text-purple-500">#flask</Badge>
      <Badge className="bg-green-500/10 text-green-500">#programming</Badge>
      <Badge className="bg-pink-500/10 text-pink-500">#web</Badge>
      <Badge className="bg-red-400/10 text-red-500">#برنامه نویسی</Badge>
      <Badge className="bg-teal-500/10 text-teal-500">#پایتون</Badge>
    </div>
  );
};

export default Tags;
