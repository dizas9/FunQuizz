import axios from "axios";
import { DEV_URL } from "../API";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const logoutHandle = async () => {
    const token = localStorage.getItem("token");
    axios
      .post(`${DEV_URL}/api/user/logout`,{}, {
        headers: {
          "x-auth-token": token,
        },
        withCredentials: true,
      })
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
  return (
    <>
      <button onClick={logoutHandle}>Logout</button>
    </>
  );
}
