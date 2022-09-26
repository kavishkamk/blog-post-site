import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userId: null,
    image: "upload/images/unknownPerson.jpg",
    login: () => {}, 
    logout: () => {}
});