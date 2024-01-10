/**
 * ResultPage component for displaying quiz results.
 *
 * Renders the user's quiz score out of 10 and provides an option to try the quiz again.
 * Utilizes React Router for navigation control.
 *
 * @component
 * @return {JSX.Element}
 */

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const Navigate = useNavigate();

  const { score, fromResult } = location.state || {
    score: 0,
    fromResult: false,
  };

  useEffect(() => {
    if (!fromResult) {
      // Redirect to home if the user navigates directly to this page
      Navigate("/");
    }
  }, [fromResult, Navigate]);

  function handleTryAgain() {
    Navigate("/");
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-2">
      <p className="text-2xl">You scored {score} out of 10</p>
      <button
        onClick={handleTryAgain}
        className="bg-gray-900 px-8 py-2 w-fit rounded-3xl text-white"
      >
        Try Again
      </button>
    </div>
  );
}
