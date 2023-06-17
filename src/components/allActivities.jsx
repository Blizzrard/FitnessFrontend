import React from "react";

export default function AllActivities(props) {
  const { activities, routine } = props;
  if (!activities) {
    return <div></div>;
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
