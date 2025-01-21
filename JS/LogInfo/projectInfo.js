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

    const maxAmount = Math.max(...projectsData.map(project => project.amount));

    const svgWidth = 400;
    const svgHeight = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const yScale = (amount) => {
        return height - (amount / maxAmount) * height;
    };

    const totalBars = projectsData.length;
    const barSpacing = 2; 
    const barWidth = Math.max((width - barSpacing * (totalBars - 1)) / totalBars, 5); 

    const svg = document.querySelector("#graph-container svg");
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);

    svg.innerHTML = "";

    const chartGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    chartGroup.setAttribute("transform", `translate(${margin.left}, ${margin.top})`);
    svg.appendChild(chartGroup);

    drawAxes(chartGroup, width, height, startDate, finishDate, maxAmount);

    projectsData.forEach((project, index) => {
        const x = index * (barWidth + barSpacing); 
        const y = yScale(project.amount);
        const barHeight = height - y;

        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute("x", x);
        bar.setAttribute("y", y);
        bar.setAttribute("width", barWidth);
        bar.setAttribute("height", barHeight);
        bar.setAttribute("fill", "#820798");
        bar.innerHTML = `<title>${project.object.name} XP: ${project.amount / 1000}</title>`;
        chartGroup.appendChild(bar);

        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", x + barWidth / 2);
        label.setAttribute("y", y - 5);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("fill", "black");
        chartGroup.appendChild(label);
    });
}

function drawAxes(chartGroup, width, height, startDate, finishDate, maxAmount) {
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute("x1", 0);
    xAxis.setAttribute("y1", height);
    xAxis.setAttribute("x2", width);
    xAxis.setAttribute("y2", height);
    xAxis.setAttribute("stroke", "black");
    chartGroup.appendChild(xAxis);

    const timeDiff = finishDate.getTime() - startDate.getTime();
    const step = timeDiff / 4; 
    const dates = Array.from({ length: 5 }, (_, i) => new Date(startDate.getTime() + i * step));

    dates.forEach((date, index) => {
        const position = (index / 4) * width; 
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", position);
        label.setAttribute("y", height + 20); 
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("font-size", "10px");
        label.textContent = date.toLocaleDateString(); 
        chartGroup.appendChild(label);
    });

    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxis.setAttribute("x1", 0);
    yAxis.setAttribute("y1", 0);
    yAxis.setAttribute("x2", 0);
    yAxis.setAttribute("y2", height);
    yAxis.setAttribute("stroke", "black");
    chartGroup.appendChild(yAxis);

    const yTicks = 5; 
    for (let i = 0; i <= yTicks; i++) {
        const value = (maxAmount / yTicks) * i;
        const y = height - (value / maxAmount) * height;

        const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
        tick.setAttribute("x1", -5);
        tick.setAttribute("y1", y);
        tick.setAttribute("x2", 0);
        tick.setAttribute("y2", y);
        tick.setAttribute("stroke", "black");
        chartGroup.appendChild(tick);

        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", -10);
        label.setAttribute("y", y + 3);
        label.setAttribute("text-anchor", "end");
        label.setAttribute("font-size", "10px");
        label.textContent = (value / 1000).toFixed(1) + "k";
        chartGroup.appendChild(label);
    }
}


export function finshedProjectXp(data) {
    var finshedProject = data.data.user[0].projectEx;

    const tableBody = document.getElementById("project-finished-xp-table-body");

    tableBody.innerHTML = "";

    for (let x = 0; x < finshedProject.length; x++) {
        const project = finshedProject[x];

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        const projectXpCell = document.createElement("td");
        const finishDateCell = document.createElement("td");
        const projectLink = document.createElement("td");
        const repoLink = document.createElement("td");

        nameCell.textContent = project.object.name;
        projectXpCell.textContent = (project.amount / 1000) + "kB";
        finishDateCell.textContent = formatDate(project.createdAt);

        if (project.object.type === "project") {
            projectLink.innerHTML = `<a href="https://learn.reboot01.com/intra${project.path}" target="_blank">Project</a>`;
            repoLink.innerHTML = `<a href="https://learn.reboot01.com/git/${project.userLogin}/${project.object.name}" target="_blank">Repo</a>`;
        
        } else if (project.object.type === "exercise") {
            projectLink.innerHTML = `-`;
            repoLink.innerHTML = `-`;

        }

        row.appendChild(nameCell);
        row.appendChild(projectXpCell);
        row.appendChild(finishDateCell);
        row.appendChild(projectLink);
        row.appendChild(repoLink);

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