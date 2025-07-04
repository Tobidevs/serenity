"use client";
import { useRouter } from "next/navigation";
import { Navbar } from "../../components/navbar";
import { SearchBar } from "../../components/search-bar";
import { toast } from "sonner";
import { useAccountStore } from "../../store/useAccountStore";
import { useEffect } from "react";
import { useSessionStore } from "../../store/useSessionStore";
import { RouteToAuth } from "../../components/route-to-auth";

export default function DashboardPage() {
  const { loadAccount } = useAccountStore();
  const { session } = useSessionStore();

  useEffect(() => {
    loadAccount();
  }, []);

  if (!session) {
    return <RouteToAuth />;
  }

  return (
    <div className="w-full flex min-h-screen">
      <Navbar />
      <SearchBar />
      <div className="mt-20"></div>
    </div>
  );
}
