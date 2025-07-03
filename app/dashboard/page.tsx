"use client";
import { useRouter } from "next/navigation";
import { Navbar } from "../../components/navbar";
import { SidebarTrigger } from "../../components/ui/sidebar";
import { SearchBar } from "../../components/search-bar";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="w-full flex min-h-screen">
      <SearchBar />
      <Navbar />
    </div>
  );
}
