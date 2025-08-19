import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="min-h-screen w-full relative">
      {/* Bottom Fade Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #ccc 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #ccc 60%, transparent 100%)",
        }}
      />
      {/* Your Content/Components */}
      <div className="container min-h-[calc(100svh/1.1)] h-full  grid items-center place-content-center relative z-10">
        <div className="hero-title space-y-4 text-center">
          <h1 className="scroll-m-20 text-center text-2xl md:text-4xl font-extrabold tracking-tight text-balance">
            آکادمی کلاسینو
          </h1>
          <h2 className="scroll-m-20 border-b pb-2 text-xl md:text-2xl font-semibold tracking-tight first:mt-0 text-muted-foreground">
            آکادمی کلاسینو ، کلبه آنلاین یادگیری برنامه نویسی و توسعه فردی
          </h2>
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <Button asChild>
              <Link href={"/course"}>شروع یادگیری</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={"/course"}>مسیرهای یادگیری</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
