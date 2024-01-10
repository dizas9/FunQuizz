/**
 * QuizTest component for handling quiz functionality.
 *
 * This component displays quiz questions, handles the timer, and allows users to submit their answers.
 * It maintains control to prevent rerendering state on page reload or navigating back to the previous route (<Main>).
 *
 * @component
 * @return {JSX.Element}
 */

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Constants for local storage keys
const STORAGE_KEY = "timeRemaining";
const QUESTION_KEY = "questionWithShuffledOption";

export default function QuizTest() {
  // State for timer and questions
  const [timeRemaining, setTimeRemaining] = useState(
    () => parseInt(localStorage.getItem(STORAGE_KEY)) || 2 * 60
  );
  const [questionWithShuffledOption, setQuestionWithShuffledOption] = useState(
    () => {
      try {
        const storedValue = localStorage.getItem(QUESTION_KEY);
        return storedValue ? JSON.parse(storedValue) : null;
      } catch (error) {
        console.error("Error parsing stored JSON:", error);
        return null;
      }
    }
  );

  // Navigation hook and location state
  const Navigate = useNavigate();
  const location = useLocation();
  const { QuestionWithShuffledOption } = location.state || {};
  const FromTest = location.state?.FromTest;

  // Effect for timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [location, QuestionWithShuffledOption]);

  // Effect for handling timer expiration
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, timeRemaining.toString());
    if (timeRemaining <= 0) {
      // Redirect to Timeout component
      Navigate("/timeout", { state: { fromTimeOut: true } });
    }
  }, [timeRemaining, Navigate]);

  // Effect for handling navigation back to the test
  useEffect(() => {
    if (FromTest) {
      Navigate("/test");
    }
  }, [FromTest, Navigate]);

  // Effect for saving questions to local storage
  useEffect(() => {
    // Save QuestionWithShuffledOption to localStorage
    if (QuestionWithShuffledOption) {
      setQuestionWithShuffledOption(QuestionWithShuffledOption);
      localStorage.setItem(
        QUESTION_KEY,
        JSON.stringify(QuestionWithShuffledOption)
      );
    }
  }, [QuestionWithShuffledOption]);

  /**
   * Handles the form submission when the user submits their answers.
   *
   * Calculates the user's score based on selected answers, clears the localStorage for the quiz timer,
   * and navigates to the result page with the obtained score.
   *
   * @param {Event} e - The form submission event.
   */

  function handleSubmit(e) {
    e.preventDefault();

    let score = 0;

    for (let i = 0; i < questionWithShuffledOption.length; i++) {
      const question = questionWithShuffledOption[i];
      const selectedAnswer = e.target.elements[`question_${i}`].value;

      if (question.correct_answer === selectedAnswer) {
        score++;
      }
    }
    localStorage.removeItem(STORAGE_KEY);
    Navigate("/result", {
      state: { score, fromResult: true },
    });
  }

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Split the array into two parts
  const firstHalf = questionWithShuffledOption?.slice(0, 5) || [];
  const secondHalf = questionWithShuffledOption?.slice(5) || [];

  return (
    <div className="mt-32 lg:mt-44 flex flex-col">
      <div className="flex items-center justify-center fixed bottom-0 bg-black p-1 rounded-full lg:w-52 lg:h-52">
        <p className="text-sm lg:text-2xl font-thin lg:font-semibold lg:flex lg:flex-col gap-2 lg:items-center">
          Time remaining{" "}
          <span className="text-red-800 font-josefin text-lg lg:text-4xl font-bold">
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </span>
        </p>
      </div>

      {timeRemaining ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border-2 m-5 lg:mx-36 lg:rounded-[5rem] rounded-[2rem] items-center py-2 lg:py-5"
        >
          <div
            className="flex flex-col lg:flex-row  h-fit p-10 lg:px-24"
            style={{ display: "flex" }}
          >
            <div style={{ flex: 1 }} className="flex flex-col gap-4">
              {firstHalf.map((question, questionIndex) => (
                <div key={questionIndex} className="flex flex-col gap-2">
                  <p className="font-josefin text-xl text-yellow-300">
                    {questionIndex + 1} : {question.question}
                  </p>
                  <div className="">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex w-fit gap-1">
                        <input
                          type="radio"
                          value={option}
                          name={`question_${questionIndex}`}
                          id={`question_${questionIndex}_option_${optionIndex}`}
                        />
                        <label
                          htmlFor={`question_${questionIndex}_option_${optionIndex}`}
                          className="font-josefin text-base"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ flex: 1 }} className="flex flex-col gap-4">
              {secondHalf.map((question, questionIndex) => (
                <div key={questionIndex} className="flex flex-col gap-2">
                  <p className="font-josefin text-xl text-yellow-300">
                    {questionIndex + 6} :{question.question}
                  </p>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex w-fit gap-1">
                      <input
                        type="radio"
                        value={option}
                        name={`question_${questionIndex + 5}`}
                        id={`question_${
                          questionIndex + 5
                        }_option_${optionIndex}`}
                      />
                      <label
                        htmlFor={`question_${
                          questionIndex + 5
                        }_option_${optionIndex}`}
                        className="font-josefin text-base"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-gray-900 px-8 py-2 w-fit rounded-3xl lg:text-[#DDE6ED]"
          >
            Submit
          </button>
        </form>
      ) : null}
    </div>
  );
}
