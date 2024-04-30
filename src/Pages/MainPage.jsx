import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Category, Difficulty } from "../Data/Data";
import useIsAuth from "../hooks/AuthCheck";
import User from "../components/User";
import Upcoming from "../components/Upcoming";

/**
 * MainComponent represents the landing page of the "quizfun" application.
 * Users can select quiz category and dificulity level and start the quiz.
 *
 * @returns {JSX.Element} The rendered JSX element for the MainComponent.
 */

export default function MainPage() {
  // State Hooks
  const [QuizQuestion, setQuizQuestion] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [category, setCategory] = useState(9);
  const [Dificulity, setDeficulity] = useState("easy");

  // React Router Navigate Hook
  const Navigate = useNavigate();
  const { auth } = useIsAuth();

  /**
   * Processes fetched data and navigates based on results.
   *
   * @param {number} cat - The selected category ID.
   * @param {string} diff - The selected difficulty level.
   * @returns {Promise<void>} A promise that resolves once the data is processed.
   */

  async function FetchQuestion(cat, diff) {
    try {
      setLoading(true);
      const res = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${cat}&difficulty=${diff}&type=multiple`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      // console.log("API response:", res);
      // console.log("API data:", data);

      if (data.results && data.results.length > 0) {
        const QuestionWithShuffledOption = data.results.map((Quiz) => {
          const options = [
            Quiz.incorrect_answers[1],
            Quiz.incorrect_answers[0],
            Quiz.correct_answer,
            Quiz.incorrect_answers[2],
          ].sort(() => Math.random() - 0.5);
          return { ...Quiz, options };
        });

        setQuizQuestion(QuestionWithShuffledOption);
        Navigate("/test", {
          state: { QuestionWithShuffledOption, FromTest: true },
          replace: true,
        });
      } else {
        Navigate("/notfound");
        console.error("No results in the API response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handles the form submission, triggering the fetchQuestion function.
   *
   * @param {Event} e - The form submission event.
   */

  function handleSearch(e) {
    e.preventDefault();
    FetchQuestion(category, Dificulity);
  }

  // JSX Rendering
  return (
    <>
      {auth ? (
        <Link to="/dashboard">
          <button className="bg-red-500 font-Noto rounded-md h-[4vh] lg:h-[6vh] text-white px-2 text-sm absolute right-2 top-2">
            Profile
          </button>
        </Link>
      ) : (
        <Link to="/login">
          <button className="bg-red-500 font-Noto rounded-md h-[4vh] lg:h-[6vh] text-white px-2 text-sm absolute right-2 top-2">
            Login
          </button>
        </Link>
      )}
      <div className="flex flex-col-reverse lg:flex-col justify-center items-center w-full h-fit gap-5">
        <form
          onSubmit={handleSearch}
          className="flex flex-col lg:flex-row lg:gap-10 gap-5 border-2 lg:border-none lg:bg-[#DDE6ED] lg:text-[#27374D] p-10 lg:p-5 rounded-2xl lg:items-center"
        >
          <label htmlFor="Category" className="lg:text-xl">
            Category{" "}
          </label>
          <select
            name="Category"
            id="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-800 lg:bg-[#526D82] lg:text-xl font-Noto p-2 rounded-lg lg:text-[#DDE6ED]"
          >
            {Category.map((cat, catIndex) => (
              <option value={cat.id} key={catIndex}>
                {cat.Name}
              </option>
            ))}
          </select>
          <label htmlFor="Dificality" className="lg:text-xl">
            Dificality{" "}
          </label>
          <select
            name="Dificality"
            id="Dificality"
            value={Dificulity}
            onChange={(e) => setDeficulity(e.target.value)}
            className="bg-slate-800 lg:bg-[#526D82] lg:text-xl font-Noto p-2 rounded-lg lg:text-[#DDE6ED]"
          >
            {Difficulty.map((diff, diffIndex) => (
              <option value={diff.Name} key={diffIndex}>
                {diff.Name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-gray-900 px-8 py-2 w-fit rounded-3xl lg:text-[#DDE6ED]"
          >
            Start
          </button>
        </form>

        <div className="flex lg:flex-row flex-col w-full ">
          <div className="w-full lg:w-1/2">
            <Upcoming />
          </div>
        </div>
        {Loading && <p>Loading...</p>}
      </div>
    </>
  );
}
