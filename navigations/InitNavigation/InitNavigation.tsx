import React from "react";
import { useSelector } from "react-redux";
import HomeNavigation from "../HomeNavigation/HomeNavigation";
import LoginScreen from "../../screens/LoginScreen/LoginScreen";

const InitNavigation: React.FC = () => {
  const token = useSelector(
    (state: { auth: { token: string } }) => state.auth.token
  );

  if (token === "") {
    return <LoginScreen />;
  }

  return <HomeNavigation />;
};

export default InitNavigation;
