/**
 * TimeoutPage component for handling timeout functionality.
 *
 * Displays a timeout message and provides an option to navigate back to the main page.
 * Uses React Router for navigation control.
 *
 * @component
 * @return {JSX.Element}
 */

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

export default function TimeoutPage() {
  const Navigate = useNavigate();
  const location = useLocation();
  const fromTimeOut = location.state?.fromTimeOut;
  function Back() {
    Navigate("/");
  }
  useEffect(() => {
    if (fromTimeOut) {
      Navigate("/timeout");
    }
  }, [fromTimeOut, Navigate]);
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-2">
      <p className="text-2xl">Ops timeout!!!!! </p>
      <button
        onClick={Back}
        className="bg-gray-900 px-8 py-2 w-fit rounded-3xl text-white"
      >
        Try Again
      </button>
    </div>
  );
}
