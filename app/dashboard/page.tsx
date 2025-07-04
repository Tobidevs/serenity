"use client";
import { useRouter } from "next/navigation";
import { Navbar } from "../../components/navbar";
import { SearchBar } from "../../components/search-bar";

export default function DashboardPage() {
  return (
    <div className="w-full flex min-h-screen">
      <Navbar />
      <SearchBar />
    </div>
  );
}
