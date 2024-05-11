import React, { useState, useEffect, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import useIsAuth from "../hooks/AuthCheck";
import User from "../components/User";
import Upcoming from "../components/Upcoming";
import { DEV_URL } from "../API";
import { userFetch } from "../lib/FetchUser";
import { BiRightArrow, BiRightArrowCircle, BiUserCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa";


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
  const [userData, setUserData] = useState({});

  const { auth } = useIsAuth();

  useEffect(() => {
    userFetch()
      .then((data) => {
        setUserData(data.user);
      })
      .catch((err) => {
        setErr(err);
      });
  }, []);

  const { image, firstname } = userData;

  // JSX Rendering
  return (
    <>
      {auth ? (
        <Link to="/dashboard">
          <div className="absolute lg:top-2 top-1 right-2 flex items-center gap-1 shadow-black shadow-md px-2 rounded-xl">
            <p className="font-Noto text-yellow-300 text-xs lg:flex p-1 ">
              Hi, {firstname}
            </p>
          </div>
        </Link>
      ) : (
        <Link to="/login">
          <button className="px-2 absolute right-0 top-2">
            <FaUser size={25} color="rgb(253 224 71)" />
          </button>
        </Link>
      )}
      <div className="flex flex-col-reverse lg:flex-col justify-center items-center w-full h-fit gap-5">
        <Link
          className="lg:w-1/2 w-2/3 bg-[#dadabca0] py-5 rounded-lg shadow-black shadow-md text-lg lg:text-xl font-Noto text-blue-700 font-semibold  hover:bg-slate-500 flex justify-center"
          to={"/trivia"}
        >
          <button className="flex justify-center items-center gap-2">
            Try Open Trivia Quizes{" "}
            <span>
              <BiRightArrowCircle size={30} />
            </span>
          </button>
        </Link>

        <Link
          className="lg:w-1/2 w-2/3 bg-[#dadabca0] py-5 rounded-lg shadow-black shadow-md text-lg lg:text-xl font-Noto text-blue-700 font-semibold  hover:bg-slate-500 flex justify-center"
          to={"/bcsPractice"}
        >
          <button className="flex justify-center items-center gap-2">
            Practice BCS Quizes{" "}
            <span>
              <BiRightArrowCircle size={30} />
            </span>
          </button>
        </Link>

        <div className="flex flex-col w-full items-center">
          <div className="w-full lg:w-1/2">
            <Suspense
              fallback={
                <div className="text-mf font-Noto font-semibold">
                  Loading...
                </div>
              }
            >
              <Upcoming />
            </Suspense>
          </div>
        </div>
        {Loading && <p>Loading...</p>}
      </div>
    </>
  );
}
