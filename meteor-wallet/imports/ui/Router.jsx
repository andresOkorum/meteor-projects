import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { NotFound } from "./NotFound";
import { SignUp } from "./SignUp";
import { RoutePaths } from "./RoutePaths";
import { ForgotPassword } from "./ForgotPassword";

export const Router = () => (
  <Routes>
    <Route path={RoutePaths.HOME} element={<Home />} />
    <Route path={RoutePaths.SIGN_UP} element={<SignUp />} />
    <Route path={RoutePaths.FORGOT_PASSWORD} element={<ForgotPassword />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);