import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";

export default function Routines() {
  const {
    fetchAllRoutines,
    routines: [routines, setRoutines],
  } = useOutletContext();
  useEffect(() => {
    try {
      Promise.all([fetchAllRoutines()]).then((value) => {
        setRoutines(value[0]);
      });
    } catch (error) {}
  }, []);
  console.log(routines);
  return (
    <div>
      {routines.map((routine) => {
        return (
          <React.Fragment key={routine.id}>
            <div>
              <h1>{routine.name}</h1>
              <div>
                {routine.activities.map((activity) => {
                  return <p>{activity.description}</p>;
                })}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
