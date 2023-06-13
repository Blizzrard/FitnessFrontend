const BASE_URL = `http://fitnesstrac-kr.herokuapp.com/api`;

export async function fetchAllRoutines(token) {
  console.log(`${BASE_URL}/routines`);
  const response = await fetch(`${BASE_URL}/routines`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  //console.log(data);
  return data;
}

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    console.log(username, password);
    const result = await response.json();
    // As written below you can log your result
    // to check what data came back from the above code.
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
