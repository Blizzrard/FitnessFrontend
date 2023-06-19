import React, { useEffect, useState } from "react";
import {
  addRoutineActivity,
  getAllActivities,
  getProfile,
  patchRoutine,
  postRoutine,
  userRoutines,
} from "../api/api";
import { useOutletContext } from "react-router-dom";
import RoutineBox from "./routineBox";
import ErrorMessage from "./errorMessage";
import EditBox from "./editBox";

export default function MyRoutines() {
  const { userProfile, authToken } = useOutletContext();
  const [routines, setRoutines] = useState([]);
  const [newNameText, setNewNameText] = useState("");
  const [newGoalText, setNewGoalText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newCountText, setNewCountText] = useState(Number);
  const [newDurationText, setNewDurationText] = useState(Number);
  const [activities, setActivities] = useState([]);
  const routineId = localStorage.getItem("itemToEdit");
  const [activityId, setActivityId] = useState("");
  const [loaded, setIsLoaded] = useState(false);
  console.log(userProfile, "just fine");

  useEffect(() => {
    try {
      Promise.all([
        userRoutines(
          localStorage.getItem("username"),
          localStorage.getItem("token")
        ),
        getAllActivities(),
      ])
        .then((values) => {
          setRoutines(values[0]);
          setActivities(values[1]);
        })
        .then(setIsLoaded(true));
    } catch (error) {}
  }, [userProfile, authToken]);
  if (!routines) {
    return (
      <div>
        <ErrorMessage errorMessage={errorMessage} />
        <EditBox routines={routines} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            /* 99% chance this isn't the form you are looking for be wary */
            const response = postRoutine(authToken, newNameText, newGoalText);
            if (response.error) {
              setErrorMessage(response.error);
              document.getElementById("errorMessageBox").style.display = "none";
              setIsLoaded(true);
            }
            let newArr = [...routines, response];
            setNewNameText("");
            setNewGoalText("");
            return setRoutines(newArr);
          }}
          className="newRoutineForm"
        >
          <h1>Create new routine:</h1>
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
          <button>Submit</button>
        </form>
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <div>
      <ErrorMessage errorMessage={errorMessage} />
      <div className="editBox" id="editBoxId">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            let newRoutines = [];
            const response1 = await patchRoutine(
              authToken,
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
              setIsLoaded(true);
            }
            if (response2.error) {
              setErrorMessage(response2.error);
              document.getElementById("errorMessageBox").style.display =
                "block";
              setIsLoaded(true);
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
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoaded(false);
          const response = await postRoutine(
            authToken,
            newNameText,
            newGoalText
          );
          if (response.error) {
            setErrorMessage(response.error);
            document.getElementById("errorMessageBox").style.display = "block";
            return;
          }
          let newRoutines = [...routines, response];
          setNewGoalText("");
          setNewNameText("");
          return setRoutines(newRoutines);
        }}
        className="newRoutineForm"
        id="newRoutineFormId"
      >
        <h1>Create new routine:</h1>
        <label htmlFor="newName">Name: </label>
        <input
          onChange={(e) => setNewNameText(e.target.value)}
          id="newName"
          type="text"
          value={newNameText}
          placeholder="Name"
        ></input>
        <label htmlFor="newGoal">Goal: </label>
        <input
          onChange={(e) => setNewGoalText(e.target.value)}
          type="text"
          id="newGoal"
          value={newGoalText}
          placeholder="Goal"
        ></input>
        <button>Submit</button>
      </form>
      <RoutineBox
        routines={routines}
        setRoutines={setRoutines}
        userProfile={userProfile[0]}
        token={authToken}
      />
    </div>
  );
}
