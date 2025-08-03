"use client"
import { Navbar } from "../../components/navbar";
import { SearchBar } from "../../components/search-bar";
import { useRouter } from "next/navigation";

export default function QuizMenuPage() {
  const router = useRouter();
  return (
    <div className="w-full flex min-h-screen">
      <Navbar />
      <SearchBar />
      <div className="mt-15 w-full flex flex-col items-center">
        quiz menu

        <button className="btn " onClick={() => router.push("/bible-quiz")}> Start quiz </button>
      </div>
    </div>
  );
}