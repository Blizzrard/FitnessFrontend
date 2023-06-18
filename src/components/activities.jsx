import React, { useEffect, useState } from "react";
import { getAllActivities, postActivity } from "../api/api";
import { useOutletContext } from "react-router-dom";
import AllActivities from "./allActivities";
import ErrorMessage from "./errorMessage";

export default function Activities() {
  const { authToken, userProfile, routines } = useOutletContext();
  const [activities, setActivities] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [newNameText, setNewNameText] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    try {
      Promise.all([getAllActivities()]).then((value) => {
        setActivities(value[0]);
      });
    } catch (error) {}
  }, []);
  return (
    <div>
      <ErrorMessage errorMessage={errorMessage} />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await postActivity(
            authToken,
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
      <AllActivities activities={activities} routines={routines} />
    </div>
  );
}
