import { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(
        !!localStorage.getItem("accesstoken")
    );

    const [member, setMember] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                isLogin,
                setIsLogin,
                member,
                setMember
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;