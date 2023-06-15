import React, { useEffect, useState } from "react";
import { getProfile } from "../api/api";

export default function Profile() {
  const token = localStorage.getItem("token");
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    try {
      Promise.all([getProfile(token)]).then((values) => {
        setUserProfile(values[0]);
      });
    } catch (error) {}
  }, []);

  if (!userProfile.username) {
    <div>
      <h1>Loading...</h1>
    </div>;
  } else {
    console.log(userProfile.username);
    return (
      <div>
        <h1>{userProfile.username}'s Profile</h1>
      </div>
    );
  }
}
