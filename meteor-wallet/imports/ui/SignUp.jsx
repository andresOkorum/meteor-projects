import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';
import { Passwordless } from 'meteor/quave:accounts-passwordless-react';

export const SignUp = () => {
  const navigate = useNavigate();

  const onEnterToken = () => {
    navigate(RoutePaths.HOME);
  };

  const loginWithGoogle = () => {
    Meteor.loginWithGoogle({ loginStyle: 'redirect' });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Passwordless
        onEnterToken={onEnterToken}
      />
      <div className="font-light">or</div>
      <button
        className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        onClick={loginWithGoogle}
      >
        Login With Google
      </button>
    </div>
  );
};
