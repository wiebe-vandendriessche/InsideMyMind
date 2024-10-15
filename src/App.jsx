import React from 'react';
import HomePage from './routes/HomePage';
import Portfolio from './routes/Portfolio';
import { BrowserRouter  as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        {/* Home route with the brain animation */}
        <Route path="/InsideMyMind" element={<HomePage />} />

        {/* Add other pages such as portfolio or skills */}
        <Route path="/InsideMyMind/portfolio" element={<Portfolio />} />


        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;