import { Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className="max-w-md w-full text-center py-10 px-6 shadow-md">
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <Construction className="w-12 h-12 text-yellow-500 animate-pulse" />
            <h2 className="text-2xl font-bold">این صفحه هنوز آماده نیست</h2>
            <p className="text-muted-foreground">
              تیم توسعه در حال کار روی این بخش است. به‌زودی در دسترس خواهد بود
              💪
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
