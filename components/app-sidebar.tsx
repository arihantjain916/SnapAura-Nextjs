"use client";

import * as React from "react";
import {
  Frame,
  Map,
  Bell,
  Home,
  Search,
  MessageCircle,
  User,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useSelector, UseSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import path from "node:path/posix";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { username, email } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();
  const user = {
    name: username,
    email: email,
    avatar: "/avatars/shadcn.jpg",
  };

  console.log(pathname);

  const data = {
    projects: [
      {
        name: "Home",
        url: "#",
        icon: Home,
        active: pathname === "/",
      },
      {
        name: "Search",
        url: "#",
        icon: Search,
        active: pathname === "/search",
      },
      {
        name: "Notification",
        url: "#",
        icon: Bell,
        active: pathname === "/notification",
      },
      {
        name: "Messages",
        url: "#",
        icon: MessageCircle,
        active: pathname === "/messages",
      },
      {
        name: "Create",
        url: "#",
        icon: MessageCircle,
        active: pathname === "/create",
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
        <h1 className="text-lg font-bold text-center">SnapAura</h1>
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
