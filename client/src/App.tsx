import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WorkoutSetInstance from './pages/WorkoutSetInstance';
import Speech from './pages/Speech';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workout-set-instances/:id" element={<WorkoutSetInstance />} />
        <Route path="/speech" element={<Speech />} />
      </Routes>
    </Router>
  );
}

export default App;
