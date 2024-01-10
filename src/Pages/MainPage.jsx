import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Category, Difficulty } from "../Data/Data";

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
      console.log("API response:", res);
      console.log("API data:", data);

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
      <div>
        <form onSubmit={handleSearch}>
          <label htmlFor="Category">Category : </label>
          <select
            name="Category"
            id="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Category.map((cat, catIndex) => (
              <option value={cat.id} key={catIndex}>
                {cat.Name}
              </option>
            ))}
          </select>
          <label htmlFor="Dificality">Dificality : </label>
          <select
            name="Dificality"
            id="Dificality"
            value={Dificulity}
            onChange={(e) => setDeficulity(e.target.value)}
          >
            {Difficulty.map((diff, diffIndex) => (
              <option value={diff.Name} key={diffIndex}>
                {diff.Name}
              </option>
            ))}
          </select>
          <button type="submit">Start</button>
        </form>

        {Loading && <p>Loading...</p>}
      </div>
    </>
  );
}
