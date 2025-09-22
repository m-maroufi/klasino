"use client";
import { MenuItem } from "@/types/menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Sidebar({
  menus,
  role,
}: {
  menus: MenuItem[];
  role: string;
}) {
  const [openMenus, setOpenMenus] = useState<string[]>([]); // برای مدیریت باز/بسته شدن زیرمنوها

  const toggleSubMenu = (path: string) => {
    setOpenMenus((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl mb-4">
        {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
      </h2>
      <ul>
        {menus.map((menu) => (
          <li key={menu.path} className="mb-2">
            <div className="flex items-center justify-between">
              <a href={menu.path} className="block py-2 hover:bg-gray-700">
                {menu.icon && <span className="mr-2">{/* رندر آیکون */}</span>}
                {menu.fa_lable}
              </a>
              {menu.subMenus && menu.subMenus.length > 0 && (
                <button
                  onClick={() => toggleSubMenu(menu.path)}
                  className="text-sm"
                >
                  {openMenus.includes(menu.path) ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </button>
              )}
            </div>
            {menu.subMenus &&
              menu.subMenus.length > 0 &&
              openMenus.includes(menu.path) && (
                <ul className="pl-4 mt-2">
                  {menu.subMenus.map((subMenu) => (
                    <li key={subMenu.path}>
                      <a
                        href={subMenu.path}
                        className="block py-2 hover:bg-gray-600 text-sm"
                      >
                        {subMenu.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
