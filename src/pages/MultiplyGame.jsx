import { useState, useEffect } from "react";
import GameTitle from "../components/GameTitle";
import QuestionDisplay from "../components/QuestionDisplay";
import AnswerButton from "../components/AnswerButton";
import NewQuestionButton from "../components/NewQuestionButton";
import { MainLayout } from "../components/MainLayout";

const TIME_LIMIT = 20; // ✅ Set answer time to 20 seconds

const getRandomNumber = () => Math.floor(Math.random() * 10) + 1;

const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");
const timeoutSound = new Audio("/sounds/timeout.mp3");
const tickingBomb = new Audio("/sounds/ticking-bomb.mp3");

const MultiplyGame = () => {
  const [num1, setNum1] = useState(getRandomNumber());
  const [num2, setNum2] = useState(getRandomNumber());
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function playSound(sound) {
    if (!sound.paused) {
      sound.pause();
      sound.currentTime = 0;
    }
    sound.play();
  }


  useEffect(() => {
    generateOptions();
  }, [num1, num2]);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      if (timeLeft === 4) {
        playSound(tickingBomb);
      }
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      setMessage("⏳ Time Out!");
      setIsAnswered(true);
      setShowModal(true);
      playSound(timeoutSound);

      setHistory((prev) => [
        {
          question: `${num1} × ${num2}`,
          answer: "Time Out",
          correct: "⏳ Time Out!",
        },
        ...prev.slice(0, 4),
      ]);
    }
  }, [timeLeft, isAnswered]);

  const generateOptions = () => {
    const correctAnswer = num1 * num2;
    let newOptions = new Set();
    newOptions.add(correctAnswer);

    while (newOptions.size < 4) {
      let randomAnswer = getRandomNumber() * getRandomNumber();
      if (randomAnswer !== correctAnswer) {
        newOptions.add(randomAnswer);
      }
    }

    setOptions(Array.from(newOptions).sort(() => Math.random() - 0.5));
  };

  const generateQuestion = () => {
    setNum1(getRandomNumber());
    setNum2(getRandomNumber());
    setMessage("");
    setTimeLeft(TIME_LIMIT); // ✅ Reset to 20 seconds
    setIsAnswered(false);
    setShowModal(false);
  };

  const checkAnswer = (selectedAnswer) => {
    if (isAnswered) return;

    const correctAnswer = num1 * num2;
    const result = selectedAnswer === correctAnswer ? "✅ Correct" : "❌ Wrong";

    setMessage(result);
    setIsAnswered(true);

    if (selectedAnswer === correctAnswer) {
      playSound(correctSound);
    } else {
      playSound(wrongSound);
    }

    setHistory((prev) => [
      {
        question: `${num1} × ${num2}`,
        answer: selectedAnswer,
        correct: result,
      },
      ...prev.slice(0, 4),
    ]);
  };

  return (
    <MainLayout config={{ showModal, num1, num2 }} history={history} onClose={() => setShowModal(false)} type="multiplication">
      <GameTitle title="Multiplication Game 🎲" />

      <p
        className={`text-2xl font-semibold mb-4 ${
          timeLeft <= 3 ? "text-red-500" : "text-black"
        }`}
      >
        ⏳ Time Left: {timeLeft}s
      </p>

      <QuestionDisplay operator="×" num1={num1} num2={num2} />

      {/* Answer Options */}
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

export default MultiplyGame;
