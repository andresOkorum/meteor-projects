import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { SignUp } from './SignUp';
import { RoutePaths } from './RoutePaths';
import { ForgotPassword } from './ForgotPassword';
import { LoggedUserOnly } from './components/LoggedUserOnly';
import { AnonymousOnly } from './components/AnonymousOnly';
import { RemoveTransaction } from './RemoveTransaction';
import { AdminOnly } from './components/AdminOnly';

export const Router = () => (
  <Routes>
    <Route
      path={RoutePaths.HOME}
      element={
        <LoggedUserOnly>
          <Home />
        </LoggedUserOnly>
      }
    />
    <Route
      path={RoutePaths.SIGN_UP}
      element={
        <AnonymousOnly>
          <SignUp />
        </AnonymousOnly>
      }
    />
    <Route
      path={RoutePaths.FORGOT_PASSWORD}
      element={
        <AnonymousOnly>
          <ForgotPassword />
        </AnonymousOnly>
      }
    />
    <Route
      path={RoutePaths.REMOVE_TRANSACTION}
      element={
        <AdminOnly>
          <RemoveTransaction />
        </AdminOnly>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
