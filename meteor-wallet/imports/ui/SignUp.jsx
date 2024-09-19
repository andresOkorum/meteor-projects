import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';
import { Passwordless } from 'meteor/quave:accounts-passwordless-react';

export const SignUp = () => {
  const navigate = useNavigate();

  const onEnterToken = () => {
    navigate(RoutePaths.HOME);
  };

  return (
    <Passwordless
      onEnterToken={onEnterToken}
    />
  );
};
