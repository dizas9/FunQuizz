import axios from "axios";
import { DEV_URL } from "../API";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { userFetch } from "../lib/FetchUser";
import UploadProfileImage from "../components/UploadProfileImage";

export default function Dashboard() {
  const [userData, setUserData] = useState({});
  const [err, setErr] = useState("");

  const navigate = useNavigate();

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
  console.log("userData", userData.image);

  return (
    <>
      <div className=" w-[90%]">
        <div className="flex flex-col gap-2 items-center ">
          <img
            src={`${DEV_URL}/public/images/${image}`}
            alt=""
            className="w-20 border-2 rounded-full p-1"
          />
        </div>
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
    </>
  );
}
