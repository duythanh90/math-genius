const QuestionDisplay = ({ num1, num2, operator }) => {
  return (
    <p className="font-extrabold text-blue-600 mb-6">
      <div className="text-4xl">What is</div>
      <div className="text-6xl my-5">
        {num1} {operator} {num2}?
      </div>
    </p>
  );
};

export default QuestionDisplay;
