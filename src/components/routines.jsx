import React, { useContext, useEffect, useState, MouseEvent } from "react";
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
  return (
    <div>
      {routines.map((routine) => {
        return (
          <div className="routineBox" key={routine.id}>
            <h1>
              {routine.name}
              <div className="activityBox">
                <div>
                  <div>
                    Goal - {routine.goal}
                    <div>Owner - {routine.creatorName}</div>
                  </div>
                </div>

                <div className="allActivities">
                  {routine.activities.map((activity) => {
                    return (
                      <div className="singleActivity" key={activity.id}>
                        <button
                          id={activity.id}
                          onMouseOver={(e) => {
                            const hoveredAct = document.getElementById(
                              `actDesc${activity.id}Routine${routine.id}`
                            );
                            hoveredAct.style.display = "block";
                          }}
                          onMouseOut={(e) => {
                            const hoveredAct = document.getElementById(
                              `actDesc${activity.id}Routine${routine.id}`
                            );
                            hoveredAct.style.display = "none";
                          }}
                          className="activity"
                        >
                          {activity.name}
                        </button>
                        <div
                          id={`actDesc${activity.id}Routine${routine.id}`}
                          className="activityDesc"
                        >
                          <div>Description: {activity.description}</div>
                          <div>Count: {activity.count}</div>
                          <div>Duration: {activity.duration}</div>
                        </div>
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
