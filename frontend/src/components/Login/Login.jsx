import { useRef, useState, useEffect } from "react";
import useAuth from "../../context/AuthProvider";
import qs from "qs";
import axios from "../../api/axios";
import "../Signup/Register.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  SigninMain,
  SigninTitle,
  LeftWrapper,
  SigninForm,
  SignupMessage,
  SignupWrapper,
  SignupLink,
  FieldLabel,
  FieldInput,
} from "../../StyleComponent";

const LOGIN_URL = "/login";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({ username: user, password: pwd }),
        url: LOGIN_URL,
        withCredentials: true,
      };

      const response = await axios(options);

      const accessToken = response?.data?.access_token;

      setAuth({ user, pwd, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      setErrMsg("Login Failed");

      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <SigninMain>
      <LeftWrapper>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <SigninTitle>
          Sign-In to
          <br />
          access notes!
        </SigninTitle>
        <SignupWrapper>
          <SignupMessage>Don't have an account yet?</SignupMessage>
          <SignupLink href="/register">Sign Up</SignupLink>
        </SignupWrapper>
        <SigninForm onSubmit={handleSubmit}>
          <FieldLabel htmlFor="username">Email:</FieldLabel>
          <FieldInput
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />

          <FieldLabel htmlFor="password">Password:</FieldLabel>
          <FieldInput
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button>Sign In</button>
          <div className="persistCheck">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="persist">Trust this device</label>
          </div>
        </SigninForm>
      </LeftWrapper>
    </SigninMain>
  );
};

export default Login;
