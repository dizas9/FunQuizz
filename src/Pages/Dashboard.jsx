import axios from "axios";
import { DEV_URL } from "../API";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { userFetch } from "../lib/FetchUser";
import UploadProfileImage from "../components/UploadProfileImage";
import DashboardSkeleton from "../components/skeleton/DashboardSkeleton";

export default function Dashboard() {
  const [userData, setUserData] = useState({});
  const [err, setErr] = useState("");
  const [contestName, setContestName] = useState([]);
  const [score, setScore] = useState([]);
  const [name, setName] = useState("");

  console.log(score);

  const navigate = useNavigate();

  // logout handler
  const logoutHandle = async () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${DEV_URL}/api/user/logout`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
          localStorage.removeItem("token");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // contest list
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${DEV_URL}/api/quiz/contest_lists`)
        .then((res) => {
          const { schedule } = res.data;
          console.log("list", schedule);
          if (res.status === 200) {
            setContestName(schedule);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchData();
  }, []);

  //fetch User score

  const getScore = async (name, id) => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${DEV_URL}/api/quiz/score?collectionName=${name}&contestID=${id}`,
        {
          headers: { "x-auth-token": token },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setScore(res.data.score);
          setName(name);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    userFetch()
      .then((data) => {
        setUserData(data.user);
      })
      .catch((err) => {
        setErr(err);
      });
  }, []);

  const { firstname } = userData;

  return (
    <>
      <div className=" w-[90%]">
        {/* <div className="flex flex-col gap-2 items-center ">
          <img
            src={`${DEV_URL}/public/images/${image}`}
            alt=""
            className="w-20 h-20 border-2 rounded-full p-1"
          />
        </div> */}
      </div>
      <div className="bg-[#c6c6d931] w-[90%] h-fit flex flex-col p-2 rounded-md shadow-sm shadow-black">
        <div className="p-2 flex w-full">
          <div className="w-[80%] ">
            <p className="text-2xl text-yellow-200 font-josefin font-thin mb-1">
              welcome
            </p>
            <p className="text-xl text-yellow-300 font-stalin font-bold ">
              {firstname}
            </p>
          </div>

          <div className=" w-[20%] flex justify-center items-center">
            <button className="w-fit h-fit bg-[#e4cdcd88] p-1 rounded-md">
              <FaRegEdit size={20} color="blue" />
            </button>
          </div>
        </div>
        <hr />
        <button
          onClick={logoutHandle}
          className=" w-fit m-2 bg-red-500 font-Noto rounded-md p-1 text-white"
        >
          Logout
        </button>
      </div>

      {/* Score Board */}

      <div className="bg-[#c6c6d931] lg:w-[50%] w-[90%] h-fit flex flex-col gap-5 p-2 rounded-md shadow-sm shadow-black items-center">
        <div className="lg:w-2/3 h-10 rounded-lg flex gap-5 items-center justify-center">
          <p className="font-Noto text-yellow-100 font-semibold">
            score :
          </p>

          {contestName &&
            contestName.map((item, idx) => (
              <button
                className="outline-double outline-offset-1 outline-yellow-50 px-1 rounded-md bg-red-400"
                key={idx}
                onClick={() => getScore(item.collectionName, item.contestID)}
              >
                {item.collectionName}
              </button>
            ))}

          {/* table */}
        </div>

        <table class="table-auto">
          <thead>
            <tr className="flex gap-24">
              <th className="font-Noto text-yellow-100 font-semibold text-sm underline">
                Contest
              </th>
              <th className="font-Noto text-yellow-100 font-semibold text-sm underline">
                Score
              </th>
            </tr>
          </thead>
          {score.length !== 0 &&
            score.map((item, idx) => (
              <tbody key={idx} className="text-yellow-200 font-josefin">
                <tr className="flex gap-20">
                  <td>{name}</td>
                  <td>{item.score}/10</td>
                </tr>
              </tbody>
            ))}

          {score.length === 0 &&
            <p>You not participate this contest yet</p>
            }
        </table>
      </div>
    </>
  );
}
