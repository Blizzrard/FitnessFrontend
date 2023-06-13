import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import { fetchAllRoutines } from "../api/api";

export default function Root() {
  const [authToken, setAuthToken] = useState("");
  const [routines, setRoutines] = useState([]);
  return (
    <div className="main">
      <NavBar context={[authToken, setAuthToken]} />
      <Outlet
        context={{
          fetchAllRoutines: fetchAllRoutines,
          routines: [routines, setRoutines],
        }}
      />
    </div>
  );
}
