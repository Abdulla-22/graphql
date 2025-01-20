export function logUserInfo(data) {
    // after testing the query I foun that it retarn and aray of the login user only (one user)
    const user = data.data.user[0];
    if (user) {
        document.getElementById("welcomeName").innerText +=
            "Welcome, " + user.firstName + " " + user.lastName + "!";
        document.getElementById("FullName").innerText += " " + user.firstName + " " + user.lastName;
        document.getElementById("Username").innerText += " " + user.login;
        document.getElementById("Campus").innerText += (" " + user.campus.charAt(0).toUpperCase() + user.campus.slice(1));
        document.getElementById("userEmail").innerText += (" " + user.email);
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