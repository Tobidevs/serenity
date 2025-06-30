import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function Navbar() {
  return (
    <Sidebar>
      <div className="w-full h-full bg-grey-alt">
        <SidebarHeader className="h-1/10 border mt-10"></SidebarHeader>
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </div>
    </Sidebar>
  );
}
