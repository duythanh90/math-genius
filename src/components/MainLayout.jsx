import AnswerModal from "./AnswerModal";
import HistoryPanel from "./HistoryPanel";
import { Yeah } from "./Yeah";

export const MainLayout = ({
  children,
  history,
  onClose,
  type,
  config = {
    showModal,
    num1,
    num2,
    showConfetti
  },
}) => {
  const { showModal, num1, num2, showConfetti } = config;


  const getCorrectAnswer = () => {
    switch (type) {
      case "subtraction":
        return num1 - num2;
      case "multiplication":
        return num1 * num2;
      case "division":
        return (num1 / num2).toFixed(0);
      default:
        return num1 + num2;
    }
  };

  return (
    <>
      <Yeah open={showConfetti} />
      <div className="grid md:grid-cols-3 xl:grid-cols-4 w-full bg-gray-50">
        <div className="md:col-span-2 xl:col-span-3">
          <div className="flex justify-center items-center flex-col">
            <img src="/images/mock.jpg" alt="Game" className="w-2/5 xl:w-1/5 my-4" />
            <div className="p-4 w-full">
              <div className="justify-center bg-white shadow-sm rounded-lg p-10 w-full text-center border r">
                {children}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <HistoryPanel history={history} />
        </div>
        <AnswerModal
          isOpen={showModal}
          correctAnswer={getCorrectAnswer()}
          onClose={onClose}
        />
      </div>
    </>
  );
};
