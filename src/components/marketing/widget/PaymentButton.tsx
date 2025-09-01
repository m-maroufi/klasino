import { Button } from "@/components/ui/button";
import Link from "next/link";

const PaymentButton = () => {
  return (
    <section
      className="payments  bottom-app-bar fixed bottom-0 left-0 w-full h-16 
  bg-amber-100/10 backdrop-blur-xs border-t border-white/20 
  z-50 flex md:hidden justify-center items-center shadow-[0_-4px_30px_rgba(0,0,0,0.1)]"
    >
      <div className="container px-4">
        <Button asChild className="w-full rounded-2xl font-medium shadow-md">
          <Link href="?">ثبت نام در دوره</Link>
        </Button>
      </div>
    </section>
  );
};

export default PaymentButton;
