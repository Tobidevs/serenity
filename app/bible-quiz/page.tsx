"use client";
import { Navbar } from "../../components/navbar";
import { SearchBar } from "../../components/search-bar";
import { Quiz } from "../../components/quiz";
import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BibleQuizPage() {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <SearchBar />
      <div className="mt-15 pt-5 pl-5 pr-5 w-full flex flex-col items-center">
        <div className="flex justify-between w-full">
          <button
            className="btn rounded-xl flex justify-center border-none shadow-none items-center p-3 bg-grey-main "
            onClick={() => router.push("/bible-menu")}
          >
            <ChevronRightIcon className="rotate-180 text-grey-primary" />
          </button>
        </div>
        <Quiz />
      </div>
    </div>
  );
}
