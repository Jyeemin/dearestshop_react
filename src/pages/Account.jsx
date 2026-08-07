import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "./Account.css";

const Account = () => {
const navigate = useNavigate();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [passwordConfirm, setPasswordConfirm] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");


    const signup = async () => {
    try{
                // Spring으로 회원가입 요청
        const response = await axios.post(
            "http://localhost:8080/api/members/join", 
        {
            name,
            email,
            password,
            passwordConfirm,
            phoneNumber
        }
    );
    console.log(response);
    alert(response.data.message);
    navigate("/login");

    }catch(error){
        //alert(error.response.data.message);
       if(error.response){
        alert(error.response.data.message);
    }else{
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    } 
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
