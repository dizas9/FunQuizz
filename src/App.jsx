import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import QuizTest from "./Pages/QuizTest";
import TimeoutPage from "./Pages/TimeoutPage";
import ResultPage from "./Pages/ResultPage";


export default function App() {
  return (
    <body className="bg-[#3E3232] w-screen text-[#FAF0E6] font-Noto">
      <div className="flex justify-center flex-col items-center">
        <div className="bg-[#3E3232] py-10 flex flex-col items-center fixed w-screen top-0">
          <p className="font-stalin text-3xl lg:text-5xl text-[#F5E8C7]">
            FunQuizz
          </p>
          <p className="font-[100] text-sm lg:text-[1.2rem] text-yellow-300 lg:pt-5">
            Quiz, Learn, Thrive, Repeat, Enjoy
          </p>
        </div>
      </div>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/test" element={<QuizTest />} />
        <Route path="/timeout" element={<TimeoutPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </body>
  );
}

//FAF0E6
//F05941
