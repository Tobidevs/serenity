"use client";
import { Navbar } from "../../components/navbar";
import { RouteToAuth } from "../../components/route-to-auth";
import { SearchBar } from "../../components/search-bar";
import { useSessionStore } from "../../store/useSessionStore";

export default function BibleStudyPage() {
  const { session } = useSessionStore();

  if (!session) {
    return <RouteToAuth />;
  }
  return (
    <div className="w-full flex min-h-screen">
      <Navbar />
      <SearchBar />
      <div className="mt-20 flex w-full"></div>
    </div>
  );
}
