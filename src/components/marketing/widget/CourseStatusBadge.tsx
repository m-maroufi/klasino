import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Loader2 } from "lucide-react";

type CourseStatus = "ongoing" | "completed" | "preorder";

export function CourseStatusBadge({ status }: { status: CourseStatus }) {
  const config = {
    ongoing: {
      text: "در حال برگزاری",
      icon: <Loader2 className="mr-2 h-4 w-4 animate-spin text-blue-600" />,
      className: "bg-blue-100 text-blue-800 dark:bg-blue-500/20",
    },
    completed: {
      text: "تمام شده",
      icon: <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />,
      className: "bg-green-100 text-green-800 dark:bg-green-500/20",
    },
    preorder: {
      text: "پیش‌فروش",
      icon: <Clock className="mr-2 h-4 w-4 text-yellow-600" />,
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20",
    },
  }[status];

  return (
    <Badge variant="secondary" className={`my-4 ${config.className}`}>
      {config.icon}
      وضعیت دوره: {config.text}
    </Badge>
  );
}
