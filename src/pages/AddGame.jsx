import AnswerButton from "../components/AnswerButton";
import GameTitle from "../components/GameTitle";
import { MainLayout } from "../components/MainLayout";
import NewQuestionButton from "../components/NewQuestionButton";
import { useExam } from "../hooks/useExam";


const AddGame = ({ mathType }) => {
  const { num1, num2, timeLeft, expression, options, showModal, showConfetti, message, history, generateQuestion, checkAnswer, title, onClose } = useExam({
    mathType: mathType
  })

  return (
    <MainLayout
      config={{ showModal, num1, num2, showConfetti }}
      history={history}
      onClose={onClose}
      type="addition"
    >
      <GameTitle title={title} />

      <p
        className={`text-2xl font-semibold mb-4 ${timeLeft <= 3 ? "text-red-500" : "text-black"
          }`}
      >
        ⏳ Time Left: {timeLeft}s
      </p>


      <p className="font-extrabold text-blue-600 mb-6">
        <div className="text-4xl">What is</div>
        <div className="text-6xl my-5">
          {expression}
        </div>
      </p>

      {options.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {options.map((option, index) => (
            <AnswerButton key={index} value={option} onClick={checkAnswer} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Loading options...</p>
      )}

      <p className="text-3xl font-semibold">{message}</p>

      <NewQuestionButton onClick={generateQuestion} />
    </MainLayout>
  );
};

export default AddGame;
