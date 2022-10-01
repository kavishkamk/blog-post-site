import React, { useCallback, useReducer, useContext } from "react";
import Swal from 'sweetalert2'

import Input from "../shared/form-element/Input";
import Avatar from "../shared/form-element/Avatar";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_EQUAL } from "../shared/util/validators";
import Button from "../shared/form-element/Button";
import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import LoadingSpinner from "../shared/ui-elements/LoadingSpinner";

import "./Registration.css";
import ProfileImg from "../assets/images/unknownPerson.jpg";
import { CloseIcon } from "../assets/Icons/Icon";

const fromReduser = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let isFormValid = true;
            for (const inputId in state.input) {
                if (!state.input[inputId]) {
                    continue;
                }
                if (inputId === action.id) {
                    isFormValid = isFormValid && action.isValid;
                } else {
                    isFormValid = isFormValid && state.input[inputId].isValid;
                }
            }
            return {
                ...state,
                input: {
                    ...state.input,
                    [action.id]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: isFormValid
            };
        case "SET_DATA":
            return {
                input: action.inputs,
                isValid: action.formIsValid
            }
        default:
            return state;
    }
};

const Registration = props => {

    const { sendRequest, error, isLoading, clearError } = useHttpClient();

    const auth = useContext(AuthContext);

    // handle the form input
    const [inputState, dispatch] = useReducer(fromReduser, {
        input: {
            firstName: {
                value: "",
                isValid: false
            },
            lastName: {
                value: "",
                isValid: false
            },
            email: {
                value: "",
                isValid: false
            },
            password: {
                value: "",
                isValid: false
            },
            cpassword: {
                value: "",
                isValid: false
            },
            image: {
                value: "",
                isValid: true
            }
        },
        isValid: false
    });

    // handle the input values
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({ type: "INPUT_CHANGE", id: id, value: value, isValid: isValid });
    }, []);

    // form submit handler
    const submitHandler = async event => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("firstName", inputState.input.firstName.value);
            formData.append("lastName", inputState.input.lastName.value);
            formData.append("password", inputState.input.password.value);
            formData.append("email", inputState.input.email.value);

            if (inputState.input.image.value && inputState.input.image.value !== "unknownPerson.jgp") {
                formData.append("image", inputState.input.image.value);
            }

            const responseData = await sendRequest("users/signup",
                "POST",
                formData
            );
            auth.login(responseData.userId, responseData.token, responseData.image);
            props.onClose();
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            }).then(() => clearError());
        }
    };

    return (
        <React.Fragment>

            {isLoading &&
                <div className="absolute z-50 div-center-sereen">
                    <LoadingSpinner />
                </div>
            }

            <div className="absolute reg-div-center bg-wild-sand px-6 py-8 z-30 rounded-md text-sm border-2 border-black">

                <div
                    className="absolute top-1 right-1 cursor-pointer"
                    onClick={props.onClose}
                >
                    <CloseIcon />
                </div>

                <form className="flex">
                    <div className="flex justify-center items-center mr-8">
                        <Avatar
                            id="image"
                            src={ProfileImg}
                            className="h-52 w-52 object-cover rounded-full"
                            hoverClasses="rounded-b-full hover:rounded-full"
                            isEditable={true}
                            title="Change"
                            onInput={inputHandler}
                            errorText="Please select a image"
                        />
                    </div>
                    <div>
                        <Input
                            id="firstName"
                            type="text"
                            title="First Name"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorMsg="Please Enter a valid name."
                        />
                        <Input
                            id="lastName"
                            type="text"
                            title="Last Name"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorMsg="Please Enter a valid name."
                        />
                        <Input
                            id="email"
                            type="email"
                            title="Email"
                            onInput={inputHandler}
                            validators={[VALIDATOR_EMAIL()]}
                            errorMsg="Please Enter a valid email."
                        />
                        <Input
                            id="password"
                            type="password"
                            title="Password"
                            onInput={inputHandler}
                            validators={[VALIDATOR_MINLENGTH(6)]}
                            errorMsg="Please enter at least 6 characters."
                        />
                        <Input
                            id="cpassword"
                            type="password"
                            title="Confirm Password"
                            onInput={inputHandler}
                            validators={[VALIDATOR_EQUAL(inputState.input.password.value)]}
                            errorMsg="Please enter same password."
                        />
                        <Button
                            type="submit"
                            disabled={!inputState.isValid}
                            onClick={submitHandler}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};

export default Registration;