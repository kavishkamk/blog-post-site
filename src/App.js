import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./NavBar/NavBar";
import CreateBlog from "./pages/CreateBlog";
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import Home from "./pages/Home";

const App = () => {

  const {token, logIn, logOut, userId, image} = useAuth();

  return (
    <AuthContext.Provider 
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        image,
        login: logIn, 
        logout: logOut
      }}
    >
      <div>
        <Router >
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createBlog" element={<CreateBlog />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
