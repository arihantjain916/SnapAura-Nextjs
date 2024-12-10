"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
    active: boolean;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu className="flex gap-12 justify-between mt-3">
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <Link href={item.url} className={item.active ? "underline" : ""}>
              <SidebarMenuButton tooltip={item.name}>
                {item.icon && <item.icon />}
                <span>{item.name}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
