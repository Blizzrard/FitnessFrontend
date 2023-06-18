import React, { useEffect, useState } from "react";
import ErrorMessage from "./errorMessage";
import {
  fetchAllRoutines,
  getAllActivities,
  patchRoutine,
  addRoutineActivity,
  userRoutines,
} from "../api/api";
import { useSearchParams } from "react-router-dom";

export default function EditBox(props) {
  const { setRoutines, routines, authToken } = props;
  const [newNameText, setNewNameText] = useState("");
  const [newGoalText, setNewGoalText] = useState("");
  const [newCountText, setNewCountText] = useState(Number);
  const [newDurationText, setNewDurationText] = useState(Number);
  const [activities, setActivities] = useState([]);
  const routineId = localStorage.getItem("itemToEdit");
  const [activityId, setActivityId] = useState("");

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
          e.preventDefault();
          console.log(typeof newCountText, newDurationText);
          /* 99% chance this isn't the form you are looking for be wary */
          const response1 = patchRoutine(
            authToken,
            newNameText,
            newGoalText,
            routineId
          );
          const response2 = addRoutineActivity(
            routineId,
            activityId,
            newCountText,
            newDurationText
          );
          if (response1.error) {
            setErrorMessage(response1.error);
            document.getElementById("errorMessageBox").style.display = "none";
            setIsLoaded(true);
          }
          if (response2.error) {
            setErrorMessage(response2.error);
            document.getElementById("errorMessageBox").style.display = "none";
            setIsLoaded(true);
          }
          console.log(response1, response2);
          if (response1) {
            let newArr = routines.filter((routine) => {
              if (routine.id !== routineId) {
                return routine;
              }
            });
            console.log(newArr, response1, "extra confused");
            setRoutines([...newArr, response1]);
            setNewCountText(0);
            setNewDurationText(0);
            setNewNameText("");
            setNewGoalText("");
            localStorage.removeItem("itemToEdit");
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
        <select
          name="activity"
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
        >
          {activities.map((activity) => (
            <option value={activity.id} key={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
        <label htmlFor="newCount">Count: </label>
        <input
          onChange={(e) => setNewCountText(e.target.value)}
          type="number"
          id="newCount"
          value={newCountText}
        ></input>
        <label htmlFor="newDuration">Duration: </label>
        <input
          onChange={(e) => setNewDurationText(e.target.value)}
          type="number"
          id="newDuration"
          value={newDurationText}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
}
