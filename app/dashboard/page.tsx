"use client";
import { Navbar } from "../../components/navbar";
import { SearchBar } from "../../components/search-bar";
import { useAccountStore } from "../../store/useAccountStore";
import { useEffect } from "react";
import Placeholder from "../../components/placeholder";

export default function DashboardPage() {
  const { loadAccount } = useAccountStore();

  useEffect(() => {
    loadAccount();
  }, []);

  return (
    <div className="w-full flex min-h-screen">
      <Navbar />
      <SearchBar />
      <div className="w-full mt-20">
        <Placeholder />
      </div>
    </div>
  );
}
