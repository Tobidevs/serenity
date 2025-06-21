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
import { useState } from "react";

export default function OnboardingPage() {
  const [selectedTranslation, setSelectedTranslation] = useState("");

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
        <h2 className="text-xl text-grey-primary font-extrabold">
          What is your main Bible Translation?
        </h2>
        <div className="flex justify-center gap-3 flex-wrap w-9/10">
          {translationsData.map((translation, key) => (
            <button
              className={`btn btn-lg flex ${
                // Change color based on selected translation
                selectedTranslation === translation.name
                  ? `${translation.bg_primary_color} text-white border-grey-secondary border-3`
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
          <button className="btn rounded-xl flex justify-center items-center p-3 bg-grey-main w-20">
            <p className="text-md">Next</p>
            <ChevronRightIcon />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
