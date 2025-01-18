export function skills(data) {
    const skills = data.data.skills;

    const sumByType = skills.reduce((acc, skill) => {
        const type = skill.type;

        if (!acc[type]) {
            acc[type] = { totalAmount: 0, skills: [] };
        }

        acc[type].totalAmount += skill.amount;
        acc[type].skills.push(skill);
        return acc;
    }, {});

    const top5Types = Object.entries(sumByType)
        .map(([type, data]) => ({ type, totalAmount: data.totalAmount, skills: data.skills }))
        .sort((a, b) => b.totalAmount - a.totalAmount)
        .slice(0, 6);

    var dataPointsarr = [];
    var labels = [];
    top5Types.forEach((skill, _) => {
        labels.push(skill.type);
        dataPointsarr.push(skill.totalAmount);
    });

    console.log("Labels: ", labels);
    console.log("Data Points: ", dataPointsarr);

    const maxValue = top5Types[0].totalAmount; // Maximum value from data
    const levels = 10; // Fixed number of levels
    const radius = 200; // Radius of the radar chart
    const centerX = 200; // X-coordinate of the chart center
    const centerY = 200; // Y-coordinate of the chart center

    const svg = document.getElementById("radar-chart");

    // Draw grid (10 concentric polygons)
    for (let level = 1; level <= levels; level++) {
        const polygonPoints = [];
        const levelValue = (level / levels) * maxValue; // Each level represents an even fraction of maxValue
        labels.forEach((_, i) => {
            const angle = (360 / labels.length) * i;
            const { x, y } = calculatePoint(angle, levelValue);
            polygonPoints.push(`${x},${y}`);
        });
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("points", polygonPoints.join(" "));
        polygon.setAttribute("stroke", "#333");
        polygon.setAttribute("fill", "none");
        svg.appendChild(polygon);
    }

    // Draw axes
    labels.forEach((label, i) => {
        const angle = (360 / labels.length) * i;
        const { x, y } = calculatePoint(angle, maxValue);
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", centerX);
        line.setAttribute("y1", centerY);
        line.setAttribute("x2", x);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "#333");
        svg.appendChild(line);

        // Add label
        const labelText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        labelText.setAttribute("x", x);
        labelText.setAttribute("y", y);
        labelText.setAttribute("text-anchor", "middle");
        labelText.setAttribute("fill", "#333");
        labelText.setAttribute("dy", i === 0 ? "-10" : "10"); // Adjust for top label
        labelText.textContent = label;
        svg.appendChild(labelText);
    });

    // Draw data shape
    const dataPoints = [];
    dataPointsarr.forEach((value, i) => {
        const angle = (360 / labels.length) * i;
        const { x, y } = calculatePoint(angle, (value / maxValue) * radius);
        dataPoints.push(`${x},${y}`);
    });
    const dataPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    dataPolygon.setAttribute("points", dataPoints.join(" "));
    dataPolygon.setAttribute("stroke", "purple");
    dataPolygon.setAttribute("fill", "rgba(128, 0, 128, 0.4)");
    svg.appendChild(dataPolygon);

    for (let x = 0; x < top5Types.length; x++) {
        var skill = document.createElement("div");
        var text = x + 1 + ". " + top5Types[x].type;
        skill.innerHTML = text;
        document.getElementById("skills").appendChild(skill);
    }

    // Function to calculate (x, y) coordinates for a given angle and value
    function calculatePoint(angle, value) {
        const radians = (angle * Math.PI) / 180;
        const scaledValue = (value / maxValue) * radius; // Scale value based on maxValue
        return {
            x: centerX + scaledValue * Math.cos(radians),
            y: centerY - scaledValue * Math.sin(radians),
        };
    }
}

