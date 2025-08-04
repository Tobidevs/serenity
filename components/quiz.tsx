import { useBibleQuizStore } from "../store/useBibleQuizStore";
export const Quiz = () => {
  const { generateVerses, verse, answerChoices, correctAnswer } =
    useBibleQuizStore();

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div>"{verse}"</div>
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
