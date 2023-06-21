import React, { useContext, useEffect, useState, MouseEvent } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import RoutineBox from "./routineBox";

export default function Routines() {
  const { token, routinesObj, userProfileObj, activitiesObj } =
    useOutletContext();
  const { activities, setActivities } = activitiesObj;
  const { userProfile } = userProfileObj;
  const { routines, setRoutines } = routinesObj;
  const [newNameText, setNewNameText] = useState("");
  const [newGoalText, setNewGoalText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newCountText, setNewCountText] = useState(Number);
  const [newDurationText, setNewDurationText] = useState(Number);
  const [activityId, setActivityId] = useState("");
  console.log(token, "helooooooofajsdjfklsjdklfj sl");
  return (
    <div>
      <div className="editBox" id="editBoxId">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            let newRoutines = [];
            const response1 = await patchRoutine(
              token,
              newNameText,
              newGoalText,
              routineId
            );
            const response2 = await addRoutineActivity(
              routineId,
              activityId,
              newCountText,
              newDurationText
            );
            if (response1.error) {
              setErrorMessage(response1.error);
              document.getElementById("errorMessageBox").style.display =
                "block";
            }
            if (response2.error) {
              setErrorMessage(response2.error);
              document.getElementById("errorMessageBox").style.display =
                "block";
            }
            if (response1) {
              routines.filter((routine) => {
                if (routine.id.toString() !== routineId) {
                  newRoutines.push(routine);
                } else {
                  activities.map((activity) => {
                    if (activity.id.toString() === activityId) {
                      response2.name = activity.name;
                      response2.description = activity.description;
                      routine.name = newNameText;
                      routine.goal = newGoalText;

                      routine.activities.push(response2);
                      newRoutines.push(routine);
                    }
                  });
                }
              });
            }
            localStorage.removeItem("itemToEdit");
            setNewNameText("");
            setNewGoalText("");
            setNewCountText(0);
            setNewDurationText(0);
            setActivityId(0);
            document.getElementById("editBoxId").style.display = "none";
            document.getElementById("newRoutineFormId").style.display = "block";
            return setRoutines(newRoutines);
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
      <RoutineBox
        setRoutines={setRoutines}
        routines={routines}
        userProfile={userProfile}
        token={token}
      />
    </div>
  );
}
