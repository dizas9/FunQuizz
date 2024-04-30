import axios from "axios";
import { useEffect, useState } from "react";
import { DEV_URL } from "../API";
import { BiSolidChevronLeft } from "react-icons/bi";
import { BiSolidChevronRight } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";

export default function ContestPage() {
  const [contestQuestion, setContestQuestion] = useState([]);
  const [contestOption, setContestOption] = useState([]);
  const [correctOption, setCorrectOption] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [count, setCount] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [contestId, setContestId] = useState(" ");
  // const [wrongIDX, setWrongIDX] = useState([]);
  const [wrongQA, setWrongQA] = useState([]);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const { name } = useParams();

  console.log(name);
  console.log(contestId);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${DEV_URL}/api/quiz/quizContest?collectionName=${name}`,
          {
            headers: {
              "x-auth-token": token,
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          const questions = response.data.map((question) => ({
            id: question._id,
            question: question.question,
            correctAnswers: question.correctAnswer,
          }));
          const options = response.data.map((question) =>
            question.options.split(",")
          );
          const conID = response.data[0].contestID;
          const correctAnswers = response.data.map((question) => {
            if (typeof question.correctAnswer === "string") {
              return question.correctAnswer.split(",");
            } else if (typeof question.correctAnswer === "number") {
              return [question.correctAnswer.toString()];
            } else {
              return [];
            }
          });
          const flatCorrectAnswers = correctAnswers.flatMap((arr) => arr);
          setContestId(conID);
          setContestQuestion(questions);
          setContestOption(options);
          setCorrectOption(flatCorrectAnswers);
          setSelectedOptions(new Array(questions.length).fill(""));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestion();
  }, [name]); // Added name as a dependency to fetch data when name changes

  const handleNext = () => {
    if (currentQuestionIndex < contestQuestion.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setCount((prevCount) => prevCount - 1);
    }
  };

  const handleOptionChange = (option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = option;
    console.log("score", updatedSelectedOptions);
    setSelectedOptions(updatedSelectedOptions);
  };

  function countScore() {
    let wrongIdx = [];
    let score = 0;

    for (let i = 0; i < selectedOptions.length; i++) {
      if (selectedOptions[i] === correctOption[i]) {
        score++;
      } else {
        wrongIdx.push(i);
      }
    }

    setScore(score);

    let wrongQAS = wrongIdx.map((idx) => contestQuestion[idx]);
    setWrongQA(wrongQAS);
  }

  const handleSubmit = async () => {
    countScore();
    const token = localStorage.getItem("token");
    // const questionIds = contestQuestion.map((question) => question.id);
    const ID = contestId;

    axios
      .post(
        `${DEV_URL}/api/quiz/submitAnswer`,
        { score, ID },
        {
          headers: { "x-auth-token": token },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setShouldNavigate(true);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    if (shouldNavigate) {
      navigate("/result", { state: { score, wrongQA, fromResult: true } });
    }
  }, [shouldNavigate]);

  return (
    <>
      {contestQuestion.length > 0 && (
        <>
          <div className="flex flex-col border-2 mt-10 lg:mx-36 lg:rounded-[2rem] rounded-[1rem] items-center py-2 lg:py-5 w-[90%] lg:w-[60%] h-fit">
            <div className="flex items-center w-full m-2">
              <div className="w-[50%] pl-2 font-stalin text-yellow-200 text-xl">
                {count}/10
              </div>
              <div className="font-stalin text-red-700 bg-black lg:text-xl w-[70%] lg:w-[50%] flex justify-end items-center gap-2 rounded-tl-full rounded-bl-full m-2 rounded-tr-full">
                <span className="text-xs lg:text-sm">Time left</span>:
                <span className="font-josefin font-bold text-yellow-100 text-xl">
                  01:00
                </span>
              </div>
            </div>

            <div className="flex flex-col p-2 gap-2 font-josefin w-full h-72 justify-center lg:px-10">
              <div
                key={contestQuestion[currentQuestionIndex]._id}
                className="text-yellow-200 font-bold text-xl lg:text-2xl "
              >
                {contestQuestion[currentQuestionIndex].question}
              </div>

              <div className="text-xl lg:text-2xl  text-yellow-100">
                {contestOption[currentQuestionIndex].map((option, index) => (
                  <li key={index} className="list-none flex gap-2">
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="option"
                      value={option}
                      checked={selectedOptions[currentQuestionIndex] === option}
                      onChange={() => handleOptionChange(option)}
                    />
                    <label htmlFor={`option-${index}`}>{option}</label>
                  </li>
                ))}
              </div>
            </div>

            <div className="flex  w-full mx-2 justify-between font-Noto px-5">
              {count > 1 && (
                <button
                  className="bg-red-400  hover:bg-green-800  p-2 rounded-tl-full rounded-bl-full w-[49%] flex justify-center"
                  onClick={handleBack}
                >
                  <BiSolidChevronLeft size={32} color="white" />
                </button>
              )}
              {count === 10 && (
                <button
                  className="bg-red-400 p-2 rounded-tr-full hover:text-blue-600  text-white rounded-br-full w-[49%] flex justify-center pt-3"
                  onClick={handleSubmit}
                >
                  <p className="font-bold">Submit</p>
                </button>
              )}
              {count < 10 && (
                <button
                  className="bg-red-400 hover:bg-green-800  p-2 rounded-tr-full rounded-br-full w-[49%] flex justify-center"
                  onClick={handleNext}
                >
                  <BiSolidChevronRight size={32} color="white" />
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
