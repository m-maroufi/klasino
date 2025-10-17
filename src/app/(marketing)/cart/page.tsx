import AsideCheckOut from "@/components/marketing/Cart/AsideCheckOut";
import CartItemContainer from "@/components/marketing/Cart/CartItemContainer";
import { BreadcrumbsLinks, TitleSection } from "@/components/shared";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function CartPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen pt-30 pb-10">
      <div className="container space-y-5">
        {" "}
        <BreadcrumbsLinks />
        <TitleSection title=" 🛒 سبد خرید شما " />
        <section className="flex flex-col gap-5 md:flex-row mt-10">
          <section className="carts flex-1">
            <Card className="bg-gray-50">
              <CartItemContainer />
            </Card>
          </section>
          <AsideCheckOut session={session} />
        </section>
      </div>
    </div>
  );
}
