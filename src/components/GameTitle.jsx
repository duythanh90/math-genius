import PropTypes from 'prop-types';

const GameTitle = ({ title }) => {
  return <h1 className="text-4xl font-bold mb-6">{title}</h1>;
};

GameTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default GameTitle;
