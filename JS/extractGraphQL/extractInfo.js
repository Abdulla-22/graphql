import { query } from "./query.js";

document.getElementById("logout").addEventListener("click", logout);


function logout() {
  localStorage.removeItem("jwt");
  window.location.href = "index.html";
}

export async function extractInfo() {
  const jwt = localStorage.getItem("jwt");

  // If jwt is not present, redirect to login page
  if (!jwt) {
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch("https://learn.reboot01.com/api/graphql-engine/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    console.log(data);

    if (data.errors) {
      console.log(data.errors);
      return;
    }
    return data;

  } catch (error) {
    console.log(error);

  }
  
}



