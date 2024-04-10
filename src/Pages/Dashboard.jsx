import axios from "axios";
import { DEV_URL } from "../API";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState({});
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
    const userFetch = () => {
      const token = localStorage.getItem("token");
      axios
        .get(
          `${DEV_URL}/api/account/profile`,
          {
            headers: {
              "x-auth-token": token,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data);
            console.log(res.data);
          }
        })
        .catch((err) => {
          setErr(err.response.message);
        });
    };

    userFetch();
  }, []);

  const { email } = user;

  return (
    <>
      <h2> welcome back {email}</h2>
      <button onClick={logoutHandle}>Logout</button>
    </>
  );
}
