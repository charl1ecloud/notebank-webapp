import { useState, useEffect } from "react";
import useAuth from "../context/AuthProvider";
import qs from "qs";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const LOGIN_URL = "/login";
const PWD_REGEX = /^.{8,24}$/;
const REGISTER_URL = "/users";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPwd(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setName(e.target.value);
  };

  const handleConfirmChange = (e) => {
    setMatchPwd(e.target.value);
  };

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

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
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validPwd) {
      setErrMsg("* Invalid Password");
      return;
    } else if (!validMatch) {
      setErrMsg("* Password do not match");
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ email: user, password: pwd, username: name }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setName("");
      setUser("");
      setPwd("");
      setMatchPwd("");
      setLogin(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("* No Server Response");
      } else {
        setErrMsg("* Registration Failed");
      }
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setLogin(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Sign In
      </Button>
      {login ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Sign-In to <br />
            access notes!
          </DialogTitle>
          <DialogContent>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <DialogContentText>Don't have an account yet?</DialogContentText>
              <DialogContentText
                onClick={() => {
                  setLogin(false);
                }}
              >
                Sign Up
              </DialogContentText>
            </div>
            {errMsg == "" ? (
              <></>
            ) : (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errMsg}
              </Alert>
            )}

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              onChange={handleUserChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={handlePasswordChange}
            />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                checked={persist}
                onChange={togglePersist}
                label="Remember me"
              />
            </FormGroup>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleSubmit}>Sign In</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText>It's quick and easy.</DialogContentText>
            {errMsg == "" ? (
              <></>
            ) : (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errMsg}
              </Alert>
            )}
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="text"
              style={{ width: "50%" }}
              variant="standard"
              onChange={handleUsernameChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              onChange={handleUserChange}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                type="password"
                style={{ width: "48%" }}
                variant="standard"
                onChange={handlePasswordChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="passwordmatch"
                label="Confirm password"
                type="password"
                style={{ width: "48%" }}
                variant="standard"
                onChange={handleConfirmChange}
              />
            </div>
            <DialogContentText>
              By clicking "Sign Up", you agree to our terms, data policy, cookie
              policy and anti-spam policy. You may receive SMS/email
              notifications from us and can opt out at any time.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSignUp}>Sign Up</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Login;
