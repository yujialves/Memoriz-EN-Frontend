import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeNavigation from "../HomeNavigation/HomeNavigation";
import LoginScreen from "../../screens/LoginScreen/LoginScreen";
import * as authAction from "../../store/actions/auth";
import Spinner from "../../components/Spinner/Spinner";

const InitNavigation: React.FC = () => {
  const dispatch = useDispatch();

  const token = useSelector(
    (state: { auth: { token: string } }) => state.auth.token
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('USE EFFECT!!!')
    setIsLoading(true);

    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const expireDate = (localStorage.getItem(
      "expireDate"
    ) as unknown) as number;

    // トークンがセットされていなければログイン画面へ
    if (!token || !refreshToken || !expireDate) {
      return;
    }

    // トークンが切れていればトークンの更新
    console.log(expireDate - new Date().getTime());
    if (expireDate - new Date().getTime() > 0) {
      dispatch(authAction.refreshToken(refreshToken));
    }

    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return <Spinner width={40} height={40} />;
  }

  if (token === "") {
    return <LoginScreen />;
  }

  return <HomeNavigation />;
};

export default InitNavigation;
