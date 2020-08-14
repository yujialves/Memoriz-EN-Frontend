import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeNavigation from "../HomeNavigation/HomeNavigation";
import LoginScreen from "../../screens/LoginScreen/LoginScreen";
import * as loadingsAction from "../../store/actions/loadings";
import * as authAction from "../../store/actions/auth";

const InitNavigation: React.FC = () => {
  const dispatch = useDispatch();

  const token = useSelector(
    (state: { auth: { token: string } }) => state.auth.token
  );

  useEffect(() => {
    dispatch(loadingsAction.setIsLoging(true));

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

    // console.log(expireDate - new Date().getTime());
  }, [dispatch]);

  if (token === "") {
    return <LoginScreen />;
  }

  return <HomeNavigation />;
};

export default InitNavigation;
