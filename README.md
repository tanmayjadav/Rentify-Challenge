## live link - https://rentify-challenge.vercel.app/

# Rentify-Challenge

Rentify is a modern, responsive web application designed to streamline the property rental process. This project provides both renters and property owners a platform to explore, list, and manage rental properties with ease. This repository contains the source code for the Rentify application, including frontend and backend components.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**: Secure login and registration for users.
- **Property Listings**: Users can view, search, and filter rental properties.
- **Property Management**: Property owners can add, edit, and delete their property listings.
- **Responsive Design**: The application is fully responsive, ensuring a seamless experience on desktop, tablet, and mobile devices.
- **Dark Mode**: Toggle between light and dark themes.
- **Search and Filtering**: Advanced search and filtering options to find properties based on location, price, and other criteria.
- **Pagination**: Efficiently browse through property listings with pagination.
- **Like Functionality**: Users can like properties for future reference.
- **Email Facility**: buyer gets email of seller details if He/She is Interested and seller gets buyer details in mail if buyer selects interested
  
## Technologies Used

- **Frontend**: 
  - React
  - Tailwind CSS
  - ShadCn
  - Redux Toolkit
  - React Router
  - React hook form
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
- **Miscellaneous**:
  - Node Mailer - for Mail Functionaity 
  - sonner - for toast messages
  - yup and zod - for form validation
  - react-select - for searchable select Component
  - and many other small detailing 

## Installation

To get a local copy up and running, follow these steps:

### 1. Clone the repository:
    ```bash
      git clone https://github.com/tanmayjadav/Rentify-Challenge.git

### 2. For the frontend

    ```bash
    
    cd rentify-frontend
    npm install

    # For the backend in another terminal
    cd rentify-backend
    npm install

### 3. Set up environment variables:

Create a .env file in the rentify-backend directory and add the following variables:

.env

      PORT=5000
      MONGODB_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      MYEMAIL = your_google_auth_email
      MYPASS = your_google_auth_password
      FRONTEND_URL = your_url_frontend eg. http://localhost:5173
      BACKEND_URL = your_url_backend eg. http://localhost:9000
      NODE_ENV = Development

4. usage command 
      ```bash
    npm run dev
  for both frontend and backend

Contact:
Tanmay Jadav - www.linkedin.com/in/tanmay-jadav21
