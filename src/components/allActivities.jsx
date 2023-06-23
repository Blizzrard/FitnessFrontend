import React, { useState } from "react";
import { delRoutineActivity } from "../api/api";
import { useEffect } from "react";

export default function AllActivities(props) {
  const {
    activities,
    routine,
    routines,
    userIsAuth,
    token,
    notRoutines,
    userRActivities,
  } = props;
  const [routineActivities, setRoutineActivities] = useState([]);
  if (routines && !userIsAuth) {
    console.log("oh you are to blame");
    return (
      <div className="allActivities">
        {routines.map((routine) => {
          return (
            <div key={Math.random()}>
              {activities.map((activity) => {
                return (
                  <div className="singleActivity" key={activity.id}>
                    <button
                      id={activity.id}
                      onMouseOver={(e) => {
                        const hoveredAct = document.getElementById(
                          `actDesc${activity.id}${routine.id}`
                        );
                        hoveredAct.style.display = "block";
                      }}
                      onMouseOut={(e) => {
                        const hoveredAct = document.getElementById(
                          `actDesc${activity.id}${routine.id}`
                        );
                        hoveredAct.style.display = "none";
                      }}
                      className="activity"
                    >
                      {activity.name}
                    </button>
                    <div
                      id={`actDesc${activity.id}${routine.id}`}
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
        {userRActivities.map((activity) => {
          return (
            <div className="singleActivity" key={activity.id}>
              <button
                id={activity.id}
                onMouseOver={(e) => {
                  const hoveredAct = document.getElementById(
                    `actDesc${activity.id}${routine.id}`
                  );
                  hoveredAct.style.display = "block";
                }}
                onMouseOut={(e) => {
                  const hoveredAct = document.getElementById(
                    `actDesc${activity.id}${routine.id}`
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
                          // document.getElementById(
                          //   `${activity.id}`
                          // ).style.display = "none";
                          return delRoutineActivity(
                            token,
                            activity.routineActivityId
                          );
                        } else {
                          newArr.push(activity);
                          return setRoutineActivities(newArr);
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
                id={`actDesc${activity.id}${routine.id}`}
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
  } else if (notRoutines) {
    return (
      <div className="allActivities">
        {activities.map((activity, index) => {
          return (
            <div className="singleActivity" key={activity.id}>
              <button
                id={activity.id}
                onMouseOver={(e) => {
                  const hoveredAct = document.getElementById(
                    `actDesc${activity.id}${index}`
                  );
                  hoveredAct.style.display = "block";
                }}
                onMouseOut={(e) => {
                  const hoveredAct = document.getElementById(
                    `actDesc${activity.id}${index}`
                  );
                  hoveredAct.style.display = "none";
                }}
                className="activity"
              >
                {activity.name}
              </button>
              <div
                id={`actDesc${activity.id}${index}`}
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
                  `actDesc${activity.id}${routine.id}`
                );
                hoveredAct.style.display = "block";
              }}
              onMouseOut={(e) => {
                const hoveredAct = document.getElementById(
                  `actDesc${activity.id}${routine.id}`
                );
                hoveredAct.style.display = "none";
              }}
              className="activity"
            >
              {activity.name}
            </button>
            <div
              id={`actDesc${activity.id}${routine.id}`}
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
