import React from "react";

const NavLinks = props => {

    if (props.type === "submit") {
        return (
            <div>
                <button
                    className={`block px-10 rounded-md py-1 mx-auto ${props.disabled ? "text-dustygray border-pgray" : "text-white bg-blue-500"}`}
                    type={props.type}
                    onClick={props.onClick}
                    disabled={props.disabled}
                >
                    {props.children}
                </button>
            </div>
        )
    }

    return (
        <div className="mx-4 font-bold text-lg">
            <button onClick={props.onClick}>{props.title}</button>
        </div>
    );
};

export default NavLinks;