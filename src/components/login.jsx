import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [usernameEntry, setUsernameEntry] = useState("");
  const [passwordEntry, setPasswordEntry] = useState("");
  return (
    <form
      className="loginBox"
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: {
                username: `${usernameEntry}`,
                password: `${passwordEntry}`,
              },
            }),
          });
          const result = await response.json();
          setAuthToken(result.data.token);
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("isLoggedIn", true);
          setUserProfile(myData);
          setUsernameEntry("");
          setPasswordEntry("");
          navigate("/");
          return result;
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
          <button onClick={() => {
            navigate("/users/register")
          }}>Sign Up</button>
      </div>
    </form>
  );
}
