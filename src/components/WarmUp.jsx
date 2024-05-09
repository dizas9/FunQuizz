import { useEffect, useState } from "react";
import { DEV_URL } from "../API";
import axios from "axios";
import { Link } from "react-router-dom";
import ServerInactiveToast from "./ServerInactiveToast";
import ParacticeSkeleton from "./skeleton/ParacticeSkeleton";

export default function WarmUp() {
  const [upcomingContest, setUpcomingContests] = useState([]);
  const [toast, setToast] = useState(false);
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${DEV_URL}/api/quiz/practice_lists`)
        .then((res) => {
          if (res.status === 200) {
            const { schedule } = res.data;
            const contest = schedule.map((item, idx) => {
              return item.collectionName;
            });
            setUpcomingContests(contest);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchData();
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
    <>
      {toast && upcomingContest.length === 0 && <ServerInactiveToast />}
      <div className="flex flex-col h-fit items-center w-full">
        <p className="lg:text-2xl text-xl font-semibold text-slate-100 font-josefin lg:my-2 ">
          Warmup yourself
        </p>
        <hr className="bg-slate-50 lg:w-3/4 w-1/2 my-2 " />{" "}
        {upcomingContest && (
          <div className="lg:w-1/2 h-fit ">
            <div className="flex gap-5 p-5 items-center justify-center flex-wrap ">
              {upcomingContest.map((item, idx) => (
                <Link
                  to={`/practice/${item}`}
                  className="bg-slate-50 p-5 rounded-tr-lg text-blue-800 font-Noto font-semibold hover:bg-slate-600 hover:text-yellow-50"
                  key={idx}
                >
                  Test {idx + 1}
                </Link>
              ))}
            </div>
          </div>
        )}
        {upcomingContest.length === 0 && <ParacticeSkeleton />}
      </div>
    </>
  );
}
