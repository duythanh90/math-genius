import { useState, useEffect } from "react";
import GameTitle from "../components/GameTitle";
import QuestionDisplay from "../components/QuestionDisplay";
import AnswerButton from "../components/AnswerButton";
import NewQuestionButton from "../components/NewQuestionButton";
import { MainLayout } from "../components/MainLayout";

const TIME_LIMIT = 20; // 20 seconds to answer
const getRandomNumber = () => Math.floor(Math.random() * 9) + 1; // Numbers 1-9 (Avoiding 0)

const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");
const timeoutSound = new Audio("/sounds/timeout.mp3");
const tickingBomb = new Audio("/sounds/ticking-bomb.mp3");

const DivideGame = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(1);
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
    generateNewQuestion(); // ✅ Generate first question when component mounts
  }, []);

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
          question: `${num1} ÷ ${num2}`,
          answer: "Time Out",
          correct: "⏳ Time Out!",
        },
        ...prev.slice(0, 4),
      ]);
    }
  }, [timeLeft, isAnswered]);

  const generateNewQuestion = () => {
    let newNum2 = getRandomNumber();
    let newNum1 = newNum2 * getRandomNumber(); // Ensure perfect division (no decimals)

    setNum1(newNum1);
    setNum2(newNum2);
    setOptions(generateOptions(newNum1, newNum2));
    setMessage("");
    setTimeLeft(TIME_LIMIT);
    setIsAnswered(false);
    setShowModal(false);
  };

  const generateOptions = (newNum1, newNum2) => {
    const correctAnswer = newNum1 / newNum2; // Guaranteed integer
    let newOptions = new Set();
    newOptions.add(correctAnswer);

    while (newOptions.size < 4) {
      let randomAnswer = getRandomNumber();
      if (randomAnswer !== correctAnswer) {
        newOptions.add(randomAnswer);
      }
    }
    return Array.from(newOptions).sort(() => Math.random() - 0.5);
  };

  const checkAnswer = (selectedAnswer) => {
    if (isAnswered) return;

    const correctAnswer = num1 / num2;
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
        question: `${num1} ÷ ${num2}`,
        answer: selectedAnswer,
        correct: result,
      },
      ...prev.slice(0, 4),
    ]);
  };

  return (
    <MainLayout config={{ showModal, num1, num2 }} history={history} onClose={() => setShowModal(false)} type="division">
      <GameTitle title="Division Game ➗" />
      <p
        className={`text-2xl font-semibold mb-4 ${timeLeft <= 3 ? "text-red-500" : "text-black"}`}
      >
        ⏳ Time Left: {timeLeft}s
      </p>
      <QuestionDisplay operator="÷" num1={num1} num2={num2} />
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
      <NewQuestionButton onClick={generateNewQuestion} />
    </MainLayout>
  );
};

export default DivideGame;
