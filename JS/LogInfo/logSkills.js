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
    // console.log("Sum by Type: ", sumByType);

    const top6Types = Object.entries(sumByType)
        .map(([type, data]) => ({ type, totalAmount: data.totalAmount, skills: data.skills }))
        .sort((a, b) => b.totalAmount - a.totalAmount)
        .slice(0, 6);

    const labels = [];
    const dataPointsarr = [];
    top6Types.forEach((skill) => {
        labels.push(skill.type);
        dataPointsarr.push(skill.totalAmount);
    });

    console.log("Labels: ", labels);
    console.log("Data Points: ", dataPointsarr);

    const barHeight = 40; 
    const barSpacing = 20; 
    const labelWidth = 100;
    const valueWidth = 50;

    const maxValue = Math.max(...dataPointsarr);

    const svg = document.getElementById("bar-chart");
    svg.setAttribute("viewBox", `0 0 600 ${(barHeight + barSpacing) * labels.length}`);
    svg.setAttribute("preserveAspectRatio", "xMinYMin meet");
    svg.innerHTML = ""; 

    labels.forEach((label, i) => {
        const barWidth = (dataPointsarr[i] / maxValue) * (600 - labelWidth - valueWidth - 20);
        const y = i * (barHeight + barSpacing); 

        const labelText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        labelText.setAttribute("x", 10);
        labelText.setAttribute("y", y + barHeight / 2 + 5); 
        labelText.textContent = label;
        labelText.setAttribute("font-size", "12px");
        labelText.setAttribute("fill", "#333");
        svg.appendChild(labelText);

        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute("x", labelWidth);
        bar.setAttribute("y", y);
        bar.setAttribute("width", barWidth);
        bar.setAttribute("height", barHeight);
        bar.setAttribute("fill", "#820798");
        bar.innerHTML = `<title>${label} XP: ${dataPointsarr[i]}</title>`;
        svg.appendChild(bar);

        const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        valueText.setAttribute("x", labelWidth + barWidth + 5); 
        valueText.setAttribute("y", y + barHeight / 2 + 5); 
        valueText.textContent = `${dataPointsarr[i]} XP`;
        valueText.setAttribute("font-size", "12px");
        valueText.setAttribute("fill", "#333");
        svg.appendChild(valueText);
    });
}
