import { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import { DEV_URL } from "../API";
import axios from "axios";

import { Link } from "react-router-dom";
import ContestSkeleton from "./skeleton/ContestSkeleton";
import ServerInactiveToast from "./ServerInactiveToast";

export default function Upcoming() {
  const [upcomingContest, setUpcomingContests] = useState([]);
  const [joinContest, setJoinContest] = useState(false);
  const [toast, setToast] = useState(false);
  const [isCompleted, setIsCompleted] = useState({});

  // console.log(upcomingContest);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${DEV_URL}/api/quiz/contest_lists`)
        .then((res) => {
          if (res.status === 200) {
            const { schedule } = res.data;
            // Process data to determine upcoming contests
            const filteredContests = schedule.filter((contest) => {
              const contestDate = new Date(
                `${contest.DactiveMonth} ${
                  contest.DactiveDate
                }, ${new Date().getFullYear()} ${contest.DactiveHr}:${
                  contest.minute
                }`
              );

              return contestDate > new Date();
            });
            setUpcomingContests(filteredContests);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const activeQuiz = () => {
      const updatedJoinContest = {};
      for (let i = 0; i < upcomingContest.length; i++) {
        const contest = upcomingContest[i];
        const activeTime = new Date(
          `${contest.month} ${contest.date}, ${new Date().getFullYear()} ${
            contest.hour
          }:${contest.minute}`
        );

        if (activeTime <= new Date()) {
          updatedJoinContest[contest.contestID] = true;
        } else {
          updatedJoinContest[contest.contestID] = false;
        }
      }
      setJoinContest(updatedJoinContest);
    };

    const intervalId = setInterval(activeQuiz, 100);
    return () => clearInterval(intervalId);
  }, [joinContest]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isComplete = async () => {
      try {
        const res = await axios.get(`${DEV_URL}/api/quiz/completed`, {
          headers: {
            "x-auth-token": token,
          },
          withCredentials: true,
        });
        if (res.status === 200) {
          const completedContestIds = res.data.complete.map(
            (contest) => contest.contestID
          );
          const completedContests = {};
          for (const contest of completedContestIds) {
            completedContests[contest] = true;
          }
          setIsCompleted(completedContests);
        }
      } catch (error) {
        console.error(error);
      }
    };
    isComplete();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setToast(true);
    }, 5000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setToast(false);
    }, 15000);
  }, []);

  return (
    <div className="flex flex-col h-fit items-center">
      {/* Toast for Server Inactivity */}
      {toast && upcomingContest.length === 0 && <ServerInactiveToast />}
      <p className="lg:text-2xl text-xl font-semibold text-slate-100 font-josefin lg:my-2 ">
        This week upcoming contests
      </p>
      <hr className="bg-slate-50 lg:w-3/4 w-1/2 my-2 " />

      {upcomingContest.length === 0 ? <ContestSkeleton /> : ""}
      {/* Contest Card */}
      {upcomingContest.map((item) => (
        <div
          className="lg:w-1/2 w-3/4 bg-slate-200 m-2 h-fit flex flex-col rounded-md shadow-black shadow-md"
          key={item.contestID}
        >
          <div className="px-1 pt-1 flex justify-between items-center">
            <p className="text-xl font-Noto text-gray-700 font-bold">
              {item.collectionName}
            </p>
            <p className="text-sm font-light">01:30:00 left</p>
          </div>
          <div className="px-1 font-Noto text-gray-700">
            <span className="font-bold">
              {joinContest[item.contestID] ? <>Status : </> : <>Time : </>}
            </span>
            {joinContest[item.contestID] ? (
              <span className="font-normal text-gray-500">Ongoing</span>
            ) : (
              <span className="font-normal">
                {item.month} {item.date}, {item.day},{" "}
                {parseInt(item.hour, 10) > 12
                  ? parseInt(item.hour, 10) - 12
                  : item.hour}
                :{item.minute} PM
              </span>
            )}
          </div>
          <div className="px-1 pb-1 font-Noto text-gray-500 flex justify-between  items-center">
            <p className="text-sm">
              <span className="font-bold">Topic : </span>
              <span className="">mixed</span>
            </p>

            <div className="flex gap-2">
              <button className="font-Noto bg-slate-600 p-1 text-white rounded-md ">
                <BiBell size={20} />
              </button>

              {!isCompleted[item.contestID] && joinContest[item.contestID] && (
                <Link to={`/contest/${item.collectionName}`}>
                  <button className="font-Noto bg-slate-600 p-1 text-white rounded-md ">
                    Join
                  </button>
                </Link>
              )}
              {isCompleted[item.contestID] && (
                <button className="font-Noto bg-slate-600 p-1 text-white rounded-md ">
                  Participated
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
