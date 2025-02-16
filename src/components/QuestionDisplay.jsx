import PropTypes from 'prop-types';

const QuestionDisplay = ({ num1, num2, operator }) => {
  return (
    <div className="font-extrabold text-blue-600 mb-6">
      <div className="text-4xl">What is</div>
      <div className="text-6xl my-5">
        {num1} {operator} {num2}?
      </div>
    </div>
  );
};

QuestionDisplay.propTypes = {
  num1: PropTypes.number.isRequired,
  num2: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired
};

export default QuestionDisplay;
