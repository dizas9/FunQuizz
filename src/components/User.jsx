import React from "react";
import { Link } from "react-router-dom";

export default function User() {
  return (
    <div className="flex justify-end gap-2 ">
      <Link to={"/register"}>
        <button className=" bg-red-500 font-Noto rounded-md h-[4vh] lg:h-[6vh] text-white px-2 text-sm">
          Register
        </button>
      </Link>
    </div>
  );
}
