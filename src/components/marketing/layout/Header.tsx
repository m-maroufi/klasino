"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "../widget/Navbar";
import { Button } from "@/components/ui/button";
import {
  Badge,
  LucideMenuSquare,
  LucideShoppingBag,
  MenuSquareIcon,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/useMediaQuerys";
export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    if (isDesktop && openMenu) {
      setOpenMenu(false);
    }
  }, [isDesktop, openMenu]);
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container">
        <div className="section flex items-center justify-between gap-5">
          <Button
            variant="outline"
            size="lg"
            className="md:hidden"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <LucideMenuSquare size={34} />
          </Button>
          <Link
            className="logo w-[80px] sm:w-[100px] h-[60px] relative flex items-center"
            href={"/"}
          >
            <Image
              src={"/image/log0-nobg.png"}
              fill={true}
              sizes="130px"
              quality={50}
              className="object-cover"
              alt="لوگوی سایت کلاسینو"
            />
          </Link>
          <nav className="nav-desktop hidden md:block">
            <Navbar />
          </nav>
          <section className="flex items-center gap-4">
            <Button variant="secondary" size="default" className="">
              <LucideShoppingBag />
            </Button>
            <Button asChild>
              <Link href={"/login"}>ورود</Link>
            </Button>
          </section>
        </div>
      </div>
      <Sheet open={openMenu} onOpenChange={setOpenMenu}>
        <SheetContent dir="rtl" className="py-5">
          <SheetHeader>
            <SheetTitle>
              <Link
                className="logo absolute left-3 top-0 w-[80px] sm:w-[100px] h-[60px]  flex items-center"
                href={"/"}
              >
                <Image
                  src={"/image/log0-nobg.png"}
                  fill={true}
                  sizes="130px"
                  quality={50}
                  className="object-cover"
                  alt="لوگوی سایت کلاسینو"
                />
              </Link>
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <Separator className="mt-1" />
          <section className="mobile-menu">
            <h3 className="text-xs font-bold  text-gray-400 px-2">منو</h3>
            <div className="menu mt-3">
              <ul className="px-4 space-y-3">
                <li>
                  <Link href={"/"} className="font-semibold text-sm">
                    صفحه اصلی
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="font-semibold text-sm">
                    {" "}
                    تماس با ما
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="font-semibold text-sm">
                    {" "}
                    دوره
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </SheetContent>
      </Sheet>
    </header>
  );
};
