import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { DEV_URL } from "../API";
import axios from "axios";
import DashboardSkeleton from "./skeleton/DashboardSkeleton";

export default function PrivateRoute({ children, message }) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuth = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(`${DEV_URL}/api/user/authChecker`, {
          headers: {
            "x-auth-token": token,
          },
          withCredentials: true,
        });

        if (res.status === 200) {
          setAuth(true);
        }
      } catch (error) {
        setAuth(false);
        console.error(error.response.data);
      } finally {
        setLoading(false);
      }
    };

    isAuth();
  }, []);

  if (loading) {
    return (
      <>
        <DashboardSkeleton/>
      </>
    );
  }

  return auth ? (
    children
  ) : (
    <Navigate to="/login" state={message ? { msg: message } : undefined} />
  );
}
