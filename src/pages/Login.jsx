import Button from "../components/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    

    
    const login = async () => {
    try{
                // Spring으로 회원가입 요청
        const response = await axios.post(
            "http://localhost:8080/api/members/login",
        {
            email,
            password
        }
    );
    console.log(response);
    alert(response.data.message);
    const token = response.data.token;
    localStorage.setItem("accesstoken", token);
    window.location.href = "/"; // 로그인 성공 후 홈으로 이동

    }catch(error){
        alert(error.response.data.message);
            
    }

    };



    return (
        <div className="login-container">
            <h2 className="login-title">LOGIN</h2>
            
            <input
                className="login-input"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="login-input"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <p className="forgot-password">
                <Link to="forgot-password">
                    forgot your passsword?
                </Link>
            </p>

            <Button
                className="login-button"
                text="sign in"
                onClick={login}
                >
                </Button>

                <Link to="/account"  className="create-account">
                create an account
                </Link>

        </div>
    )
    
}

export default Login;
