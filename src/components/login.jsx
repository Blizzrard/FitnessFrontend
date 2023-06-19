import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { login } from "../api/api";
import ErrorMessage from "./errorMessage";

export default function Login() {
  const navigate = useNavigate();
  const [usernameEntry, setUsernameEntry] = useState("");
  const [passwordEntry, setPasswordEntry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div>
      <ErrorMessage errorMessage={errorMessage} />
      <form
        className="loginBox"
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await login(usernameEntry, passwordEntry);
            if (response.token) {
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("token", response.token);
              localStorage.setItem("username", response.user.username);
              setUsernameEntry("");
              setPasswordEntry("");
              navigate("/");
            }
            if (response.error) {
              setErrorMessage(response.error);
              document.getElementById("errorMessageBox").style.display =
                "block";
            }
          } catch (error) {}
        }}
      >
        Login
        <fieldset>
          <label htmlFor="username">Username:</label>
          <input
            id="usernameEntry"
            type="text"
            placeholder="John Smith..."
            value={usernameEntry}
            onChange={(e) => {
              setUsernameEntry(e.target.value);
            }}
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password:</label>
          <input
            id="passwordEntry"
            type="password"
            placeholder="Password..."
            value={passwordEntry}
            onChange={(e) => setPasswordEntry(e.target.value)}
          ></input>
        </fieldset>
        <div className="loginButtons">
          <React.Fragment>
            <button>Submit</button>
          </React.Fragment>
        </div>
      </form>
      <div className="loginOptions">
        <button
          onClick={(e) => {
            e.preventDefault();
            setUsernameEntry("");
            setPasswordEntry("");
            navigate("/users/register");
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
