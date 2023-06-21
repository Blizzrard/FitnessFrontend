import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import {
  fetchAllRoutines,
  getAllActivities,
  getProfile,
  myData,
  userRoutines,
} from "../api/api";

export default function Root() {
  const [authToken, setAuthToken] = useState("");
  const [routines, setRoutines] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [activities, setActivities] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      Promise.all([
        localStorage.getItem("token"),
        getProfile(localStorage.getItem("token")),
        fetchAllRoutines(),
        getAllActivities(),
      ]).then((values) => {
        setAuthToken(values[0]);
        setUserProfile(values[1]);
        setRoutines(values[2]);
        setActivities(values[3]);
        setIsLoading(false);
      });
    } catch (error) {}
  }, []);
  console.log(isLoading);
  return (
    <div className="main">
      <NavBar context={authToken} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <Outlet
          context={{
            routinesObj: { routines: routines, setRoutines: setRoutines },
            userProfileObj: {
              userProfile: userProfile,
              setUserProfile: setUserProfile,
            },
            activitiesObj: {
              activities: activities,
              setActivities: setActivities,
            },
            token: authToken,
          }}
        />
      )}
    </div>
  );
}
