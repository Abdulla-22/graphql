document.getElementById('login-form').addEventListener('submit', async (e) => {
    // Prevent page reload
    e.preventDefault();

    const usernameORemail = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Encode username and password in Base64
    const encodedData = btoa(`${usernameORemail}:${password}`);

    try {
        const APIresponse = await fetch('https://learn.reboot01.com/api/auth/signin', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${encodedData}`
            }
        });

        if (APIresponse.ok) {
            NotificationDisplay('Login successful', 'success');
            const JWT = await APIresponse.json();
            console.log("The received JWT is:", JWT);

            // Store the token securely
            localStorage.setItem('jwt', JWT);

            // Redirect to profile page (use relative path for GitHub Pages)
            window.location.href = './profile.html';

        } else {
            NotificationDisplay('Invalid username or password', 'error');
        }
    } catch (error) {
        console.error('Error fetching the API:', error);
        NotificationDisplay('Error fetching the API', 'error');
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
