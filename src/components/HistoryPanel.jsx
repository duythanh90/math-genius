import { motion, AnimatePresence } from "framer-motion";

const listVariants = {
  hidden: { opacity: 0, y: 20 }, // Push all tiles down initially
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.05, duration: 0.3, ease: "easeOut" },
  }),
  exit: { opacity: 0, y: 20 }, // Push down on exit
};

const firstItemVariant = {
  hidden: { opacity: 0, x: 50 }, // Slide from right
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: 50 }, // Slide out to right when removed
};

const HistoryPanel = ({ history }) => {
  return (
    <div className="p-5 top-0 right-0 sticky h-screen bg-gray-100 border-l overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">📜 Answer History</h2>
      <ul className="space-y-3">
        <AnimatePresence>
          {history.length === 0 ? (
            <p className="text-gray-500">No history yet.</p>
          ) : (
            history.map((item, index) => (
              <motion.li
                key={index}
                custom={index}
                variants={index === 0 ? firstItemVariant : listVariants} // First item gets unique animation
                initial="hidden"
                animate="visible"
                exit="exit"
                className="p-3 bg-white shadow rounded-md"
              >
                <p className="text-lg font-semibold">
                  {item.question} = {item.answer}
                </p>
                <p
                  className={
                    item.correct.includes("✅")
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {item.correct}
                </p>
              </motion.li>
            ))
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default HistoryPanel;
