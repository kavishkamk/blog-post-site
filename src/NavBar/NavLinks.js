import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = props => {
    return (
        <div className="mx-4 font-bold text-lg">
            <NavLink>{props.title}</NavLink>
        </div>
    );
};

export default NavLinks;