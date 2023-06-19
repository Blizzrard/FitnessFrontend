import React, { useState, useEffect } from "react";
import { delRoutine, userRoutines } from "../api/api";
import ErrorMessage from "./errorMessage";
import EditBox from "./editBox";

export default function UserOwnPost(props) {
  const { token, routineId, routines, setRoutines } = props;
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="userOwnPost">
      <ErrorMessage errorMessage={errorMessage} />
      <button
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("newRoutineFormId").style.display = "none";
          document.getElementById("editBoxId").style.display = "block";
          localStorage.setItem(
            "itemToEdit",
            e.target.parentElement.parentElement.id
          );
        }}
      >
        Edit
      </button>
      <button
        onClick={async (e) => {
          const response = await delRoutine(token, routineId);
          if (response.error) {
            setErrorMessage(response.message);
            document.getElementById("errorMessageBox").style.display = "block";
          }
          if (response.success) {
            let newRoutines = [];
            routines.filter((routine) => {
              if (routine.id !== routineId) {
                newRoutines.push(routine);
              }
            });
            return setRoutines(newRoutines);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}
