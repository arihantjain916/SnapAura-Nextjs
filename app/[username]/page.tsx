import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DynamicProfileIndex } from "@/components/profile/profileIndex";

export default function UsernameHome() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main className="flex-1 relative z-0">
          <DynamicProfileIndex />
        </main>
      </SidebarProvider>
    </>
  );
}
