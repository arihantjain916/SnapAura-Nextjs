"use client";

import * as React from "react";
import {
  Bell,
  Home,
  Search,
  MessageCircle,
  User,
  CirclePlus,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { username, email, profile } = useSelector(
    (state: RootState) => state.auth
  );
  const pathname = usePathname();
  const user = {
    name: username,
    email: email,
    avatar: profile ?? "/avatars/shadcn.jpg",
  };

  const data = {
    projects: [
      {
        name: "Home",
        url: "/",
        icon: Home,
        active: pathname === "/",
      },
      {
        name: "Search",
        url: "/search",
        icon: Search,
        active: pathname === "/search",
      },
      {
        name: "Notification",
        url: "/notification",
        icon: Bell,
        active: pathname === "/notification",
      },
      {
        name: "Messages",
        url: "/messages",
        icon: MessageCircle,
        active: pathname === "/messages",
      },
      {
        name: "Create",
        url: "/feed/create",
        icon: CirclePlus,
        active: pathname === "/feed/create",
      },
      {
        name: "Profile",
        url: "/profile",
        icon: User,
        active: pathname === "/profile",
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">SnapAura</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
