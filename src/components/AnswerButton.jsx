const AnswerButton = ({ value, onClick }) => {
  return (
    <button
      className="py-4 px-6 bg-blue-500 hover:bg-blue-600 text-white text-2xl rounded-md"
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default AnswerButton;
