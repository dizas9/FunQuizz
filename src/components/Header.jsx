import React, { useEffect, useState } from 'react'
import Clock from './Clock';
import { Link } from 'react-router-dom';
import { userFetch } from '../lib/FetchUser';

export default function Header() {
    const [userData, setUserData] = useState({});
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
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-sm text-slate-400">
        <Clock />
        <hr className="mt-1" />
      </div>
      <Link to={"/"}>
        <p className="font-stalin text-3xl lg:text-3xl text-[#F5E8C7]">
          FunQuizz
        </p>
      </Link>
      <p className="font-[100] text-sm lg:text-[1rem] text-yellow-300 lg:pt-5">
        Quiz, Learn, Thrive, Repeat, Enjoy
      </p>

      <Link to="/dashboard">
        <div className="items-center gap-1 border shadow-black shadow-md px-2 rounded-xl flex lg:hidden">
          <p className="font-Noto text-yellow-300 text-xs lg:flex p-1 ">
            Welcome back , {firstname}
          </p>
        </div>
      </Link>
    </div>
  );
}
