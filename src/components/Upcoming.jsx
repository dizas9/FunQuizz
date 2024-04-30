import { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import { DEV_URL } from "../API";
import axios from "axios";
import Time from "../lib/Time";
import { Link } from "react-router-dom";

export default function Upcoming() {
  const [upcomingContest, setUpcomingContests] = useState([]);
  const [info, setInfo] = useState([]);
  const [joinContest, setJoinContest] = useState(false);

  console.log(upcomingContest);
  console.log(joinContest);

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

    const intervalId = setInterval(activeQuiz, 2000);
    return () => clearInterval(intervalId);
  }, [joinContest]);

  return (
    <div className="flex flex-col h-fit items-center">
      <p className="lg:text-2xl text-xl font-semibold text-slate-100 font-Noto lg:my-2 ">
        This week upcoming contests
      </p>
      <hr className="bg-slate-50 lg:w-3/4 w-1/2 my-2 " />

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

              {joinContest[item.contestID] && (
                <Link to={`/contest/${item.collectionName}`}>
                  <button className="font-Noto bg-slate-600 p-1 text-white rounded-md ">
                    Join
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
