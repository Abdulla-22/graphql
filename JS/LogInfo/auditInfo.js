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
