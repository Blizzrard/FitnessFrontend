import React, { useEffect, useState } from "react";
import AllActivities from "./allActivities";
import UserOwnPost from "./userOwnPost";

export default function RoutineBox(props) {
  const { routines, userProfile, token, setRoutines } = props;
  const userIsAuth = true;
  if (routines) {
    return (
      <div className="userRoutines">
        {routines.map((routine) => {
          if (userProfile) {
            if (routine.creatorId === userProfile.id) {
              return (
                <div className="routineBox" key={routine.id} id={routine.id}>
                  <div className="innerRoutineBox">
                    <h1>{routine.name}</h1>
                    <div className="activityBox">
                      <div className="routineInfo">
                        <div>
                          Goal - {routine.goal}
                          <div>Owner - {routine.creatorName}</div>
                        </div>
                      </div>
                      <AllActivities
                        activities={routine.activities}
                        routine={routine}
                        userIsAuth={userIsAuth}
                        token={token}
                      />
                    </div>
                  </div>
                  <UserOwnPost
                    routineId={routine.id}
                    token={token}
                    routines={routines}
                    setRoutines={setRoutines}
                  />
                </div>
              );
            }
            return (
              <div className="routineBox" key={routine.id}>
                <div className="innerRoutineBox">
                  <h1>{routine.name}</h1>
                  <div className="activityBox">
                    <div className="routineInfo">
                      <div>
                        Goal - {routine.goal}
                        <div>Owner - {routine.creatorName}</div>
                      </div>
                    </div>
                    <AllActivities
                      activities={routine.activities}
                      routine={routine}
                    />
                  </div>
                </div>
              </div>
            );
          } else {
            return <div>Loading</div>;
          }
        })}
      </div>
    );
  } else {
    return <div></div>;
  }
}
