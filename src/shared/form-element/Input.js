import React, { useEffect, useState } from "react";
import { validate } from "../util/validators";

const Input = props => {

    const [content, setContent] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    const changeHandler = event => {
        setContent(event.target.value);
        setIsValid(validate(event.target.value, props.validators));
    }

    const {id, onInput} = props;

    useEffect(() => {
        onInput(id, content, isValid)
    }, [onInput, id, content, isValid]);

    // this is OnBlur event
    const touchHandler = () => {
        setIsTouch(true);
    };

    return (
        <div className="mb-4 w-64">
            <label className="block">{props.title}</label>
            <input 
                id={props.id}
                type={props.type} 
                className="w-full" 
                onChange={changeHandler}
                value={content}
                onBlur={touchHandler}
            />
            {!isValid && isTouch && (<p className="text-red-600">{props.errorMsg}</p>)}
        </div>
    );
};

export default Input;