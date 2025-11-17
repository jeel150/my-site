import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/Styles/App.css";
import Landing from "./component/Landing.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
