import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import QuizTest from "./Pages/QuizTest";
import TimeoutPage from "./Pages/TimeoutPage";
import ResultPage from "./Pages/ResultPage";


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/test" element={<QuizTest />} />
        <Route path="/timeout" element={<TimeoutPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </>
  );
}
