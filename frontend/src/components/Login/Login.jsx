import { useRef, useState, useEffect } from "react";
import useAuth from "../../context/AuthProvider";
import qs from "qs";
import axios from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  SigninMain,
  SigninTitle,
  HalfWrapper,
  SigninForm,
  SignupMessage,
  SignupWrapper,
  SignupLink,
  FieldLabel,
  FieldInput,
  FullWidthButton,
  PersistCheck,
  Checkbox,
  SigninImg,
  PasswordHolder,
  Eye,
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

  const [visible, setVisible] = useState(false);

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
      setErrMsg("* Login Failed");

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
      <HalfWrapper>
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
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <FieldLabel margin="0 0 5px 0" htmlFor="username">
            Email:
          </FieldLabel>
          <FieldInput
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />

          <FieldLabel margin="0 0 5px 0" htmlFor="password">
            Password:
          </FieldLabel>
          <PasswordHolder>
            <FieldInput
              type={visible ? "text" : "password"}
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            {visible ? (
              <Eye
                className="fa-solid fa-eye"
                onClick={() => setVisible((prev) => !prev)}
              ></Eye>
            ) : (
              <Eye
                className="fa-solid fa-eye-slash"
                onClick={() => setVisible((prev) => !prev)}
              ></Eye>
            )}
          </PasswordHolder>

          <PersistCheck>
            <Checkbox
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
            />
            <FieldLabel font_size="15px" htmlFor="persist">
              Keep me logged in
            </FieldLabel>
          </PersistCheck>

          <FullWidthButton margin="30px 0 0 0">Sign In</FullWidthButton>
        </SigninForm>
      </HalfWrapper>

      <HalfWrapper height="1000px" width="750px">
        <SigninImg />
        <FullWidthButton width="500px" margin="20px auto" bg_color="#4285F4">
          Continue with Google
        </FullWidthButton>
        <FullWidthButton width="500px" margin="20px auto" bg_color="#000">
          Sign In with SSO
        </FullWidthButton>
      </HalfWrapper>
    </SigninMain>
  );
};

export default Login;
