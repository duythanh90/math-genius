import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AddGame from "./pages/AddGame";
import SubtractGame from "./pages/SubtractGame";
import MultiplyGame from "./pages/MultiplyGame";
import DivideGame from "./pages/DivideGame";

function App() {
  return (
    <Router>
      <div className="grid grid-cols-5 h-screen">
        <Sidebar />
        <div className="col-span-4 w-full">
          <Routes>
            <Route path="/add" element={<AddGame />} />
            <Route path="/subtract" element={<SubtractGame />} />
            <Route path="/multiply" element={<MultiplyGame />} />
            <Route path="/divide" element={<DivideGame />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
