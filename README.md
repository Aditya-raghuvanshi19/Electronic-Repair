# Electronics Repair Booking App

## Overview

This is a modern **React-Vite** application for an **Electronics Repair Booking System** with a light/dark theme switch, built using **Tailwind CSS** and **JavaScript**. The app provides an interactive **Navigation Bar** and various user-friendly features for booking, tracking, and managing repair services.

## Features

- **Authentication System** (JWT-based login and registration)
- **User Dashboard** (Track repair requests, appointments, and payment history)
- **Service Management** (List services with details and pricing)
- **Repair Requests** (Submit and track repair status)
- **Appointment Booking** (Schedule and manage repair appointments)
- **Payment Integration** (Secure transactions and history tracking)
- **Review & Rating System** (Feedback mechanism for services)
- **Admin Panel** (Manage services, repairs, and appointments)
- **Light/Dark Theme Toggle** (User preference-based UI customization)

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, ShadCN UI
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JSON Web Token (JWT)

## Installation Guide

### Prerequisites

- Node.js (>=14.x)
- npm or yarn
- Backend API (Express.js running on `http://localhost:5000/api`)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/shreekant17/electronics-repair-booking.git
   cd electronics-repair-booking
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open the app in the browser:
   ```sh
   http://localhost:5173
   ```

## Project Structure

```
├── src
│   ├── components  # Reusable UI components
│   ├── pages        # Page components for routing
│   ├── context      # Context API for authentication & theme
│   ├── hooks        # Custom hooks
│   ├── services     # API service calls
│   ├── App.js       # Main App Component
│   ├── main.jsx     # Vite entry point
├── public           # Static assets
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Routes

### Public Routes

- `/` - Home page (Hero section, services showcase, repair status check)
- `/login` - User login page
- `/register` - User registration page
- `/services` - List all available repair services
- `/services/:id` - View details of a specific service

### Protected Routes (Requires Login)

- `/dashboard` - User dashboard
- `/repairs/new` - Submit a new repair request
- `/repairs/:id` - View details of a repair request
- `/appointments` - Manage appointments
- `/admin` - Admin dashboard (for managing services and requests)

## API Integration

The frontend interacts with a backend API hosted at `http://localhost:5000/api`. Authentication is handled using JWT tokens.

## How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

## License

This project is licensed under the MIT License.



