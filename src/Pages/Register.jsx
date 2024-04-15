import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DEV_URL } from "../API";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();
  const { firstname, lastname, email, password } = formData;

  //submission handlers
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // send Post request to server
    axios
      .post(`${DEV_URL}/api/user/register`, JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setFormData({
            email: "",
            password: "",
          });
          navigate("/login", { state: { msg: res.data.message } });
          console.log(res);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMsg(error.response.data.message);
          setLoading(false);
          setErrorMsg(error.response.data.message);
        } else {
          console.error(error);
          setLoading(false);
          setErrorMsg(error);
        }
      });
  }

  return (
    <>
      {errorMsg && (
        <div className="bg-gray-600 text-yellow-200 font-josefin font-bold text-center">
          * {errorMsg}!
        </div>
      )}

      <form
        className="w-[80vw] lg:w-[40vw] h-fit bg-yellow-950 p-5"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-white font-Noto font-semibold mb-2">
          Add an account{" "}
        </p>

        <div className="w-full h-fit flex flex-col py-2 px-1 gap-1 lg:gap-3">
          <label htmlFor="email" className="text-yellow-300 font-Noto">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="outline-double outline-blue-200 rounded-sm h-[4vh] lg:h-[6vh] bg-[#3E3232]"
          />
        </div>

        <div className="w-full h-fit flex flex-col py-2 px-1 gap-1 lg:gap-3">
          <label htmlFor="email" className="text-yellow-300 font-Noto">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="outline-double outline-blue-200 rounded-sm h-[4vh] lg:h-[6vh] bg-[#3E3232]"
          />
        </div>

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

        <div className="font-Noto text-red-500">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-800 underline">
            Login
          </Link>
        </div>

        <button
          className="w-full bg-red-500 font-Noto rounded-sm h-[4vh] lg:h-[6vh] mt-2 text-white"
          type="submit"
        >
          Sign in
        </button>
      </form>
    </>
  );
}
