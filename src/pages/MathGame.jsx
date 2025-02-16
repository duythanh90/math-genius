import AnswerButton from "../components/AnswerButton";
import GameTitle from "../components/GameTitle";
import { MainLayout } from "../components/MainLayout";
import NewQuestionButton from "../components/NewQuestionButton";
import { useExam } from "../hooks/useExam";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from 'prop-types';

const MathGame = ({ mathType }) => {
  const {
    num1,
    num2,
    timeLeft,
    expression,
    options,
    showModal,
    showConfetti,
    message,
    history,
    generateQuestion,
    checkAnswer,
    title,
    onClose,
  } = useExam({
    mathType: mathType,
  });

  return (
    <MainLayout
      config={{ showModal, num1, num2, showConfetti }}
      history={history}
      onClose={onClose}
      type="addition"
    >
      <GameTitle title={title} />

      <p
        className={`text-2xl font-semibold mb-4 ${
          timeLeft <= 3 ? "text-red-500" : "text-black"
        }`}
      >
        ⏳ Time Left: {timeLeft}s
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={expression} // Ensure animation triggers when expression changes
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="font-extrabold text-blue-600 mb-6">
            <div className="text-4xl">What is</div>
            <div className="text-6xl my-5">{expression}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      {options.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <AnimatePresence mode="wait">
            {" "}
            {/* Ensures smooth transition */}
            {options.map((option) => (
              <AnswerButton
                key={`${expression}-${option}`}
                value={option}
                onClick={checkAnswer}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p className="text-gray-500">Loading options...</p>
      )}

      <p className="text-3xl font-semibold">{message}</p>

      <NewQuestionButton onClick={generateQuestion} />
    </MainLayout>
  );
};

MathGame.propTypes = {
  mathType: PropTypes.string.isRequired
};

export default MathGame;
