import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WorkoutSetInstance from './pages/WorkoutSetInstance';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/workout-set-instances/:id" element={<WorkoutSetInstance />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
