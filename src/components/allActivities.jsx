import React, { useState } from "react";
import { delRoutineActivity } from "../api/api";

export default function AllActivities(props) {
  const { activities, routine, routines, userIsAuth, token } = props;
  const [routineActivities, setRoutineActivities] = useState([]);
  if (!activities) {
    return <div></div>;
  }
  if (routines) {
    return (
      <div>
        {routines.map((routine) => {
          return (
            <div key={Math.random()} className="allActivities">
              {activities.map((activity) => {
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
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
  if (userIsAuth === true) {
    return (
      <div className="allActivities">
        {activities.map((activity) => {
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
                <span
                  onClick={(e) => {
                    console.log(
                      routine.activities.map((activity) => {
                        let newArr = [];
                        if (
                          activity.id.toString() === e.target.parentElement.id
                        ) {
                          document.getElementById(
                            `${activity.id}`
                          ).style.display = "none";
                          return delRoutineActivity(
                            token,
                            activity.routineActivityId
                          );
                        }
                      })
                    );
                  }}
                  className="activityDel"
                >
                  x
                </span>
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
    );
  }
  return (
    <div className="allActivities">
      {activities.map((activity) => {
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
  );
}
