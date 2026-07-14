import Button from "../components/Button";
import { useState } from "react";
import {Link} from "react-router-dom";
import "./Account.css";

const Account = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [passwordConfirm, setPasswordConfirm] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");


    const signup = async () => {
        if(password !== passwordConfirm){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // Spring으로 회원가입 요청
        const response = await fetch("http://localhost:8080/api/members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        if (response.ok) {
            alert("회원가입 성공!");
        } else {
            alert("회원가입 실패");
        }
    };



    return (
    <div className="account-container">
        <h2 className="account-title">Create Account</h2>
    
        <input
        className="account-input"
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        <input
        className="account-input"
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <input
        className="account-input"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <input
        className="account-input"
        type="password"
        placeholder="password confirm"
        value={passwordConfirm}
        onChange={(e)=>setPasswordConfirm(e.target.value)}
        />

        <input
        className="account-input"
        type="text"
        placeholder="phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        />


        <Button 
        text="create"
        className="account-button"
        onClick={signup}>
        </Button>

        <Link
        to="/login"
        className="login-link">
        </Link>
    
    </div>
    )
}

export default Account;
