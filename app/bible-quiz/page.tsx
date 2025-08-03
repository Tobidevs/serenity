"use client"
import { Navbar } from "../../components/navbar";
import { SearchBar } from "../../components/search-bar";

export default function BibleQuizPage() {
  return (
    <div className="w-full flex min-h-screen">
      <Navbar />
      <SearchBar />
      
    </div>
  );
}
