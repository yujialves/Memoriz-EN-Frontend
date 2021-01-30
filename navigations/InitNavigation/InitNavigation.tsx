import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeNavigation from "../HomeNavigation/HomeNavigation";
import LoginScreen from "../../screens/LoginScreen/LoginScreen";
import * as authAction from "../../store/auth/auth.action";
import Spinner from "../../components/Spinner/Spinner";
import WebScreen from "../../screens/WebScreen/WebScreen";

const InitNavigation: React.FC = () => {
  const dispatch = useDispatch();

  const token = useSelector(
    (state: { auth: { token: string } }) => state.auth.token
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const expireDate = (localStorage.getItem(
      "expireDate"
    ) as unknown) as number;

    // トークンがセットされていなければログイン画面へ
    if (!token || !refreshToken || !expireDate) {
      setIsLoading(false);
      return;
    }

    // トークンが切れていればトークンの更新
    if (expireDate - new Date().getTime() < 0) {
      dispatch(authAction.refreshToken(refreshToken));
    } else {
      dispatch(authAction.setToken(token, refreshToken, expireDate));
    }

    setIsLoading(false);
  }, [dispatch]);

//   if (!window.matchMedia("(display-mode: standalone)").matches) {
//     return <WebScreen />;
//   }

  if (isLoading) {
    return <Spinner width={40} height={40} />;
  }

  if (token === "") {
    return <LoginScreen />;
  }

  return <HomeNavigation />;
};

export default InitNavigation;
