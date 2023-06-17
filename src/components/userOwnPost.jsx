import React, { useState, useEffect } from "react";
import { delRoutine, userRoutines } from "../api/api";
import ErrorMessage from "./errorMessage";

export default function UserOwnPost(props) {
  const { token, routineId, routines, setRoutines } = props;
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="userOwnPost">
      <ErrorMessage errorMessage={errorMessage} />
      <button>Edit</button>
      <button
        onClick={async (e) => {
          const response = await delRoutine(token, routineId);
          if (response.error) {
            setErrorMessage(response.message);
            console.log(errorMessage, "y u break");
            document.getElementById("errorMessageBox").style.display = "block";
          }
          if (response.success) {
            let newRoutines = [];
            routines.filter((routine) => {
              if (routine.id !== routineId) {
                newRoutines.push(routine);
              }
            });
            console.log(newRoutines);
            return setRoutines(newRoutines);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}
