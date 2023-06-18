import React, { useEffect, useState } from "react";
import ErrorMessage from "./errorMessage";
import { fetchAllRoutines, getAllActivities, userRoutines } from "../api/api";
import { useSearchParams } from "react-router-dom";

export default function EditBox(props) {
  const { userProfile, authToken } = props;
  const [newNameText, setNewNameText] = useState("");
  const [newGoalText, setNewGoalText] = useState("");
  const [activities, setActivities] = useState([]);
  const routineId = localStorage.getItem("itemToEdit");

  useEffect(() => {
    try {
      Promise.all([getAllActivities()]).then((values) => {
        setActivities(values[0]);
      });
    } catch (error) {}
  }, []);
  return (
    <div className="editBox" id="editBoxId">
      <form
        onSubmit={(e) => {
          /* 99% chance this isn't the form you are looking for be wary */
          const response = postRoutine(authToken, newNameText, newGoalText);
          if (response.error) {
            setErrorMessage(response.error);
            document.getElementById("errorMessageBox").style.display = "none";
            setIsLoaded(true);
          }
        }}
        className="newRoutineForm"
      >
        <h1>Edit Routine</h1>
        <label htmlFor="newName">Name: </label>
        <input
          onChange={(e) => setNewNameText(e.target.value)}
          id="newName"
          type="text"
          value={newNameText}
        ></input>
        <label htmlFor="newGoal">Goal: </label>
        <input
          onChange={(e) => setNewGoalText(e.target.value)}
          type="text"
          id="newGoal"
          value={newGoalText}
        ></input>
        <select name="activity">
          {activities.map((activity) => (
            <option value={activity.name} key={activity.name}>
              {activity.name}
            </option>
          ))}
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
}
