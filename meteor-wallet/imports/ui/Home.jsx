import React from "react";
import { Wallet } from "./Wallet";
import { ContactForm } from "./ContactForm";
import { ContactList } from "./ContactList";
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import { Loading } from "./components/Loading";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from './RoutePaths';

export const Home = () => {
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
  const navigate = useNavigate();

  if (isLoadingLoggedUser) {
    return <Loading />
  }

  if (!loggedUser) {
    return (
      <div className="flex flex-col items-center p-10">
        <div className="px-3 py-2 text-lg text-base font-medium">
          Welcome!
        </div>
        <div>
          Please
          <a className="ml-1 cursor-pointer text-indigo-800"
            onClick={() => navigate(RoutePaths.SIGN_UP)}
          >
            sign-up
          </a>
        </div>
      </div>
    )
  }

  return (
    <>  
      <Wallet />
      <ContactForm />
      <ContactList />
    </>
  );
};