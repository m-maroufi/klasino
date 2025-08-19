import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

type TitleSectionProps = {
  title: string;
  link?: { href: string; text: string };
};

export const TitleSection = ({ title, link }: TitleSectionProps) => {
  return (
    <div className="flex items-center gap-4 justify-between mb-3">
      <h2 className="scroll-m-20 text-xl md:text-2xl font-extrabold tracking-tight text-balance">
        {title}
      </h2>
      {link && (
        <Button asChild>
          <Link href={link?.href}>
            <SquareArrowOutUpRight />
            {link?.text}
          </Link>
        </Button>
      )}
    </div>
  );
};
