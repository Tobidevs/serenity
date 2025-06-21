"use client";
import { ChevronRightIcon, Divide } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { translationsData } from "../../data/translation-data";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { bibleTopics } from "../../data/bible-data";

export default function OnboardingPage() {
  // Used for changing question
  const [questionNumber, setQuestionNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Fading effect
  const handleUiChange = (option: string) => {
    /// Start fade out
    setIsFading(true);
    // Change context
    setTimeout(() => {
      if (option === "next") {
        setQuestionNumber((prev) => prev + 1);
      }
      if (option === "previous") {
        setQuestionNumber((prev) => prev - 1);
      }
      // Start fade in after content loads
      setTimeout(() => {
        setIsFading(false);
      }, 20);
    }, 500);
  };

  // Handle Selected Topic
  const handleToggleTopic = (topicName: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicName)
        ? prev.filter((t) => t !== topicName)
        : [...prev, topicName]
    );
  };

  // Progress Bar UI
  useEffect(() => {
    const timer = setTimeout(
      () => setProgress((questionNumber / 3) * 100),
      500
    );
    return () => clearTimeout(timer);
  }, [questionNumber]);

  // Page Load UI
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!loading ? (
        <div className="flex w-full h-full justify-center md:items-center ">
          <Card className="sm:w-full lg:w-3/6 md:justify-center h-fit md:h-5/8 relative flex sm:gap-12 lg:gap-17 flex-col bg-transparent border-none shadow-none">
            <CardHeader className="w-full md:absolute md:top-5">
              <CardTitle className="text-4xl font-bold text-grey-primary ">
                Welcome To Serenity!
              </CardTitle>
              <CardDescription className="text-grey-secondary text-lg ">
                We're excited you're here. Let’s set a few preferences to
                personalize your Bible study experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-5 flex-col">
              {
                // Onboarding Question #1
                questionNumber === 1 && (
                  <div
                    className={`transition-opacity duration-500 flex flex-col gap-3 container ${
                      isFading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {/* Question */}
                    <h2 className="text-xl text-grey-primary font-extrabold">
                      What is your main Bible Translation?
                    </h2>
                    {/* Question Content */}
                    <div className="flex justify-center gap-3 flex-wrap mx-auto md:mx-0 w-9/10">
                      {translationsData.map((translation, key) => (
                        <button
                          className={`btn btn-lg flex ${
                            // Change color based on selected translation
                            selectedTranslation === translation.name
                              ? `${translation.bg_primary_color} text-white border-gray-300 border-3 shadow-lg`
                              : `${translation.bg_color} ${translation.text_color}`
                          } flex-wrap w-80 h-17 rounded-2xl border-2`}
                          key={key}
                          onClick={() =>
                            setSelectedTranslation(translation.name)
                          }
                        >
                          <h2 className={`font-bold`}>{translation.name}</h2>
                        </button>
                      ))}
                    </div>
                    {/* Navigation */}
                    <div className="flex justify-between items-center w-9/10">
                      <button
                        className="pointer-events-none opacity-30 btn rounded-xl flex justify-center items-center p-3 bg-grey-main w-fit"
                        onClick={() => handleUiChange("previous")}
                      >
                        <ChevronRightIcon className="rotate-180" />
                        <p className="text-md">Previous</p>
                      </button>
                      <Progress
                        value={progress}
                        className="w-[60%] hidden sm:inline [&>div]:bg-[#414142]"
                      />
                      <button
                        className={`${
                          !selectedTranslation &&
                          "pointer-events-none opacity-30"
                        } btn rounded-xl flex justify-center items-center p-3 bg-grey-main w-fit`}
                        onClick={() => handleUiChange("next")}
                      >
                        <p className="text-md">Next</p>
                        <ChevronRightIcon />
                      </button>
                    </div>
                  </div>
                )
              }
              {
                // Onboarding Question #2
                questionNumber === 2 && (
                  <div
                    className={`transition-opacity duration-500 flex flex-col gap-3 container ${
                      isFading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {/* Question */}
                    <h2 className="text-xl text-grey-primary font-extrabold">
                      What topic are you most interested in?
                    </h2>
                    {/* Question Content */}
                    <div className="flex justify-center gap-3 flex-wrap mx-auto md:mx-0 w-9/10">
                      {bibleTopics.map((topic, key) => (
                        <button
                          className={`btn rounded-xl btn-lg text-grey-secondary ${
                            selectedTopics.includes(topic.name)
                              ? "bg-grey-primary text-white"
                              : "bg-grey-main"
                          }`}
                          onClick={() => handleToggleTopic(topic.name)}
                          key={key}
                        >
                          <h1>{topic.name}</h1>
                        </button>
                      ))}
                    </div>
                    {/* Navigation */}
                    <div className="flex justify-between items-center w-9/10">
                      <button
                        className="btn rounded-xl flex justify-center items-center p-3 bg-grey-main"
                        onClick={() => handleUiChange("previous")}
                      >
                        <ChevronRightIcon className="rotate-180" />
                        <p className="text-md">Previous</p>
                      </button>
                      <Progress
                        value={progress}
                        className="w-[60%] hidden sm:inline [&>div]:bg-[#414142]"
                      />
                      <button
                        className="btn rounded-xl flex justify-center items-center p-3 bg-grey-main"
                        onClick={() => handleUiChange("next")}
                      >
                        <p className="text-md">Next</p>
                        <ChevronRightIcon />
                      </button>
                    </div>
                  </div>
                )
              }
            </CardContent>
          </Card>
        </div>
      ) : ( // Page Loading UI
        <div className="flex justify-center items-center h-full w-full">
          <span className="loading loading-infinity w-2/10 md:w-20" ></span>
        </div>
      )}
    </>
  );
}
