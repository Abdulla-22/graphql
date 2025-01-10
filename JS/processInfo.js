export function logUserInfo(data) {
    // after testing the query I foun that it retarn and aray of the login user only (one user)
    const user = data.data.user[0];
    if (user) {
        document.getElementById("welcomeName").innerText +=
            "Welcome, " + user.firstName + " " + user.lastName + "!";
        document.getElementById("Username").innerText += " " + user.login;
        document.getElementById("UserID").innerText += (" " + user.id);
        document.getElementById("Campus").innerText += (" " + user.campus);
        document.getElementById("userEmail").innerText += (" " + user.email);
        document.getElementById("githubId").innerText += (" " + user.githubId);
        document.getElementById("userLevel").innerText += (" " + user.transactions[0].amount);

    } else {
        console.error("User data not found.");
        alert("User information is unavailable. Please log in again.");
        // logout();
    }

}

export function logTransactionInfo(data) {
    const transactions = data.data.transaction;
    console.log("Transactions: ", transactions);

    if (transactions && transactions.length > 0) {
        const totalXP = transactions.reduce((sum, tx) => sum + tx.amount, 0);

        console.log("Total XP Amount:", totalXP);

        document.getElementById("totalXP").innerText = `Total XP: ${totalXP}`;
    } else {
        console.log("No XP transactions found.");
        document.getElementById("totalXP").innerText = "Total XP: 0";
    }
}

export function auditRatio(data) {
    var auditRatio = data.data.user[0].auditRatio.toFixed(1);
    var totalUP = data.data.user[0].totalUp;
    var totalDown = data.data.user[0].totalDown;
    var totalAudit = totalUP + totalDown;

    var perUpBar = (totalUP / totalAudit) * 100;
    var perDownBar = (totalDown / totalAudit) * 100;

    // document.getElementById("upXp").setAttribute("x", perUpBar);
    document.getElementById("upXp").setAttribute("width", perUpBar);
    document.getElementById("downXp").setAttribute("x", perUpBar);
    document.getElementById("downXp").setAttribute("width", perDownBar);


    var perUp = (totalUP / totalAudit) * 628;
    var perDown = (totalDown / totalAudit) * 628;

    document.getElementById("AuditUp").setAttribute("stroke-dasharray", `${perUp} ${(628 - perUp)}`);
    document.getElementById("AuditDown").setAttribute("stroke-dasharray", `${perDown} ${(628 - perDown)}`);
    document.getElementById("AuditDown").setAttribute("stroke-dashoffset", (628 - perUp));

    document.getElementById("ratioNumber").innerHTML = auditRatio;
    document.getElementById("auditRatioNumber").innerHTML = "Audit Ratio: " + auditRatio;
    document.getElementById("auditRatioUP").innerHTML = "Audit up: " + perUpBar.toFixed(2) + "%";
    document.getElementById("auditRatioDOWN").innerHTML = "Audit down: " + perDownBar.toFixed(2) + "%";

}

export function toFinshProject(data) {
    var toFinshProject = data.data.user[0].NotFinshProjects;

    if (toFinshProject.length === 0) {
        document.getElementById("project-to-finsh").innerHTML += "No projects found!<br>Start working on your projects!";
        return;

    }

    for (let x = 0; x < toFinshProject.length; x++) {
        var project = document.createElement("div");
        var text = x + 1 + ". " + toFinshProject[x].object.name;
        project.innerHTML = text;
        document.getElementById("project-to-finsh").appendChild(project);
    }
}

export function finshedProject(data) {
    var finshedProject = data.data.user[0].FinshProjects;
    console.log("Finished Projects: ", finshedProject);

    const tableBody = document.getElementById("project-finished-table-body");

    tableBody.innerHTML = "";

    for (let x = 0; x < finshedProject.length; x++) {
        const project = finshedProject[x];

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        const startDateCell = document.createElement("td");
        const finishDateCell = document.createElement("td");
        const timeTakenCell = document.createElement("td");

        nameCell.textContent = project.object.name;
        startDateCell.textContent = formatDate(project.createdAt);
        finishDateCell.textContent = formatDate(project.updatedAt);

        const startDate = new Date(project.createdAt);
        const finishDate = new Date(project.updatedAt);
        const timeTaken = Math.ceil((finishDate - startDate) / (1000 * 60 * 60 * 24));
        timeTakenCell.textContent = `${timeTaken} days`;

        row.appendChild(nameCell);
        row.appendChild(startDateCell);
        row.appendChild(finishDateCell);
        row.appendChild(timeTakenCell);

        tableBody.appendChild(row);

        

    }
}

function formatDate(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function logObjectInfo(data) {

}