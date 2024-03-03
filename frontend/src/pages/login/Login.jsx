import "./login.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    console.log(user);
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">photogram</h3>
          <span className="loginDesc">
            Share your photos with other photography enthusiasts at{" "}
            <b>photogram</b>.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <h1>Login</h1>
            <div className="loginBoxItem">
              <input
                placeholder="Email"
                type="email"
                className="loginInput"
                required
                ref={email}
              />
              <PersonIcon className="loginIcon" />
            </div>
            <div className="loginBoxItem">
              <input
                placeholder="Password"
                type="password"
                className="loginInput"
                required
                ref={password}
                minLength="6"
              />
              <LockIcon className="loginIcon" />
            </div>
            <div className="rememberForgot">
              <label>
                <input type="checkbox" className="checkRemember" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="primary" size="20px" />
              ) : (
                "Login"
              )}
            </button>
            <div className="registerLink">
              <p>
                Don't have an account?{" "}
                <Link to="/register">
                  {isFetching ? (
                    <CircularProgress color="primary" size="20px" />
                  ) : (
                    "Register"
                  )}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
