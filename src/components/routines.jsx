import React, { useContext, useEffect, useState, MouseEvent } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import RoutineBox from "./routineBox";

export default function Routines() {
  const {
    fetchAllRoutines,
    routines: [routines, setRoutines],
    userProfile,
  } = useOutletContext();

  useEffect(() => {
    try {
      Promise.all([fetchAllRoutines()]).then((value) => {
        setRoutines(value[0]);
      });
    } catch (error) {}
  }, []);
  return <RoutineBox routines={routines} userProfile={userProfile[0]} />;
}
