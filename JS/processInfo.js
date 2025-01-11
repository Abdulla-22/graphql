export function logUserInfo(data) {
    // after testing the query I foun that it retarn and aray of the login user only (one user)
    const user = data.data.user[0];
    if (user) {
        document.getElementById("welcomeName").innerText +=
            "Welcome, " + user.firstName + " " + user.lastName + "!";
        document.getElementById("FullName").innerText += " " + user.firstName + " " + user.lastName;
        document.getElementById("Username").innerText += " " + user.login;
        // document.getElementById("UserID").innerText += (" " + user.id);
        document.getElementById("Campus").innerText += (" " + user.campus.charAt(0).toUpperCase() + user.campus.slice(1));
        document.getElementById("userEmail").innerText += (" " + user.email);
        // document.getElementById("githubId").innerText += (" " + user.githubId);
        document.getElementById("userLevel").innerText += (" " + user.transactions[0].amount);

        if (user.transactions[0].amount < 0 && user.transactions[0].amount < 10) {
            document.getElementById("userRank").innerText += (" Aspiring developer");

        } else if (user.transactions[0].amount >= 10 && user.transactions[0].amount < 20) {
            document.getElementById("userRank").innerText += (" Beginner developer");

        } else if (user.transactions[0].amount >= 20 && user.transactions[0].amount < 30) {
            document.getElementById("userRank").innerText += (" Apprentice developer");

        } else if (user.transactions[0].amount >= 30 && user.transactions[0].amount < 40) {
            document.getElementById("userRank").innerText += (" Assistant developer");

        } else if (user.transactions[0].amount >= 40 && user.transactions[0].amount < 50) {
            document.getElementById("userRank").innerText += (" Basic developer");

        } else if (user.transactions[0].amount >= 50 && user.transactions[0].amount < 55) {
            document.getElementById("userRank").innerText += (" Junior developer");

        } else if (user.transactions[0].amount >= 55 && user.transactions[0].amount < 60) {
            document.getElementById("userRank").innerText += (" Confirmed developer");

        } else if (user.transactions[0].amount >= 60) {
            document.getElementById("userRank").innerText += (" Full-Stack developer");

        }

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
    // document.getElementById("upXp").setAttribute("width", perUpBar);
    // document.getElementById("downXp").setAttribute("x", perUpBar);
    // document.getElementById("downXp").setAttribute("width", perDownBar);


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
    // console.log("Finished Projects: ", finshedProject);

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

export function exGain(data) {
    const projectsData = data.data.user[0]?.projectEx || [];

    if (!projectsData.length) {
        console.error("No project data available.");
        return;
    }

    const startDate = new Date(projectsData[0]?.createdAt);
    const finishDate = new Date(projectsData[projectsData.length - 1]?.createdAt);

    if (isNaN(startDate.getTime()) || isNaN(finishDate.getTime())) {
        console.error("Invalid startDate or finishDate.");
        return;
    }

    // Find the maximum amount for scaling
    const maxAmount = Math.max(...projectsData.map(project => project.amount));

    // SVG container dimensions
    const svgWidth = 400;
    const svgHeight = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Calculate scales
    const xScale = (date) => {
        return (
            ((new Date(date) - startDate) / (finishDate - startDate)) * width
        );
    };

    const yScale = (amount) => {
        return height - (amount / maxAmount) * height;
    };

    // Bar and spacing
    const totalBars = projectsData.length;
    const barSpacing = 2; // Space between bars
    const barWidth = Math.max((width - barSpacing * (totalBars - 1)) / totalBars, 5); // Ensure a minimum width of 5

    // Get SVG element
    const svg = document.querySelector("#graph-container svg");
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);

    // Clear previous content
    svg.innerHTML = "";

    // Create chart group
    const chartGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    chartGroup.setAttribute("transform", `translate(${margin.left}, ${margin.top})`);
    svg.appendChild(chartGroup);

    // Draw axes
    drawAxes(chartGroup, width, height, startDate, finishDate, maxAmount);

    // Draw bars
    projectsData.forEach((project, index) => {
        const x = index * (barWidth + barSpacing); // Increment x position with spacing
        const y = yScale(project.amount);
        const barHeight = height - y;

        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute("x", x);
        bar.setAttribute("y", y);
        bar.setAttribute("width", barWidth);
        bar.setAttribute("height", barHeight);
        bar.setAttribute("fill", "steelblue");
        bar.innerHTML = `<title>${project.object.name} XP: ${project.amount / 1000}</title>`;
        chartGroup.appendChild(bar);

        // Add label above each bar
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", x + barWidth / 2);
        label.setAttribute("y", y - 5);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("fill", "black");
        // label.textContent = (project.amount / 1000).toFixed(1) + "k"; // Display amount in 'k'
        chartGroup.appendChild(label);
    });
}

function drawAxes(chartGroup, width, height, startDate, finishDate, maxAmount) {
    // X-axis
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute("x1", 0);
    xAxis.setAttribute("y1", height);
    xAxis.setAttribute("x2", width);
    xAxis.setAttribute("y2", height);
    xAxis.setAttribute("stroke", "black");
    chartGroup.appendChild(xAxis);

    // Calculate 5 evenly spaced dates
    const timeDiff = finishDate.getTime() - startDate.getTime();
    const step = timeDiff / 4; // Divide into 4 intervals for 5 points
    const dates = Array.from({ length: 5 }, (_, i) => new Date(startDate.getTime() + i * step));

    // Add date labels to X-axis
    dates.forEach((date, index) => {
        const position = (index / 4) * width; // Evenly distribute across the width
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", position);
        label.setAttribute("y", height + 20); // Position below the x-axis
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("font-size", "10px");
        label.textContent = date.toLocaleDateString(); // Format date
        chartGroup.appendChild(label);
    });

    // Y-axis
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxis.setAttribute("x1", 0);
    yAxis.setAttribute("y1", 0);
    yAxis.setAttribute("x2", 0);
    yAxis.setAttribute("y2", height);
    yAxis.setAttribute("stroke", "black");
    chartGroup.appendChild(yAxis);

    // Y-axis labels
    const yTicks = 5; // Number of ticks on Y-axis
    for (let i = 0; i <= yTicks; i++) {
        const value = (maxAmount / yTicks) * i;
        const y = height - (value / maxAmount) * height;

        // Draw tick
        const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
        tick.setAttribute("x1", -5);
        tick.setAttribute("y1", y);
        tick.setAttribute("x2", 0);
        tick.setAttribute("y2", y);
        tick.setAttribute("stroke", "black");
        chartGroup.appendChild(tick);

        // Add label
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", -10);
        label.setAttribute("y", y + 3);
        label.setAttribute("text-anchor", "end");
        label.setAttribute("font-size", "10px");
        label.textContent = (value / 1000).toFixed(1) + "k"; // Display amount in 'k'
        chartGroup.appendChild(label);
    }
}

