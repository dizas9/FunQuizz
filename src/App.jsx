import React, { useState, useEffect } from "react";
import { Routes, Route,Navigate } from "react-router-dom";
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

export default function App() {
  const { auth } = useIsAuth();
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start  h-screen bg-[#3E3232]">
        <div className="w-full">
          <Header />
        </div>
        <div className="mt-16 lg:mt-10 w-full flex flex-col items-center justify-center gap-2">
          <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/upload_image" element={<UploadProfileImage />} />
            <Route path="/test" element={<QuizTest />} />
            <Route path="/timeout" element={<TimeoutPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/contest" element={<ContestPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

//FAF0E6
//F05941
