document.getElementById('login-form').addEventListener('submit', async (e) => {
    // to make sure the page does not reload
    e.preventDefault();

    const usernameORemail = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // to encode the username and password into Base64 format
    // used to basic authentication ((binary to ASCII))
    // from base64 encoding we can get the original username and password
    // but it is not secure
    const encodedData = btoa(`${usernameORemail}:${password}`);

    try {
        const APIresponse = await fetch('https://learn.reboot01.com/api/auth/signin', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${encodedData}`
            }
        });

        if (APIresponse.ok) {
            // there is no enghough time to show the success notification
            NotificationDisplay('Login successful', 'success');
            // take the JWT token from the response
            const JWT = await APIresponse.json();
            // log the token to the console for debugging
            console.log("The taken JWT is: " + JWT);
            // store the token in the local storage
            localStorage.setItem('jwt', JWT);
            // redirect to the profile page
            window.location.href = '/profile.html';

        } else {
            NotificationDisplay('Invalid username or password', 'error');

        }
    } catch (error) {
        NotificationDisplay('Error fetch the API', 'error');

    }

});

function NotificationDisplay(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = type;

    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}
