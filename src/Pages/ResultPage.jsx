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

  const { score, wrongQAS, fromResult } = location.state || {
    score: 0,
    fromResult: true,
    wrongQAS: [],
  };

  console.log(wrongQAS);

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
    <div className="flex flex-col justify-center items-center w-full  h-fit gap-5">
      <div className="flex flex-col items-center gap-5">
        <p className="text-2xl">You scored {score} out of 10</p>
        <button
          onClick={handleTryAgain}
          className="bg-gray-900 px-8 py-2 w-fit rounded-3xl text-white"
        >
          Try Again
        </button>
      </div>

      {wrongQAS && (
        <>
          <p className="text-xl font-bold text-slate-200 pb-2">
            You have {wrongQAS.length} wrong answer
          </p>
          <hr className=" h-0.5 mb-2" />
          <div className="lg:w-1/2 w-[80%] h-[50%] overflow-auto rounded-xl bg-slate-100 shadow-black shadow-lg p-5 font-josefin ">
            {wrongQAS.map((question, idx) => (
              <div className="gap-1" key={question.contestID}>
                <p className="text-md font-semibold text-gray-500">
                  {idx + 1} . {question.question}
                </p>
                <p className="">
                  <span className="text-md font-semibold">Correct: </span>
                  {question.correctAnswers}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
