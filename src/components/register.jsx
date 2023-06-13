import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [usernameEntry, setUsernameEntry] = useState("");
  const [passwordEntry, setPasswordEntry] = useState("");
  return (
    <form
      className="loginBox"
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          const response = await registerUser(usernameEntry, passwordEntry);
          console.log(response);
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
        <button
          onClick={() => {
            navigate("/users/login");
          }}
        >
          Login
        </button>
      </div>
    </form>
  );
}
