import { useEffect, useState } from "react";

const getRandomNumber = () => Math.floor(Math.random() * 100) + 1; // Numbers from 1 to 100
const TIME_LIMIT = 20; // Set answer time limit (20 seconds)


const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");
const timeoutSound = new Audio("/sounds/timeout.mp3");
const tickingBomb = new Audio("/sounds/ticking-bomb.mp3");
const streakSound = new Audio("/sounds/tada.mp3");

const operators = {
    ADD: (num1, num2) => { return num1 + num2 },
    SUBTRACT: (num1, num2) => { return num1 - num2 },
    MULTIPLY: (num1, num2) => { return num1 * num2 },
    DIVIDE: (num1, num2) => { return num1 / num2 }

}

const titleOptions = {
    ADD: "Addition game",
    SUBTRACT: "Subtraction game",
    MULTIPLY: "Multiply game",
    DIVIDE: "Divide game"
}

const expressionOperator = {
    ADD: "+",
    SUBTRACT: "-",
    MULTIPLY: "x",
    DIVIDE: "÷"
}
export const useExam = ({
    mathType
}) => {
    const [num1, setNum1] = useState(getRandomNumber());
    const [num2, setNum2] = useState(getRandomNumber());
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState([]);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [streak, setStreak] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        generateOptions();
    }, [num1, num2]);

    function playSound(sound) {
        if (!sound.paused) {
            sound.pause();
            sound.currentTime = 0;
        }
        sound.play();
    }

    useEffect(() => {
        if (streak && streak % 5 == 0) {
            setShowConfetti(true);
            playSound(streakSound)
        }
    }, [streak])

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
            setStreak(0);

            playSound(timeoutSound);

            setHistory((prev) => [
                {
                    question: `${num1} ${mathType} ${num2}`,
                    answer: "Time Out",
                    correct: "⏳ Time Out!",
                },
                ...prev.slice(0, 4),
            ]);
        }
    }, [timeLeft, isAnswered]);

    const generateOptions = () => {
        const correctAnswer = calulate({
            type: mathType,
            num1,
            num2
        })
        let newOptions = new Set();
        newOptions.add(correctAnswer);

        while (newOptions.size < 4) {
            let randomAnswer = calulate({
                type: mathType,
                num1: getRandomNumber(),
                num2: getRandomNumber()
            });
            if (randomAnswer !== correctAnswer) {
                newOptions.add(randomAnswer);
            }
        }

        setOptions(Array.from(newOptions).sort(() => Math.random() - 0.5));
    };

    const generateQuestion = () => {
        let _num1;
        let _num2 = getRandomNumber();
        if (mathType == "DIVIDE") {
            _num1 = _num2 * getRandomNumber(); 
        } else {
            _num1 = getRandomNumber();
        }

        setNum1(_num1);
        setNum2(_num2)

        setMessage("");
        setTimeLeft(TIME_LIMIT);
        setIsAnswered(false);
        setShowModal(false);
    };

    const checkAnswer = (selectedAnswer) => {
        if (isAnswered) return;

        const correctAnswer = calulate({
            type: mathType,
            num1,
            num2
        });

        const result = selectedAnswer === correctAnswer ? "✅ Correct" : "❌ Wrong";

        setMessage(result);
        setIsAnswered(true);

        if (selectedAnswer === correctAnswer) {
            setStreak(streak + 1);
            playSound(correctSound);
        } else {
            playSound(wrongSound);
            setShowConfetti(false);
            setStreak(0);
        }

        setHistory((prev) => [
            {
                question: `${num1} ${mathType} ${num2}`,
                answer: selectedAnswer,
                correct: result,
            },
            ...prev.slice(0, 4),
        ]);
    };

    const calulate = ({
        type,
        num1,
        num2
    }) => {
        const func = operators[type];
        return func(num1, num2);
    }

    const getExpression = () => {
        return `${num1} ${expressionOperator[mathType]} ${num2}`
    }

    return {
        num1,
        num2,
        options,
        message,
        onClose: () => setShowModal(false),
        history,
        showModal,
        showConfetti,
        generateQuestion,
        checkAnswer,
        playSound,
        timeLeft,
        title: titleOptions[mathType],
        expression: getExpression()
    }
}