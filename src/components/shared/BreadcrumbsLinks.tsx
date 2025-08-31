"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { breadcrumbsGenrator } from "@/lib/breadcrumbsGenretor";
import { ChevronsLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const BreadcrumbsLinks = () => {
  const pathname = usePathname();
  const breadcrumbs = breadcrumbsGenrator(pathname);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.href || index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronsLeft />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbsLinks;
