import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Feed } from "@/components/feed";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
        <Feed />
    </SidebarProvider>
  );
}
