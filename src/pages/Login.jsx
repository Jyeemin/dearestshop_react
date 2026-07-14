import Button from "../components/Button";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
    return (
        <div className="login-container">
            <h2 className="login-title">LOGIN</h2>
            
            <input
                className="login-input"
                type="email"
                placeholder="email"
            />

            <input
                className="login-input"
                type="password"
                placeholder="password"
            />

            <p className="forgot-password">
                <Link to="forgot-password">
                    forgot your passsword?
                </Link>
            </p>

            <Button
                className="login-button"
                text="sign in">
                </Button>

                <Link to="/account"  className="create-account">
                create an account
                </Link>

        </div>
    )
    
}

export default Login;
