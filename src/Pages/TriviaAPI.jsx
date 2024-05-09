import { useNavigate } from "react-router-dom";
import { Category, Difficulty } from "../Data/Data";
import { useState } from "react";

export default function TriviaAPI() {
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
  return (
    <>
      <form
        onSubmit={handleSearch}
        className="flex flex-col lg:flex-row lg:gap-10 gap-2 border lg:border-none lg:bg-[#DDE6ED] lg:text-[#27374D] p-5 rounded-2xl lg:items-center"
      >
        <p className="text-center text-xl lg:text-2xl font-bold text-yellow-300 lg:text-gray-500">
          Try Open Trivia
        </p>
        <hr />
        <label
          htmlFor="Category"
          className="lg:text-xl text-slate-50 lg:text-gray-400"
        >
          Category{" "}
        </label>
        <select
          name="Category"
          id="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-800 lg:bg-[#526D82] lg:text-xl font-Noto p-2 rounded-lg lg:text-[#DDE6ED] text-slate-50"
        >
          {Category.map((cat, catIndex) => (
            <option value={cat.id} key={catIndex}>
              {cat.Name}
            </option>
          ))}
        </select>
        <label
          htmlFor="Dificality"
          className="lg:text-xl text-slate-50 lg:text-gray-400"
        >
          Dificality{" "}
        </label>
        <select
          name="Dificality"
          id="Dificality"
          value={Dificulity}
          onChange={(e) => setDeficulity(e.target.value)}
          className="bg-slate-800 lg:bg-[#526D82] lg:text-xl font-Noto p-2 rounded-lg lg:text-[#DDE6ED] text-slate-50"
        >
          {Difficulty.map((diff, diffIndex) => (
            <option value={diff.Name} key={diffIndex}>
              {diff.Name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-gray-900 px-8 py-2 w-fit rounded-3xl lg:text-[#DDE6ED] text-slate-50"
        >
          Start
        </button>
      </form>
    </>
  );
}
