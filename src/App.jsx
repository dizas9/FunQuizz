import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import QuizTest from "./Pages/QuizTest";
import TimeoutPage from "./Pages/TimeoutPage";
import ResultPage from "./Pages/ResultPage";
import Register from "./Pages/Register";
import Header from "./components/Header";
import Login from "./Pages/login";
import useIsAuth from "./hooks/AuthCheck";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./components/protected";
import UploadProfileImage from "./components/UploadProfileImage";
import ContestPage from "./BCSquizes/ContestPage";
import TriviaAPI from "./Pages/TriviaAPI";
import WarmUp from "./components/WarmUp";
import PracticePage from "./BCSquizes/PracticePage";

export default function App() {
  const { auth } = useIsAuth();
  const location = useLocation();
  const showHeader = location.pathname !== "/result";
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start  h-screen bg-[#3E3232]">
        <div className="w-full">
          {/* Render Header if the route is not TimeoutPage */}
          {showHeader && <Header />}
        </div>
        <div className="mt-16 lg:mt-10 w-full flex flex-col items-center justify-center gap-2 overflow-auto">
          <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute message="Session expire or Register">
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/upload_image" element={<UploadProfileImage />} />
            <Route path="/test" element={<QuizTest />} />
            <Route path="/trivia" element={<TriviaAPI />} />
            <Route path="/bcsPractice" element={<WarmUp />} />
            <Route path="/timeout" element={<TimeoutPage />} />
            <Route path="/result" element={<ResultPage />} />

            <Route
              path="/contest/:name"
              element={
                <PrivateRoute
                  message={"You need Login or Register to perticipate quiz"}
                >
                  <ContestPage />
                </PrivateRoute>
              }
            />

            <Route path="/practice/:name" element={<PracticePage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

//FAF0E6
//F05941
