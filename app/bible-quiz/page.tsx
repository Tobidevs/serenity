"use client";
import { Navbar } from "../../components/navbar";
import { SearchBar } from "../../components/search-bar";
import { Quiz } from "../../components/quiz";
import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBibleQuizStore } from "../../store/useBibleQuizStore";

export default function BibleQuizPage() {
  const router = useRouter();
  const { currentQuestion, resetQuiz } = useBibleQuizStore();

  const goBackToMenu = () => {
    // Reset the quiz state when going back to menu
    resetQuiz();
    router.push("/quiz-menu");
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <SearchBar />
      <div className="mt-15 pt-5 pl-5 pr-5 w-full flex flex-col items-center">
        <div className="flex justify-between w-full items-center">
          <button
            className="btn rounded-xl flex justify-center border-none shadow-none items-center p-3 bg-grey-main"
            onClick={() => goBackToMenu()}
          >
            <ChevronRightIcon className="rotate-180 text-grey-primary" />
          </button>
          <div>
            <p className="text-md text-grey-primary font-bold">
              Question {currentQuestion}
            </p>
          </div>
          <button
            className="btn rounded-xl flex justify-center border-none shadow-none items-center p-3 bg-grey-main"
            onClick={() => goBackToMenu()}
          >
            <ChevronRightIcon className="rotate-180 text-grey-primary" />
          </button>
        </div>
        <Quiz />
      </div>
    </div>
  );
}
