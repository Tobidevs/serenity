"use client";
import { useRouter } from "next/navigation";
import { Navbar } from "../../components/navbar";
import { SearchBar } from "../../components/search-bar";
import { toast } from "sonner";
import { useAccountStore } from "../../store/useAccountStore";
import { useEffect } from "react";

export default function DashboardPage() {
  const { fetchUser } = useAccountStore();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="w-full flex min-h-screen">
      <Navbar />
      <SearchBar />
      <div className="mt-20"></div>
    </div>
  );
}
