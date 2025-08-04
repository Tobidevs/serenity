"use client"
import { Navbar } from "../../components/navbar";
import { SearchBar } from "../../components/search-bar";
import { Quiz } from "../../components/quiz";

export default function BibleQuizPage() {
  return (
    <div className="w-full flex min-h-screen">
      <Navbar />
      <SearchBar />
       <div className="mt-15 w-full flex flex-col items-center">
        <Quiz />
      </div>
    </div>
  );
}
