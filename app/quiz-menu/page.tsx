"use client"
import { Navbar } from "../../components/navbar";
import { SearchBar } from "../../components/search-bar";
import { useRouter } from "next/navigation";
import { useBibleQuizStore } from "../../store/useBibleQuizStore";

export default function QuizMenuPage() {
  const router = useRouter();
  const { resetQuiz } = useBibleQuizStore();

  const startQuiz = () => {
    // Reset and initialize the quiz before starting
    resetQuiz();
    router.push("/bible-quiz");
  };

  return (
    <div className="w-full flex min-h-screen">
      <Navbar />
      <SearchBar />
      <div className="mt-15 w-full flex flex-col items-center">
        quiz menu

        <button className="btn " onClick={() => startQuiz()}> Start quiz </button>
      </div>
    </div>
  );
}