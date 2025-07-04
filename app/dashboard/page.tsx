"use client";
import { useRouter } from "next/navigation";
import { Navbar } from "../../components/navbar";
import { SearchBar } from "../../components/search-bar";
import { toast } from "sonner";

export default function DashboardPage() {
  return (
    <div className="w-full flex min-h-screen">
      <Navbar />
      <SearchBar />
      <div className="mt-20"></div>
    </div>
  );
}
