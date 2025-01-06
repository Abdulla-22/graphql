export function logUserInfo(data) {
    // after testing the query I foun that it retarn and aray of the login user only (one user)
    const user = data.data.user[0];
    if (user) {
        document.getElementById("welcomeName").innerText += 
        "Welcome, " + user.firstName + " " + user.lastName + "!";
        document.getElementById("Username").innerText += " "+user.login;
        document.getElementById("UserID").innerText += (" "+user.id);
        document.getElementById("Campus").innerText += (" "+user.campus);
        document.getElementById("userEmail").innerText += (" "+user.email);
        document.getElementById("createdAt").innerText += (" "+user.createdAt);
        document.getElementById("updatedAt").innerText += (" "+user.updatedAt);
        document.getElementById("githubId").innerText += (" "+user.githubId);

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


export function logProgressInfo(data) {

}

export function logObjectInfo(data) {

}