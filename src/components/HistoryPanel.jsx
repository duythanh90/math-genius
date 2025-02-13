const HistoryPanel = ({ history }) => {
  return (
    <div className="p-5 top-0 right-0 h-screen bg-gray-100 shadow-lg border-l overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">📜 Answer History</h2>
      <ul className="space-y-3">
        {history.length === 0 ? (
          <p className="text-gray-500">No history yet.</p>
        ) : (
          history.map((item, index) => (
            <li key={index} className="p-3 bg-white shadow rounded-md">
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
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default HistoryPanel;
