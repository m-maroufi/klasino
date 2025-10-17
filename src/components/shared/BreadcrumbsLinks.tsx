"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { breadcrumbsGenerator } from "@/lib/breadcrumbsGenretor";
import { ChevronsLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const BreadcrumbsLinks = () => {
  const pathname = usePathname();
  const breadcrumbs = breadcrumbsGenerator(pathname);

  return (
    <Breadcrumb className="mb-6 font-vazir animate-fade-in bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-sm p-3">
      <BreadcrumbList className="flex items-center gap-2">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.href || index}>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={item.href}
                className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                {item.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className="text-indigo-400">
                <ChevronsLeft size={16} />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbsLinks;
