"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiCheckboxCircleFill } from "@remixicon/react";
import { MessageCircleCode } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { CommentsSection } from "./CommentsSection";
const CommentsTab = () => {
  const [open, setOpen] = useState(false);

  const FormSchema = z.object({
    feedback: z
      .string()
      .min(1, "دیدگاه نمی تواند خالی باشد")
      .max(200, "حداکثر ۲۰۰ کاراکتر مجاز است"),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { feedback: "" },
    mode: "onSubmit",
  });

  function onSubmit() {
    toast.success("دیدگاه شما با موفقیت ثبت شد و پس از بررسی منتشر می شود.", {
      icon: <RiCheckboxCircleFill className="h-5 w-5" />,
      duration: 3500,
      closeButton: true,
      richColors: true,
      className: "bg-green-500/10 text-green-700 border-green-700",
    });

    form.reset();
    setOpen(false);
  }
  return (
    <>
      <div className="comments-title my-8 flex items-center justify-between">
        <h4 className="text-lg sm:text-2xl text-gray-900 font-semibold">
          دیدگاه ها
          <Badge className="bg-blue-500/10 text-blue-500 mx-2 text-sm">3</Badge>
        </h4>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              asChild
              variant="outline"
              className=" hover:bg-green-500/30 hover:text-green-700 "
            >
              <Badge className="bg-green-500/10 text-green-500 text-sm">
                <MessageCircleCode size={14} />
                ثبت دیدگاه
              </Badge>
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-md"
            dir="rtl"
            showCloseButton={false}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>دیدگاه شما </DialogTitle>
                  <DialogDescription>
                    لطفا دیدگاه خود را با رعایت ادب و احترام ثبت کنید.
                  </DialogDescription>
                </DialogHeader>
                <DialogBody>
                  <FormField
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="دیدگاه خود را اینجا بنویسید..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>حداکثر ۲۰۰ کاراکتر</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </DialogBody>
                <DialogFooter className="space-x-4 flex gap-5">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      بستن
                    </Button>
                  </DialogClose>
                  <Button type="submit">ثبت دیدگاه</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-8">
        <CommentsSection />
      </div>
    </>
  );
};

export default CommentsTab;
