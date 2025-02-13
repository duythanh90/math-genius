import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import AddGame from "./pages/AddGame";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/add" element={<AddGame mathType="ADD" />} />
          <Route path="/subtract" element={<AddGame mathType="SUBTRACT" />} />
          <Route path="/multiply" element={<AddGame mathType="MULTIPLY" />} />
          <Route path="/divide" element={<AddGame mathType="DIVIDE" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
