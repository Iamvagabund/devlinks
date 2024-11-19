import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PreviewPage from "./components/PreviewPage";
import MainPage from "./components/MainPage";
import "./App.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
