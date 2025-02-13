import AnswerModal from "./AnswerModal";
import HistoryPanel from "./HistoryPanel";

export const MainLayout = ({
  children,
  history,
  onClose,
  type,
  config = {
    showModal,
    num1,
    num2,
  },
}) => {
  const { showModal, num1, num2 } = config;

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
      <div className="grid grid-cols-3 w-full bg-gray-50">
        <div className="col-span-2">
          <div className="flex justify-center items-center pt-20 flex-col">
            <img src="/images/mock.jpg" alt="Game" className="h-[250px] mb-4" />
            <div className="justify-center bg-white shadow-lg rounded-lg p-10 w-full max-w-lg text-center">
              {children}
            </div>
          </div>
        </div>
        <HistoryPanel history={history} />
        <AnswerModal
          isOpen={showModal}
          correctAnswer={getCorrectAnswer()}
          onClose={onClose}
        />
      </div>
      );
    </>
  );
};
