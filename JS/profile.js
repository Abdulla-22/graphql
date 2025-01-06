import { logUserInfo, logTransactionInfo, logProgressInfo, logObjectInfo } from "./processInfo.js";

document.getElementById("logout").addEventListener("click", logout);


function logout() {
  localStorage.removeItem("jwt");
  window.location.href = "index.html";
}

extractInfo();

async function extractInfo() {
  const jwt = localStorage.getItem("jwt");

  // If jwt is not present, redirect to login page
  if (!jwt) {
    window.location.href = "index.html";
  }

  const query = `
{
  user {
    id
    login
    firstName
    lastName
    email
    campus
    createdAt
    updatedAt
    githubId
    NotFinshProjects: progresses(
      where: {object: {type: {_eq: "project"}}, isDone: {_eq: false}}
    ) {
      id
      grade
      path
      createdAt
      object {
        name
        type
      }
    }
    FinshProjects: progresses(
      order_by: {createdAt: asc}
      where: {object: {type: {_eq: "project"}}, isDone: {_eq: true}}
    ) {
      id
      grade
      path
      createdAt
      object {
        name
        type
      }
    }
    transactions_aggregate(where: {type: {_eq: "xp"}}) {
      aggregate {
        sum {
          amount
        }
        count
      }
    }
    progresses(
      order_by: {createdAt: asc}
      where: {_and: [{path: {_ilike: "%/bh-module/%"}}, {grade: {_neq: 0}}, {path: {_nlike: "%/piscine-js/%"}}, {path: {_nlike: "%/piscine-go/%"}}]}
    ) {
      id
      grade
      path
      createdAt
      updatedAt
      isDone
      object {
        name
        type
      }
    }
    auditRatio
    totalUp
    totalDown
  }
}

`;

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

    logUserInfo(data);
    logTransactionInfo(data);
    logProgressInfo(data);
    logObjectInfo(data);

  } catch (error) {
    console.log(error);
  }
}



