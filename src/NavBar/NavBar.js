import React, { useState, useContext } from "react";

import NavLinks from "./NavLinks";
import Registration from "../Registration/Registration";
import Button from "../shared/form-element/Button";
import BackdropBlur from "../shared/Backdrop/Backdrop";
import Login from "../login/Login";
import { AuthContext } from "..//shared/context/auth-context";

import "./NavBar.css";

const NavBar = props => {

    const auth = useContext(AuthContext);

    const [isRegistrationDisplay, setIsRegistrationDisplay] = useState(false);
    const [isLoginDisplay, setIsLoginDisplay] = useState(false);

    const registrationCloseHandler = () => {
        setIsRegistrationDisplay(false);
    };

    const loginCloseHandler = () => {
        setIsLoginDisplay(false);
    }

    return (
        <React.Fragment>

            {
                (isRegistrationDisplay || isLoginDisplay)
                    &&
                        <BackdropBlur />
            }

            {
                // registration form
                isRegistrationDisplay
                    && 
                    <Registration 
                        onClose={registrationCloseHandler}
                    />
            }

            {
                // login form
                isLoginDisplay
                    && 
                    <Login 
                        onClose={loginCloseHandler}
                    />
            }

            {/* navigation bar */}
            <div className="flex px-4 bg-wild-sand py-4 relative">
                <div className="text-2xl">𝖇𝖑𝖔𝖌</div>
                <div className="flex absolute div-center">
                    <NavLinks title="Home" />
                    {/* <NavLinks title="About" /> */}
                    {
                        auth.isLoggedIn && 
                            <NavLinks title="Create" to={"/createBlog"}/>
                    }
                </div>
                <div className="flex ml-auto">
                    {
                        auth.isLoggedIn && <Button title="Logout" onClick={auth.logout} />
                    }
                    {
                        !auth.isLoggedIn && <Button title="Login" onClick={() => setIsLoginDisplay(true)}/>
                    }
                    {
                        !auth.isLoggedIn && <Button title="Registration" onClick={() => setIsRegistrationDisplay(true)}/>
                    }
                    
                    {
                        auth.isLoggedIn && 
                        <div className="flex justify-center items-center">
                            <img 
                                src={
                                    !process.env.REACT_APP_ASSET_URL.auth 
                                        ? 
                                            `${process.env.REACT_APP_ASSET_URL}${auth.image}` 
                                        : 
                                            `${process.env.REACT_APP_ASSET_URL}upload/images/unknownPerson.jpg`
                                    } 
                                alt="profile"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

export default NavBar;