"use client";

import * as React from "react";
import { Frame, Map, Bell, Home, Search, MessageCircle } from "lucide-react";

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

const data = {
  projects: [
    {
      name: "Home",
      url: "#",
      icon: Home,
    },
    {
      name: "Search",
      url: "#",
      icon: Search,
    },
    {
      name: "Notification",
      url: "#",
      icon: Bell,
    },
    {
      name: "Messages",
      url: "#",
      icon: MessageCircle,
    },
    {
      name: "Create",
      url: "#",
      icon: MessageCircle,
    },
    {
      name: "Profile",
      url: "#",
      icon: MessageCircle,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { username, email } = useSelector((state: RootState) => state.auth);
  const user = {
    name: username,
    email: email,
    avatar: "/avatars/shadcn.jpg",
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
