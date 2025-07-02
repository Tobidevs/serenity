"use client";
import { useRouter } from "next/navigation";
import { Navbar } from "../../components/navbar";
import { SidebarTrigger } from "../../components/ui/sidebar";

export default function DashboardPage() {
  const router = useRouter();
  
  return (
    <div>
      <div>Dashboard</div>
      <Navbar />
      <SidebarTrigger />
    </div>
  );
}
