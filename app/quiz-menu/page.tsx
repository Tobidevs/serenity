"use client";
import { Navbar } from "../../components/navbar";
import { SearchBar } from "../../components/search-bar";
import { useRouter } from "next/navigation";
import { useBibleQuizStore } from "../../store/useBibleQuizStore";
import { bibleSections, bibleThemes } from "../../data/bible-data";
import { useState } from "react";

export default function QuizMenuPage() {
  const router = useRouter();
  const { resetQuiz, setTopicsOfInterest, setBookFilter } = useBibleQuizStore();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedSections, setSelectedSections] = useState<string>();

  const startQuiz = () => {
    // Reset and initialize the quiz before starting
    resetQuiz();
    setTopicsOfInterest(selectedTopics);
    setBookFilter(selectedSections || null);
    router.push("/bible-quiz");
  };

  return (
    <div className="w-full flex min-h-screen">
      <Navbar />
      <SearchBar />
      <div className="mt-15 p-4 w-full flex flex-col items-center">
        <div className="flex flex-col w-9/10 mb-5">
          <div className="">
            <h1 className="text-2xl font-bold mb-1 text-grey-primary">
              Quiz Menu
            </h1>
            <p className="text-md text-grey-primary mb-6">
              Choose options below to start your Bible quiz.
            </p>
          </div>
          <div className="flex flex-col mb-4 w-full">
            <h1 className="text-lg font-bold text-grey-primary mb-2">
              Choose topics
            </h1>
            <div className="flex gap-2 flex-wrap mx-auto md:mx-0 w-full">
              {bibleThemes.map((topic, key) => (
                <button
                  className={`btn rounded-xl btn-sm text-grey-secondary border border-gray-300 shadow-none ${
                    selectedTopics.includes(topic)
                      ? "bg-grey-primary text-white"
                      : "bg-grey-main"
                  }`}
                  onClick={() => {
                    setSelectedTopics((prev) =>
                      prev.includes(topic)
                        ? prev.filter((t) => t !== topic)
                        : [...prev, topic]
                    );
                  }}
                  key={key}
                >
                  <h1>{topic}</h1>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col mb-4 w-full">
            <h1 className="text-lg font-bold text-grey-primary mb-2">
              Filter by books
            </h1>
            <div className="flex gap-2 flex-wrap mx-auto md:mx-0 w-full">
              {bibleSections.map((section, key) => (
                <button
                  className={`btn rounded-xl btn-sm text-grey-secondary border border-gray-300 shadow-none ${
                    selectedSections === section
                      ? "bg-grey-primary text-white"
                      : "bg-grey-main"
                  }`}
                  onClick={() => {
                    setSelectedSections(
                      selectedSections === section ? "" : section
                    );
                  }}
                  key={key}
                >
                  <h1>{section}</h1>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col mb-4 w-full">
            <div className="flex mb-2 mr-2">
              {/* <input
                type="checkbox"
                defaultChecked
                className="checkbox text-grey-primary"
              />
              <h1 className="text-lg font-bold text-grey-primary mb-2 ml-2">
                Answer Choice Styles
              </h1> */}
            </div>
          </div>
        </div>
        <button className="btn " onClick={() => startQuiz()}>
          Start quiz
        </button>
      </div>
    </div>
  );
}
