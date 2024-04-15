import axios from "axios";
import { DEV_URL } from "../API";

export const userFetch = () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    axios
      .get(`${DEV_URL}/api/account/profile`, {
        headers: {
          "x-auth-token": token,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        }
      })
      .catch((err) => {
        reject(err.response.message);
      });
  });
};
