"use client";
import Image from "next/image";
import logo from "../../public/Figma Vector.svg";
import { ChevronRightIcon } from "lucide-react";
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

export default function OnboardingPage() {
  // Used for changing question
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [isFading, setIsFading] = useState(false);

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

  return (
    <Card className="w-3/6 h-5/8 mx-auto container flex gap-17 flex-col bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-grey-primary">
          Welcome To Serenity!
        </CardTitle>
        <CardDescription className="text-grey-secondary text-lg ">
          We're excited you're here. Let’s set a few preferences to personalize
          your Bible study experience.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-5 flex-col">
        {
          // Onboarding Question #1
          questionNumber === 1 && (
            <div
              className={`transition-opacity duration-500 flex flex-col gap-3 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            >
              <h2 className="text-xl text-grey-primary font-extrabold">
                What is your main Bible Translation?
              </h2>
              <div className="flex justify-center gap-3 flex-wrap w-9/10">
                {translationsData.map((translation, key) => (
                  <button
                    className={`btn btn-lg flex ${
                      // Change color based on selected translation
                      selectedTranslation === translation.name
                        ? `${translation.bg_primary_color} text-white border-gray-300 border-3 shadow-lg`
                        : `${translation.bg_color} ${translation.text_color}`
                    } flex-wrap w-80 h-17 rounded-2xl border-2`}
                    key={key}
                    onClick={() => setSelectedTranslation(translation.name)}
                  >
                    <h2 className={`font-bold`}>{translation.name}</h2>
                  </button>
                ))}
              </div>
              <div className="flex justify-between items-center w-9/10">
                <p className="text-grey-secondary ">
                  More translations coming soon...
                </p>
                <button
                  className="btn rounded-xl flex justify-center items-center p-3 bg-grey-main w-20"
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
              className={`transition-opacity duration-500 flex flex-col gap-3 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            >
              <h2 className="text-xl text-grey-primary font-extrabold">
                What topic are you most interested in?
              </h2>
              <div className="flex justify-between w-9/10">
                <button
                  className="btn rounded-xl flex justify-center items-center p-3 bg-grey-main"
                  onClick={() => handleUiChange("previous")}
                >
                  <ChevronRightIcon className="rotate-180" />
                  <p className="text-md">Previous</p>
                </button>
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
  );
}
