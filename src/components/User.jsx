import React from "react";
import { Link } from "react-router-dom";

export default function User() {
  return (
    <div className="flex justify-end gap-3 fixed top-2 right-2">
      {" "}
      <Link to={"/register"}>
        <button className=" bg-red-500 font-Noto rounded-md h-[2vh] lg:h-[6vh] text-white px-2 lg:text-sm text-[0.7rem]">
          Register
        </button>
      </Link>
      <Link to={"/login"}>
        <button className=" bg-red-500 font-Noto rounded-md h-[2vh] lg:h-[6vh] text-white px-2 text-[0.7rem] lg:text-sm">
          Login
        </button>
      </Link>
    </div>
  );
}
