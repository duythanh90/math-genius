import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import Home from './pages/Home';
import MathGame from './pages/MathGame';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<MathGame mathType="ADD" />} />
          <Route path="/subtract" element={<MathGame mathType="SUBTRACT" />} />
          <Route path="/multiply" element={<MathGame mathType="MULTIPLY" />} />
          <Route path="/divide" element={<MathGame mathType="DIVIDE" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
