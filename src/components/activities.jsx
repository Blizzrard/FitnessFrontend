import React, { useEffect, useState } from "react";
import { getAllActivities, postActivity } from "../api/api";
import { useOutletContext } from "react-router-dom";
import AllActivities from "./allActivities";
import ErrorMessage from "./errorMessage";

export default function Activities() {
  const { token, userProfile, routinesObj, activitiesObj } = useOutletContext();
  const { activities, setActivities } = activitiesObj;
  const { routines, setRoutines } = routinesObj;
  const [errorMessage, setErrorMessage] = useState("");
  const [newNameText, setNewNameText] = useState("");
  const [newDescription, setNewDescription] = useState("");

  return (
    <div>
      <ErrorMessage errorMessage={errorMessage} />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await postActivity(
            token,
            newNameText,
            newDescription
          );
          if (response.error) {
            setErrorMessage(response.error);
            document.getElementById("errorMessageBox").style.display = "block";
            return;
          }
          let newActivities = [...activities, response];
          setNewDescription("");
          setNewNameText("");
          return setActivities(newActivities);
        }}
        className="newRoutineForm"
      >
        <h1>Create new activity:</h1>
        <label htmlFor="newName">Name: </label>
        <input
          onChange={(e) => setNewNameText(e.target.value)}
          id="newName"
          type="text"
          value={newNameText}
        ></input>
        <label htmlFor="newDescription">Description: </label>
        <input
          onChange={(e) => setNewDescription(e.target.value)}
          type="text"
          id="newDescription"
          value={newDescription}
        ></input>
        <button>Submit</button>
      </form>
      <AllActivities activities={activities} />
    </div>
  );
}
