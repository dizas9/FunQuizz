/**
 * TimeoutPage component for handling timeout functionality.
 *
 * Displays a timeout message and provides an option to navigate back to the main page.
 * Uses React Router for navigation control.
 *
 * @component
 * @return {JSX.Element}
 */

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function TimeoutPage() {
  const Navigate = useNavigate();
  const location = useLocation();
  const fromTimeOut = location.state?.fromTimeOut;
  function Back() {
    Navigate("/");
  }
  useEffect(() => {
    if (fromTimeOut) {
      Navigate("/timeout");
    }
  }, [fromTimeOut, Navigate]);
  return (
    <div>
      Ops timeout!!!!!
      <button onClick={Back}>Try Again</button>
    </div>
  );
}
