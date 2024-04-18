import axios from "axios";
import { useEffect, useState } from "react";
import { DEV_URL } from "../API";

export default function ContestPage() {
  const [contestQuestion, setContestQuestion] = useState([]);
  const [contestOption, setContestOption] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [count, setCount] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuestion = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${DEV_URL}/api/quiz/quizContest`, {
          headers: {
            "x-auth-token": token,
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          const questions = response.data.map((question) => ({
            id: question._id,
            question: question.question,
          }));
          const options = response.data.map((question) =>
            question.options.split(",")
          );
          setContestQuestion(questions);
          setContestOption(options);
          setSelectedOptions(new Array(questions.length).fill(null));
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchQuestion();
  }, []);

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
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const questionIds = contestQuestion.map((question) => question.id);
    const selectedOptionsForAllQuestions = selectedOptions.map(
      (options) => options || "" // Replace null values with empty string
    );

    axios
      .post(
        `${DEV_URL}/api/quiz/submitAnswer`,
        { questionIds, selectedOptions: selectedOptionsForAllQuestions },
        {
          headers: { "x-auth-token": token },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      {contestQuestion.length > 0 && (
        <>
          <div>{count}/10</div>
          <div key={contestQuestion[currentQuestionIndex]._id}>
            {contestQuestion[currentQuestionIndex].question}
          </div>
          <div>
            {contestOption[currentQuestionIndex].map((option, index) => (
              <li key={index}>
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
          {count > 1 && <button onClick={handleBack}>Back</button>}
          {count <= 10 && <button onClick={handleNext}>Next</button>}
          {count === 10 && <button onClick={handleSubmit}>Submit</button>}
        </>
      )}
    </>
  );
}
