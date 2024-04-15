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
    age: "",
    gender: "",
    school: "",
    bio: "",
    image: "",
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();
  const {
    firstname,
    lastname,
    email,
    password,
    gender,
    age,
    school,
    bio,
    image,
  } = formData;

  //submission handlers
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formDataSend = new FormData();
    // Append each field of formData to formDataSend individually
    formDataSend.append("firstname", formData.firstname);
    formDataSend.append("lastname", formData.lastname);
    formDataSend.append("email", formData.email);
    formDataSend.append("password", formData.password);
    formDataSend.append("age", formData.age);
    formDataSend.append("gender", formData.gender);
    formDataSend.append("school", formData.school);
    formDataSend.append("bio", formData.bio);
    formDataSend.append("image", formData.image);

    // send Post request to server
    axios
      .post(`${DEV_URL}/api/user/register`, formDataSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);

          navigate("/login", { state: { msg: res.data.message } });
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
        } else {
          console.error(error);
          setLoading(false);
          setErrorMsg(error);
        }
      });
  }

  // Handle Continue button click
  const handleContinue = () => {
    setStep(step + 1);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? e.target.files[0] : value,
    });
  };

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

        {step === 1 && (
          <>
            {" "}
            <div className="w-full h-fit flex flex-col py-2 px-1 gap-1 lg:gap-3">
              <label htmlFor="firstname" className="text-yellow-300 font-Noto">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={firstname}
                onChange={handleChange}
                className="outline-double outline-blue-200 rounded-sm h-[4vh] lg:h-[6vh] bg-[#3E3232]"
              />
            </div>
            <div className="w-full h-fit flex flex-col py-2 px-1 gap-1 lg:gap-3">
              <label htmlFor="lastname" className="text-yellow-300 font-Noto">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={lastname}
                onChange={handleChange}
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
                onChange={handleChange}
                className="outline-double outline-blue-200 rounded-sm h-[4vh] lg:h-[6vh] bg-[#3E3232]"
              />
            </div>
            <div className="w-full h-fit flex flex-col py-2 px-1 gap-1 lg:gap-3">
              <label htmlFor="password" className="text-yellow-300 font-Noto">
                Password
              </label>
              <input
                type="text"
                name="password"
                value={password}
                onChange={handleChange}
                className="outline-double outline-blue-200 rounded-sm h-[4vh] lg:h-[6vh] bg-[#3E3232]"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                className=" bg-red-500 font-Noto rounded-md w-fit h-[4vh] lg:h-[6vh] mt-2 text-white p-2"
                onClick={handleContinue}
              >
                Continue
              </button>

              <button
                className=" bg-red-500 font-Noto rounded-md w-fit h-[4vh] lg:h-[6vh] mt-2 text-white p-2"
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="w-full h-fit flex flex-col py-2 px-1 gap-1 lg:gap-3">
              <label htmlFor="gender" className="text-yellow-300 font-Noto">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={handleChange}
                className="outline-double outline-blue-200 rounded-sm h-[4vh] lg:h-[6vh] bg-[#3E3232]"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="w-full h-fit flex flex-col py-2 px-1 gap-1 lg:gap-3">
              <label htmlFor="age" className="text-yellow-300 font-Noto">
                Date of Birth
              </label>
              <input
                type="date"
                name="age"
                value={age}
                onChange={handleChange}
                className="outline-double outline-blue-200 rounded-sm h-[4vh] lg:h-[6vh] bg-[#3E3232]"
              />
            </div>
            <div className="w-full h-fit flex flex-col py-2 px-1 gap-1 lg:gap-3">
              <label htmlFor="school" className="text-yellow-300 font-Noto">
                School/College/University
              </label>
              <input
                type="text"
                name="school"
                value={school}
                onChange={handleChange}
                className="outline-double outline-blue-200 rounded-sm h-[4vh] lg:h-[6vh] bg-[#3E3232]"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                className=" bg-red-500 font-Noto rounded-md w-fit h-[4vh] lg:h-[6vh] mt-2 text-white p-2"
                onClick={handleContinue}
              >
                Continue
              </button>

              <button
                className=" bg-red-500 font-Noto rounded-md w-fit h-[4vh] lg:h-[6vh] mt-2 text-white p-2"
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="w-full h-fit flex flex-col py-2 px-1 gap-1 lg:gap-3">
              <label htmlFor="age" className="text-yellow-300 font-Noto">
                Upload profile image
              </label>
              <input
                type="file"
                name="image"
                accept="img/*"
                onChange={handleChange}
                className="bg-[#3E3232]"
              />
            </div>

            <div className="w-full h-fit flex flex-col py-2 px-1 gap-1 lg:gap-3">
              <label htmlFor="bio" className="text-yellow-300 font-Noto">
                Bio (optional)
              </label>
              <textarea
                type="text"
                name="bio"
                value={bio}
                onChange={handleChange}
                className="outline-double outline-blue-200 rounded-sm h-[4vh] lg:h-[10vh] bg-[#3E3232]"
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            {" "}
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
          </>
        )}
      </form>
    </>
  );
}
