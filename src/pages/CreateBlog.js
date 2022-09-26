import React, {useCallback, useReducer, useContext} from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import Avatar from "../shared/form-element/Avatar";
import Input from "../shared/form-element/Input";
import Button from "../shared/form-element/Button";
import { VALIDATOR_REQUIRE } from "../shared/util/validators";
import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";

import SelectImg from "../assets/images/selectImage.jpg";

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

const CreateBlog = () => {

    const { sendRequest, error, isLoading, clearError } = useHttpClient();

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    // handle the form input
    const [inputState, dispatch] = useReducer(fromReduser, {
        input: {
            title: {
                value: "",
                isValid: false
            },
            content: {
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
    const inputHandler = useCallback ((id, value, isValid) => {
        dispatch({type: "INPUT_CHANGE", id: id, value: value, isValid: isValid });
    }, []);

    // form submit handler
    const submitHandler = async event => {
        event.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append("title", inputState.input.title.value);
            formData.append("content", inputState.input.content.value);
            formData.append("id", auth.userId)

            if (inputState.input.image.value && inputState.input.image.value !== "selectImage.jgp") {
                formData.append("image", inputState.input.image.value);
            }
            
            const responseData = await sendRequest("blogs",
                "POST",
                formData,
                {
                    authorization: "Bearer " + auth.token
                }
            );

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: "blog published successfully",
            }).then(navigate("/"));
            
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            }).then(() => clearError());
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center px-10">
            <div className="bg-wild-sand px-5 py-3 rounded-md w-full">
                <form></form>
                <Avatar 
                    id="image"
                    src ={SelectImg} 
                    className="h-52 w-96 object-contain mx-auto rounded bg-mine-shaft py-2 mb-6" 
                    isEditable={true}
                    title="Change"
                    onInput={inputHandler}
                    errorText="Please select a image"
                />

                <Input 
                    id="title"
                    type="text" 
                    title="Title" 
                    className="w-full"
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]} 
                    errorMsg="Please Enter valid Title."
                />

                <Input 
                    id="content"
                    type="textarea" 
                    title="Title" 
                    className="w-full"
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]} 
                    errorMsg="Please Enter valid content."
                />
                <Button 
                            type="submit"
                            disabled={!inputState.isValid}
                            onClick={submitHandler}
                        >
                            Publish
                        </Button>
            </div>
        </div>
    );
};

export default CreateBlog;