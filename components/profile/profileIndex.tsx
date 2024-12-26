"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DynamicProfile } from "./dynamicProfile";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const DynamicProfileIndex = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="flex-1 relative z-0">
        <DynamicProfile />
      </main>
    </SidebarProvider>
  ) : (
    <DynamicProfile />
  );
};
