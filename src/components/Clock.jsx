import { useState,useEffect } from "react";
import Time from "../lib/Time";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState("");
  // const [month, setMonth] = useState("");
  // const [date, setDate] = useState("");
  // const [day, setCurrentTime] = useState("");
  // const [minutes, setCurrentTime] = useState("");
  let { time } = Time();

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(time);
    }, 1000);
  }, [currentTime]);
  return (<>{time}</>);
}
