import React, { useEffect, useState } from "react";
import { getProfile, postRoutine, userRoutines } from "../api/api";
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
  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      Promise.all([userRoutines(userProfile[0].username, authToken)])
        .then((values) => {
          setRoutines(values[0]);
        })
        .then(setIsLoaded(true));
    } catch (error) {}
  }, [userProfile]);
  if (!routines[0] || routines[0].creatorId === 488) {
    if (!authToken) {
      return <div>No user logged in</div>;
    }
    if (loaded && routines) {
      return (
        <div>
          <ErrorMessage errorMessage={errorMessage} />
          <EditBox routines={routines} />
          <form
            onSubmit={(e) => {
              /* 99% chance this isn't the form you are looking for be wary */
              const response = postRoutine(authToken, newNameText, newGoalText);
              if (response.error) {
                setErrorMessage(response.error);
                document.getElementById("errorMessageBox").style.display =
                  "none";
                setIsLoaded(true);
              }
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
  } else {
    return (
      <div>
        <ErrorMessage errorMessage={errorMessage} />
        <EditBox
          userProfile={userProfile}
          routines={routines}
          authToken={authToken}
          setRoutines={setRoutines}
        />
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
              document.getElementById("errorMessageBox").style.display =
                "block";
              return;
            }
            console.log(response);
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
}
