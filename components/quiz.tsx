"use client";
import { Merriweather } from "next/font/google";
import { useBibleQuizStore } from "../store/useBibleQuizStore";
import { useState } from "react";
import { translationsData, TranslationData } from "../data/translation-data";

// Importing Merriweather font for Bible text styling
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const Quiz = () => {
  const { generateVerses, verse, answerChoices, correctAnswer } =
    useBibleQuizStore();
  const [buttonStyles, setButtonStyles] = useState<TranslationData[]>([]);

  const generateNextQuestion = () => {
    // Set button styles based on the translations data
    const styles: TranslationData[] = [];
    const stylesConfig = [0, 2, 4, 6];
    stylesConfig.forEach(idx => {
      styles.push(translationsData[idx]);
    });
    setButtonStyles(styles);
    // Generate a new question
    generateVerses();
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className={`${merriweather.className} leading-relaxed text-xl`}>
        {verse && (
          <span
            dangerouslySetInnerHTML={{
              __html: `“${verse.replaceAll(/<\/?(S|mark)>/g, "")}”`,
            }}
          />
        )}
      </p>

      <div className="flex flex-col items-center mt-8 w-9/10">
        {answerChoices?.map((choice, index) => (
          <button
            key={index}
            className={`${buttonStyles[index]?.bg_color} ${buttonStyles[index]?.text_color} btn h-16 w-full mb-3 flex items-center justify-start border-gray-300 border rounded-2xl shadow-none px-4 text-left text-lg`}
            style={{
              borderColor:
                buttonStyles[index]?.text_color?.match(
                  /#(?:[0-9a-fA-F]{3}){1,2}/
                )?.[0] || "#000",
            }}
            onClick={() => {
              if (choice === correctAnswer) {
                alert("Correct!");
              } else {
                alert("Incorrect, try again!");
              }
            }}
          >
            <span
              className={`font-bold w-8 h-8 border flex justify-center items-center rounded-lg mr-2`}
              style={{
                borderColor:
                  buttonStyles[index]?.text_color?.match(
                    /#(?:[0-9a-fA-F]{3}){1,2}/
                  )?.[0] || "#000",
              }}
            >
              {String.fromCharCode(65 + index)}
            </span>
            {choice}
          </button>
        ))}
      </div>

      <button className="btn" onClick={() => generateNextQuestion()}>
        next
      </button>
    </div>
  );
};

export default Quiz;
