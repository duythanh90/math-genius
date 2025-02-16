import { useEffect, useState, useCallback } from "react";

const getRandomNumber = (min = 1, max = 10) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const TIME_LIMIT = 20; // Set answer time limit (20 seconds)


const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");
const timeoutSound = new Audio("/sounds/timeout.mp3");
const tickingBomb = new Audio("/sounds/ticking-bomb.mp3");
const streakSound = new Audio("/sounds/tada.mp3");

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

    const getExpression = useCallback(() => {
        return `${num1} ${expressionOperator[mathType]} ${num2}`;
    }, [num1, num2, mathType]);

    useEffect(() => {
        generateOptions();
    }, [mathType, num1, num2]);

    useEffect(() => {
        return () => {
            // Cleanup audio on unmount
            [correctSound, wrongSound, timeoutSound, tickingBomb, streakSound].forEach(sound => {
                sound.pause();
                sound.currentTime = 0;
            });
        };
    }, []);

    function playSound(sound) {
        if (!sound.paused) {
            sound.pause();
            sound.currentTime = 0;
        }
        sound.play().catch(error => {
            console.warn('Audio playback failed:', error);
        });
    }

    useEffect(() => {
        if (streak && streak % 5 === 0) {
            setShowConfetti(true);
            playSound(streakSound);
        }
    }, [streak]);

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
                    question: getExpression(),
                    answer: "Time Out",
                    correct: "⏳ Time Out!",
                },
                ...prev.slice(0, 1000),
            ]);
        }
    }, [timeLeft, isAnswered, num1, num2, mathType, getExpression]);

    const calculate = ({ type, num1, num2 }) => {
        switch (type) {
            case "ADD":
                return num1 + num2;
            case "SUBTRACT":
                return num1 - num2;
            case "MULTIPLY":
                return num1 * num2;
            case "DIVIDE":
                return num1 / num2; // num1 is always a multiple of num2
            default:
                throw new Error("Invalid math type");
        }
    };

    const generateOptions = () => {
        const correctAnswer = calculate({
            type: mathType,
            num1,
            num2
        });

        let newOptions = new Set();
        newOptions.add(correctAnswer);

        while (newOptions.size < 4) {
            let randomNum1;
            let randomNum2;

            if (mathType === "DIVIDE") {
                randomNum1 = getRandomNumber();
                randomNum2 = getRandomNumber(2, 10);
                randomNum1 = randomNum2 * getRandomNumber(2, 10); // Ensures integer division
            } else if (mathType === "SUBTRACT") {
                randomNum1 = getRandomNumber(1, 100);
                randomNum2 = getRandomNumber(1, 100);
                [randomNum1, randomNum2] = ensureNum1Greater(randomNum1, randomNum2);
            } else if (mathType === "MULTIPLY") {
                randomNum1 = getRandomNumber(1, 10);
                randomNum2 = getRandomNumber(1, 10);
            } else if (mathType === "ADD") {
                randomNum1 = getRandomNumber(1, 100);
                randomNum2 = getRandomNumber(1, 100);
            }

            let randomAnswer = calculate({
                type: mathType,
                num1: randomNum1,
                num2: randomNum2
            });

            if (randomAnswer !== correctAnswer && Number.isInteger(randomAnswer)) {
                newOptions.add(randomAnswer);
            }
        }

        setOptions(Array.from(newOptions).sort(() => Math.random() - 0.5));
    };

    const generateQuestion = () => {
        let _num1;
        let _num2;

        if (mathType === "DIVIDE") {
            _num1 = getRandomNumber();
            _num2 = getRandomNumber(2, 10);
            _num1 = _num2 * getRandomNumber(2, 10); // Ensures integer division
        }
        else if (mathType === "SUBTRACT") {
            _num1 = getRandomNumber(1, 100);
            _num2 = getRandomNumber(1, 100);
            [_num1, _num2] = ensureNum1Greater(_num1, _num2);
        }
        else if (mathType === "MULTIPLY") {
            _num1 = getRandomNumber(1, 10);
            _num2 = getRandomNumber(1, 10);
        }
        else if (mathType === "ADD") {
            _num1 = getRandomNumber(1, 100);
            _num2 = getRandomNumber(1, 100);
        }

        setNum1(_num1);
        setNum2(_num2);

        setMessage("");
        setTimeLeft(TIME_LIMIT);
        setIsAnswered(false);
        setShowModal(false);
    };

    // Helper function to ensure num1 is always greater than num2
    const ensureNum1Greater = (num1, num2) => {
        return num1 >= num2 ? [num1, num2] : [num2, num1]; 
    };

    const checkAnswer = (selectedAnswer) => {
        if (isAnswered) return;

        const correctAnswer = calculate({
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

        let mathSymbol = '';
        switch (mathType) {
            case 'ADD':
                mathSymbol = '+';
                break;
            case 'SUBTRACT':
                mathSymbol = '-';
                break;
            case 'MULTIPLY':
                mathSymbol = 'x';
                break;
            case 'DIVIDE':
                mathSymbol = '÷';
                break;
            default:
                break;
        }

        setHistory((prev) => [
            {
                question: `${num1} ${mathSymbol} ${num2}`,
                answer: selectedAnswer,
                correct: result,
            },
            ...prev.slice(0, 1000),
        ]);
    };

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