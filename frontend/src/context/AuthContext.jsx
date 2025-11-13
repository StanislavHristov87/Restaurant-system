import { createContext, useContext, useReducer, useEffect  } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
           localStorage.setItem("token", action.payload.token);
          return { ...state, user: action.payload.user, token: action.payload.action }
        case "LOGOUT":
           localStorage.removeItem("token");
          return { ...state, user: null, token: null };
          default:
            return state; 
    
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer,initialState);

    useEffect(() => {
        if (state.token) {
            console.log("User authenticated");
        }
    }, [state.token]);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}