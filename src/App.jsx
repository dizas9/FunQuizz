import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import QuizTest from "./Pages/QuizTest";
import TimeoutPage from "./Pages/TimeoutPage";
import ResultPage from "./Pages/ResultPage";
import Register from "./Pages/Register";
import Header from "./components/Header";
import User from "./components/User";
import Login from "./Pages/login";

export default function App() {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start  h-screen bg-[#3E3232]">
        <div className="w-full h-fit py-2 px-2">
          <User />
        </div>
        <div className="w-full">
          <Header />
        </div>
        <div className="mt-32 lg:mt-28">
          <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/test" element={<QuizTest />} />
            <Route path="/timeout" element={<TimeoutPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

//FAF0E6
//F05941
