
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Philosophy from './pages/Philosophy';
import Resume from './pages/Resume';
import Works from './pages/Works';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Philosophy />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/works" element={<Works />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        
        <footer className="py-20 border-t border-white/5 text-center text-neutral-600">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-sm font-mono tracking-widest uppercase mb-4">Crafting Immersive Audio Systems</p>
            <p className="text-xs">© {new Date().getFullYear()} Sound Designer Portfolio. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
