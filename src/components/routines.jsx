import React, { useContext, useEffect, useState, MouseEvent } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { Popover } from "bootstrap";

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
          <div className="routineBox" key={routine.id}>
            <h1>
              {routine.name}
              <div className="activityBox">
                <p>Goal - {routine.goal}</p>
                <div className="allActivities">
                  {routine.activities.map((activity) => {
                    return (
                      <div title={activity.description} className="activity">
                        {activity.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </h1>
          </div>
        );
      })}
    </div>
  );
}
