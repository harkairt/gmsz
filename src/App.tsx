import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './pages/Home';
import Alapfogalmak from './pages/Alapfogalmak';
import Tervezes from './pages/Tervezes';
import Kockazat from './pages/Kockazat';
import Eroforrasok from './pages/Eroforrasok';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-light">
        <Header />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/alapfogalmak" element={<Alapfogalmak />} />
              <Route path="/eroforrasok" element={<Eroforrasok />} />
              <Route path="/tervezes" element={<Tervezes />} />
              <Route path="/kockazat" element={<Kockazat />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
