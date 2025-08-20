"use client";
import { Merriweather } from "next/font/google";
import { useBibleQuizStore } from "../store/useBibleQuizStore";
import { useState } from "react";
import { translationsData, TranslationData } from "../data/translation-data";
import { ChevronRightIcon } from "lucide-react";

// Importing Merriweather font for Bible text styling
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const Quiz = () => {
  const {
    generateVerses,
    verse,
    answerChoices,
    correctAnswer,
    currentQuestion,
  } = useBibleQuizStore();
  const [buttonStyles, setButtonStyles] = useState<TranslationData[]>([]);
  const randomAnswerChoiceStyles = true;
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [clickedChoice, setClickedChoice] = useState<string | null>(null);

  const handleAnswerClick = (choice: string) => {
    setClickedChoice(choice);
    if (choice === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const generateNextQuestion = () => {
    if (randomAnswerChoiceStyles) {
      // Generate random styles for answer choices
      const styles: TranslationData[] = [];
      while (styles.length < 4) {
        const randomStyle =
          translationsData[Math.floor(Math.random() * translationsData.length)];
        if (!styles.includes(randomStyle)) {
          styles.push(randomStyle);
        }
      }
      setButtonStyles(styles);
    } else {
      // Use predefined styles for answer choices
      const styles: TranslationData[] = [];
      const stylesConfig = [0, 2, 4, 6];
      stylesConfig.forEach((idx) => {
        styles.push(translationsData[idx]);
      });
      setButtonStyles(styles);
    }
    // Reset the clicked choice state
    setClickedChoice(null);
    // Reset the isCorrect state for the next question
    setIsCorrect(null);
    // Generate a new question
    generateVerses();
  };

  // Initialize quiz on page load - runs when component first mounts
  // Only initialize if we don't have a verse and no button styles are set
  if (!verse && buttonStyles.length === 0 && currentQuestion === 0) {
    generateNextQuestion();
  }

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
            className={`${
              isCorrect
                ? correctAnswer === choice
                  ? `${buttonStyles[index]?.bg_primary_color} text-white ${
                      clickedChoice === choice ? "pulse-correct" : ""
                    }`
                  : `${buttonStyles[index]?.bg_color} ${buttonStyles[index]?.text_color}`
                : `${buttonStyles[index]?.bg_color} ${buttonStyles[index]?.text_color}`
            } btn h-16 w-full mb-3 flex items-center justify-start border-gray-300 border rounded-2xl shadow-none px-4 text-left text-lg
              ${isCorrect === false && clickedChoice === choice ? "shake" : ""}
            `}
            onClick={() => handleAnswerClick(choice)}
          >
            <span
              className="font-bold w-8 h-8 border flex justify-center items-center rounded-lg mr-2"
              style={{
                borderColor:
                  isCorrect && correctAnswer === choice
                    ? "#fff"
                    : buttonStyles[index]?.text_color?.match(
                        /#(?:[0-9a-fA-F]{3}){1,2}/
                      )?.[0] || "#000",
              }}
            >
              {isCorrect !== null && clickedChoice === choice
                ? correctAnswer === choice
                  ? "✓"
                  : "✘"
                : String.fromCharCode(65 + index)}
            </span>
            {choice}
          </button>
        ))}
      </div>
      <div className="mt-4 w-full flex justify-end">
        <button
          className={
            "btn rounded-xl flex justify-center border border-gray-300 shadow-none items-center p-3 bg-grey-main w-fit"
          }
          onClick={() => generateNextQuestion()}
        >
          <p className="text-md text-grey-primary">Next Question</p>
          <ChevronRightIcon className="text-grey-primary" />
        </button>
      </div>
    </div>
  );
};

export default Quiz;
