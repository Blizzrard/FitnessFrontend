import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import { fetchAllRoutines, getProfile } from "../api/api";

export default function Root() {
  const [authToken, setAuthToken] = useState("");
  const [routines, setRoutines] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    try {
      Promise.all([
        localStorage.getItem("token"),
        getProfile(authToken),
        fetchAllRoutines(),
      ]).then((values) => {
        setAuthToken(values[0]);
        setUserProfile(values[1]);
        setRoutines(values[2]);
      });
    } catch (error) {}
  }, [authToken]);
  return (
    <div className="main">
      <NavBar context={authToken} />
      <Outlet
        context={{
          fetchAllRoutines: fetchAllRoutines,
          routines: [routines, setRoutines],
          userProfile: [userProfile, setUserProfile],
          authToken,
        }}
      />
    </div>
  );
}
