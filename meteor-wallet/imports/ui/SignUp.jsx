import React, { useState } from "react";
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "./RoutePaths";
import { ErrorAlert } from "./components/ErrorAlert";

export const SignUp = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState();
  const [isSignUp, setIsSignUp] = useState(true);
  const signUp = (e) => {
    e.preventDefault();
    Accounts.createUser({
      email,
      password,
    }, (err) => {
      if (err) {
        console.error('Error creating user', err);
        setError(err);
        return;
      }
      navigate(RoutePaths.HOME);
    });
  };
  const signIn = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(
      email,
      password,
     (err) => {
      if (err) {
        console.error('Error signing in the user', err);
        setError(err);
        return;
      }
      navigate(RoutePaths.HOME);
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="px-3 py-2 text-lg text-base font-medium">
        {isSignUp ? 'Sign Up' : 'Sign in'}
      </h3>
      {error  && <ErrorAlert message={error.reason || 'Unknown error'} />}
      <form className="mt-6 flex flex-col">
        <div className="flex flex-col space-y-4">
          <div className="">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex justify-center py-3">
          <button 
            onClick={() => navigate(RoutePaths.HOME)}
            className="border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          {isSignUp && <button 
            onClick={signUp}
            type="submit"
            className="ml-3 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Sign up
          </button>}
          {!isSignUp && <button 
            onClick={signIn}
            type="submit"
            className="ml-3 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Sign In
          </button>}
        </div>
        <div className="flex justify-center py-3">
          <a className="cursor-pointer text-indigo-800" 
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp 
              ? 'If you already have an account, click here!' 
              : `If you don't have an account, click here`
            }
          </a>
        </div>
        <div className="flex justify-center py-3">
          <a className="cursor-pointer text-indigo-800" 
            onClick={() => navigate(RoutePaths.FORGOT_PASSWORD)}
          >
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
};