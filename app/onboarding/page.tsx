import Image from "next/image";
import logo from "../../public/Figma Vector.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function OnboardingPage() {


    const translations = [
        {
            name: "KJV (King James Version)",
            color: "bg-[#ffecec]",
            text_color: "text-[#802122]"
        },
        {
            name: "NKJV (New King James Version)",
            color: "bg-[#fff0e6]",
            text_color: "text-[#803900]"
        },
        {
            name: "ESV (English Standard Version)",
            color: "bg-[#fef1a4]",
            text_color: "text-[#817124]"
        },
        {
            name: "NIV (New International Version)",
            color: "bg-[#e9faeb]",
            text_color: "text-[#116519]"
        },
        {
            name:"NASB (New American Standard Bible)",
            color: "bg-[#e6f2ff]",
            text_color: "text-[#003d80]"
        },
        {
            name: "NLT (New Living Translation)",
            color: "bg-[#f3edff]",
            text_color: "text-[#462380]"
        },
        {
            name: "CSB (Christian Standard Bible)",
            color: "bg-[#fee8fc]",
            text_color: "text-[#7c0e73]"
        }
    ]


  return (
    <Card className="w-3/6 h-3/6 mx-auto container flex gap-17 flex-col bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-grey-600">
          Welcome To Serenity!
        </CardTitle>
        <CardDescription className="text-grey-400 text-lg ">
          We're excited you're here. Let’s set a few preferences to personalize
          your Bible study experience.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-5 flex-col">
        <h2 className="text-xl text-grey-600 font-extrabold">What is your main Bible Translation?</h2>
        <div className="flex justify-center gap-3 flex-wrap w-9/10">
            {translations.map((translation) => (
                <button className={`btn btn-lg flex ${translation.color} flex-wrap w-80 h-17 rounded-2xl border`}>
                    <h2 className={`${translation.text_color}  font-bold`}>{translation.name}</h2>
                </button>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
