import React, { useState } from "react";

import NavLinks from "./NavLinks";
import Registration from "../Registration/Registration";
import Button from "../shared/form-element/Button";
import BackdropBlur from "../shared/Backdrop/Backdrop";

import "./NavBar.css";

const NavBar = props => {

    const [isRegistrationDisplay, setIsRegistrationDisplay] = useState(false);

    const registrationCloseHandler = () => {
        setIsRegistrationDisplay(false);
    };

    return (
        <React.Fragment>

            {
                isRegistrationDisplay
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

            {/* navigation bar */}
            <div className="flex px-4 bg-wild-sand py-4 relative">
                <div className="text-2xl">𝖇𝖑𝖔𝖌</div>
                <div className="flex absolute div-center">
                    <NavLinks title="Home" />
                    <NavLinks title="About" />
                    <NavLinks title="Create" />
                </div>
                <div className="flex ml-auto">
                    <Button title="Login" />
                    <Button title="Registration" onClick={() => setIsRegistrationDisplay(true)}/>
                    <Button title="Logout" />
                    <div>
                        <img src={props.url} alt="profile"/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default NavBar;