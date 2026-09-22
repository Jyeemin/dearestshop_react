import { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(
        !!localStorage.getItem("accesstoken")
    );

    const [member, setMember] = useState(() => {
        const memberName = localStorage.getItem("memberName");

        if(!memberName){
            return null;
        }
        return {memberName: memberName};
    });

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