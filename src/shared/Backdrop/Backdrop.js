import React from "react";
import ReactDOM from "react-dom";

const BackdropBlur = props => {
	return ReactDOM.createPortal(
		<div
			className="fixed top-0 left-0 w-full h-full z-20 backdrop-blur-sm"
			onClick={props.onClick}
		></div>,
		document.getElementById("backdrop-hook")
	);
};

export default BackdropBlur;