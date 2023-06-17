import React, { useEffect, useState } from "react";

export default function ErrorMessage(props) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    try {
      Promise.all([props.errorMessage]).then(
        (values) => {
          setMessage(values[0]);
        },
        [message]
      );
    } catch (error) {}
  });
  return (
    <div id="errorMessageBox" className="errorMessage">
      <div className="innerError">
        <h1>Something went wrong!</h1>
        <h3>{message}</h3>
      </div>
      <button
        onClick={() => {
          document.getElementById("errorMessageBox").style.display = "none";
          setMessage('');
        }}
      >
        Okay
      </button>
    </div>
  );
}
