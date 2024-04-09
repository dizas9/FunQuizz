import axios from "axios";
import { useEffect, useState } from "react";

import { DEV_URL } from "../API";

export default function useIsAuth() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const isAuth = () => {
      const token = localStorage.getItem("token");

      axios
        .get(`${DEV_URL}/api/user/authChecker`, {
          headers: {
            "x-auth-token": token,
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            setAuth(true);
          }
        })
        .catch((error) => {
          setAuth(false);
          console.error(error.response.data);
        });
    };

    isAuth();
  }, []);

  return { auth };
}
