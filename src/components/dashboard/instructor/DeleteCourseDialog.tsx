"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteCourseDialogProps {
  courseId: string;
  onDelete: (id: string) => Promise<void>;
  open: boolean;
  onOpenDialog: () => void;
}

export const DeleteCourseDialog = ({
  courseId,
  onDelete,
  open,
  onOpenDialog,
}: DeleteCourseDialogProps) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onDelete(courseId);
      toast.success("✅ دوره با موفقیت حذف شد.");
    } catch (err) {
      toast.error("❌ خطا در حذف دوره.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenDialog}>
      <DialogContent
        className="sm:max-w-[400px]"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogHeader dir="rtl" className="text-right">
          <DialogTitle className="text-right">آیا مطمئن هستید؟</DialogTitle>
          <DialogDescription className="text-right">
            حذف دوره قابل بازگشت نیست. مطمئنید می‌خواهید ادامه دهید؟
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => {
              setLoading(false), onOpenDialog();
            }}
          >
            لغو
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "لطفا صبر کنید..." : "حذف"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
