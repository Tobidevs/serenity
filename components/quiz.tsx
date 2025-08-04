
import { useBibleQuizStore } from "../store/useBibleQuizStore"
export const Quiz = () => {
  const { generateQuestion } = useBibleQuizStore();

  return (
    <div>
      <h1>Quiz Component</h1>
      <p>This is a simple quiz component.</p>
      
      <button className="btn" onClick={() => generateQuestion()}>Start Quiz</button>
    </div>
  )
}

export default Quiz