import { Merriweather } from "next/font/google";
import { useBibleQuizStore } from "../store/useBibleQuizStore";

// Importing Merriweather font for Bible text styling
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const Quiz = () => {
  const { generateVerses, verse, answerChoices, correctAnswer } =
    useBibleQuizStore();

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className={`${merriweather.className} leading-relaxed`}>
        {verse && (
          <span
            dangerouslySetInnerHTML={{
              __html: `${verse.replaceAll(/<\/?(S|mark)>/g, "")}`,
            }}
          />
        )}
      </p>
      <div className="flex flex-col items-center mt-4">
        {answerChoices?.map((choice, index) => (
          <button
            key={index}
            className="btn mb-2"
            onClick={() => {
              if (choice === correctAnswer) {
                alert("Correct!");
              } else {
                alert("Incorrect, try again!");
              }
            }}
          >
            {choice}
          </button>
        ))}
      </div>

      <button className="btn" onClick={() => generateVerses()}>
        next
      </button>
    </div>
  );
};

export default Quiz;
