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
            className="btn h-16 w-full mb-2 flex items-center justify-start px-4 text-left text-lg"
            onClick={() => {
              if (choice === correctAnswer) {
                alert("Correct!");
              } else {
                alert("Incorrect, try again!");
              }
            }}
          >
            <span className="font-bold w-8 h-8 border flex justify-center items-center border-black rounded-lg mr-2">
              {String.fromCharCode(65 + index)}
            </span>
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
