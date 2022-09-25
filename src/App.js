import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import NavBar from "./NavBar/NavBar";
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {

  const {token, logIn, logOut, userId} = useAuth();

  return (
    <AuthContext.Provider 
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        login: logIn, 
        logout: logOut
      }}
    >
      <div>
        <Router >
          <NavBar />
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
