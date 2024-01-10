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
  function Back() {
    Navigate("/");
  }

  const { score } = location.state || { score: 0 };
  const fromResult = location.state?.fromResult;

  useEffect(() => {
    if (fromResult) {
      Navigate("/result");
    }
  }, [fromResult, Navigate]);
  return (
    <>
      <p>You score {score} out of 10</p>
      <button onClick={Back}>Try Again</button>
    </>
  );
}
