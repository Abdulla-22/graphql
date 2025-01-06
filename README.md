# GraphQL Profile Page

## Overview
This project demonstrates the use of **GraphQL** by creating a personal **profile page** that fetches and displays user data from a GraphQL API. The application includes a **login system** for authentication using **JWT**, a user interface to display profile information, and **interactive SVG-based graphs** to visualize user statistics.

## Features
- **Login Page**:
  - Authenticate with username/password or email/password.
  - Retrieve and store a **JWT** for secure access to the GraphQL API.
  - Handle invalid credentials with appropriate error messages.
  - Logout functionality to clear session data.

- **Profile Page**:
  - Display three key pieces of user information:
    - Basic User Info (e.g., ID, login).
    - XP amount.
    - Grades, Audits, or Skills.
  - Generate **two SVG-based graphs** for statistical insights:
    - Example graphs:
      1. XP progression over time.
      2. Pass/Fail ratio for projects.
  - A clean, user-friendly UI designed with **UI/UX best practices**.

## Technologies Used
- **Frontend**:
  - HTML, CSS, JavaScript
  - Toastify.js (for notifications)
  - Inline SVG (for graphs)
- **Backend**:
  - GraphQL API
  - JWT for authentication
- **Hosting**:
  - GitHub Pages

## How It Works
1. **Login**:
   - Enter your credentials (username/email and password).
   - Authenticate via the `signin` endpoint and retrieve a JWT.
   - Redirect to the profile page upon successful login.

2. **Fetch Data**:
   - Use the JWT to query the GraphQL API for user data.
   - Display the data on the profile page.

3. **Visualize Statistics**:
   - Generate and display interactive graphs using SVG for statistical insights.

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
