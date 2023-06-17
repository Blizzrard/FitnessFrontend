import React, { useEffect, useState } from "react";
import { getProfile, userRoutines } from "../api/api";
import { useOutletContext } from "react-router-dom";

export default function MyRoutines() {
  const { userProfile, authToken, loaded } = useOutletContext();
  const [pulledRoutines, setPulledRoutines] = useState([]);
  useEffect(() => {
    try {
      Promise.all([userRoutines(userProfile[0].username, authToken)]).then(
        (values) => {
          setPulledRoutines(values[0]);
        }
      );
    } catch (error) {}
  }, [userProfile]);
  console.log(pulledRoutines, userProfile);
}
