import "./register.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
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
            <h1>Register</h1>
            <div className="loginBoxItem">
              <input
                placeholder="Username"
                type="text"
                className="loginInput"
                ref={username}
                required
              />
              <PersonIcon className="loginIcon" />
            </div>
            <div className="loginBoxItem">
              <input
                placeholder="Email"
                type="email"
                className="loginInput"
                ref={email}
                required
              />
              <EmailIcon className="loginIcon" />
            </div>
            <div className="loginBoxItem">
              <input
                placeholder="Password"
                type="password"
                className="loginInput"
                ref={password}
                minLength={6}
                required
              />
              <LockIcon className="loginIcon" />
            </div>
            <div className="loginBoxItem">
              <input
                placeholder="Confirm Password"
                type="password"
                className="loginInput"
                ref={passwordAgain}
                required
              />
              <LockIcon className="loginIcon" />
            </div>
            <button type="submit" className="loginButton">
              Register
            </button>
            <div className="registerLink">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
