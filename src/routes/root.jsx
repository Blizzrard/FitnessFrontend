import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import { fetchAllRoutines, getProfile, myData } from "../api/api";

export default function Root() {
  const [authToken, setAuthToken] = useState("");
  const [routines, setRoutines] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    try {
      Promise.all([
        localStorage.getItem("token"),
        getProfile(localStorage.getItem("token")),
        fetchAllRoutines(),
      ]).then((values) => {
        setAuthToken(values[0]);
        setUserProfile(values[1]);
        setRoutines(values[2]);
      });
    } catch (error) {}
  }, [!userProfile]);
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
