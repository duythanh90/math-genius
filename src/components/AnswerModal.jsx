const AnswerModal = ({ isOpen, correctAnswer, onClose }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-xl font-bold mb-3">⏳ Time Out!</h2>
        <p className="text-lg">The correct answer was:</p>
        <p className="text-2xl font-bold text-green-600 mt-2">
          {correctAnswer}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default AnswerModal;
