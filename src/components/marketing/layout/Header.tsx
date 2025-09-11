"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/useMediaQuerys";
import { LucideMenuSquare, LucideShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../widget/Navbar";
export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    if (isDesktop && openMenu) {
      setOpenMenu(false);
    }
  }, [isDesktop, openMenu]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? "var(--background)"
            : "rgba(255,255,255,0)",
          boxShadow: scrolled
            ? "0 2px 10px rgba(0,0,0,0.1)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3, ease: "easeIn" }}
      >
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
                <Link href={"/sign-in"}>ورود</Link>
              </Button>
            </section>
          </div>
        </div>
      </motion.div>
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
    </motion.header>
  );
};
