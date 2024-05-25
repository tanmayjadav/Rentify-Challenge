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

## Technologies Used

- **Frontend**: 
  - React
  - Tailwind CSS
  - Redux Toolkit
  - React Router
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
- **Authentication**:
  - JWT (JSON Web Token)
- **Miscellaneous**:
  - Axios for API calls
  - Sonner for toast notifications
  - Lucide-react for icons

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tanmayjadav/Rentify-Challenge.git

2. # For the frontend
cd client
npm install

# For the backend
cd ../server
npm install

3. Set up environment variables:

Create a .env file in the server directory and add the following variables:

env
Copy code
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. usage command 

npm run dev for both frontend and backend

Contact
Tanmay Jadav - www.linkedin.com/in/tanmay-jadav21
