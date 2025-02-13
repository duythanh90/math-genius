import { motion } from "framer-motion";

const AnswerButton = ({ value, onClick }) => {
  return (
    <motion.button
      key={value} // Ensures animation triggers when new question is generated
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      whileTap={{ scale: 0.9 }} // Adds a tap effect when clicked
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="py-4 px-6 bg-blue-500 hover:bg-blue-600 text-white text-2xl rounded-md"
      onClick={() => onClick(value)}
    >
      {value}
    </motion.button>
  );
};

export default AnswerButton;
