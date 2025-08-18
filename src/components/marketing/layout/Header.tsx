"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "../widget/Navbar";
import { Button } from "@/components/ui/button";
export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0">
      <div className="container">
        <div className="section flex items-center justify-between gap-5">
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
          <nav className="nav">
            <Navbar />
          </nav>
          <section>
            <Button asChild>
              <Link href={"/login"}>ورود</Link>
            </Button>
          </section>
        </div>
      </div>
    </header>
  );
};
