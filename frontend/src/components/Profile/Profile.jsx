import React from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../context/useLogout";

export default function Profile() {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div>
      <h1>This is a protected page</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
