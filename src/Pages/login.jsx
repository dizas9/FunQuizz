import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEV_URL } from "../API";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // send Post request to server
    axios
      .post(`${DEV_URL}/api/user/login`, JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setFormData({
            email: "",
            password: "",
          });
          navigate("/");
          console.log(res);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrMsg(error.response.data.message);
          setLoading(false);
        } else {
          console.error(error);
          setLoading(false);
        }
      });
  }

  const { email, password } = formData;

  return (
    <>
      <>
        <div className="bg-gray-600 text-yellow-200 font-josefin font-bold text-center">
          *Wrong Credential !
        </div>
        <form
          className="w-[80vw] lg:w-[40vw] h-fit bg-yellow-950 p-5"
          onSubmit={handleSubmit}
        >
          <p className="text-center text-white font-Noto font-semibold mb-2">
            Log in
          </p>
          <div className="w-full h-fit flex flex-col py-2 px-1 gap-1 lg:gap-3">
            <label htmlFor="email" className="text-yellow-300 font-Noto">
              Email address
            </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="outline-double outline-blue-200 rounded-sm h-[4vh] lg:h-[6vh] bg-[#3E3232]"
            />
          </div>

          <div className="w-full h-fit flex flex-col py-2 px-1 gap-1 lg:gap-3">
            <label htmlFor="email" className="text-yellow-300 font-Noto">
              Password
            </label>
            <input
              type="text"
              name="password"
              value={password}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="outline-double outline-blue-200 rounded-sm h-[4vh] lg:h-[6vh] bg-[#3E3232]"
            />
          </div>

          <button
            className="w-full bg-red-500 font-Noto rounded-sm h-[4vh] lg:h-[6vh] mt-2 text-white"
            type="submit"
          >
            Log in
          </button>
        </form>
      </>
    </>
  );
}
