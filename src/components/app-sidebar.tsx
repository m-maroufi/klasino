"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { User } from "@/lib/auth";
import { MenuGroup } from "@/types/menu";
import { getRoleLabel } from "@/types/role";

type SidebarData = {
  user: User;
  menus: MenuGroup[];
};

export function AppSidebar({ user, menus }: SidebarData) {
  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" side="right">
      {/* HEADER */}
      <SidebarHeader>
        <div className="px-3 py-4 border-b border-gray-200 flex items-start gap-3">
          <Avatar className="size-9">
            <AvatarImage
              src={user?.image || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback />
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="font-semibold tracking-tight leading-none">
              {user.name}
            </span>
            <span className="text-sm text-muted-foreground leading-none">
              {getRoleLabel(user.role)}
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        {menus.map((group) => (
          <SidebarGroup key={group.groupLabel}>
            <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  // اگر ساب منو وجود داشته باشه
                  if (item.subMenus && item.subMenus.length > 0) {
                    return (
                      <SidebarMenuItem key={item.fa_label}>
                        <Collapsible
                          defaultOpen={false}
                          className="group/collapsible"
                        >
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton className="flex justify-between items-center w-full">
                              <span className="flex items-center gap-2">
                                {item.fa_label}
                              </span>
                              <ChevronLeft className="mr-auto transition-transform group-data-[state=open]/collapsible:-rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pr-4">
                            <SidebarMenu className="pr-2 border-r-4 border-gray-300">
                              {item.subMenus.map((sub) => (
                                <SidebarMenuItem key={sub.fa_label}>
                                  <SidebarMenuButton asChild>
                                    <a
                                      href={sub.path}
                                      className="flex items-center gap-2"
                                    >
                                      <span>{sub.fa_label}</span>
                                    </a>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              ))}
                            </SidebarMenu>
                          </CollapsibleContent>
                        </Collapsible>
                      </SidebarMenuItem>
                    );
                  }

                  // اگر ساب منو نداشت، آیتم معمولی
                  return (
                    <SidebarMenuItem key={item.fa_label}>
                      <SidebarMenuButton asChild>
                        <a href={item.path} className="flex items-center gap-2">
                          <span>{item.fa_label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
