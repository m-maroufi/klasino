"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuerys";
import { SortAscIcon } from "lucide-react";
import { useEffect, useState } from "react";

const fitlerOptions = [
  { label: "جدیدترین", value: "newest" },
  { label: "محبوب ترین", value: "most_popular" },
  { label: "پرفروش ترین", value: "best_selling" },
  { label: "ارزان ترین", value: "cheapest" },
  { label: "گران ترین", value: "most_expensive" },
];

const FiltersSection = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    if (isDesktop && openMenu) {
      setOpenMenu(false);
    }
  }, [isDesktop, openMenu]);
  return (
    <section className="">
      <div className="sort flex gap-4 items-start">
        {/* Sorting options will go here */}
        {isDesktop ? (
          <>
            <span className="flex flex-row-reverse items-center gap-2 text-nowrap text-sm">
              مرتب سازی بر اساس:
              <SortAscIcon size="24" className="text-accent-foreground" />
            </span>
            <div className="btns-filters flex gap-3  flex-wrap">
              {fitlerOptions.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className="text-sm"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <Button
            variant="default"
            className="max-w-sm w-full mx-auto"
            onClick={() => setOpenMenu(true)}
          >
            فیلتر ها
          </Button>
        )}
      </div>
      <Drawer open={openMenu} onOpenChange={setOpenMenu}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>مرتب سازی بر اساس</DrawerTitle>
            <DrawerDescription>
              {" "}
              برای مرتب سازی نمایش انتخاب کنید
            </DrawerDescription>
          </DrawerHeader>

          <div className="btns-filters flex gap-3 flex-wrap mt-4 px-2 items-center justify-center">
            {fitlerOptions.map((option) => (
              <Button key={option.value} variant="outline" className="text-sm">
                {option.label}
              </Button>
            ))}
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="destructive" type="button">
                بستن
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
};

export default FiltersSection;
