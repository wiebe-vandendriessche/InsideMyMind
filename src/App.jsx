import React from 'react';
import HomePage from './routes/HomePage';
import { HashRouter  as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        {/* Home route with the brain animation */}
        <Route path="/" element={<HomePage />} />

        {/* Add other pages such as portfolio or skills */}


        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;