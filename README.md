# Fenora Management

<img src="https://github.com/FarhanKhan1911/Fenora-Management/blob/main/frontend/src/media/assets/images/landing-page.jpg">

## Description

Fenora Management is a full-stack web application designed to facilitate interactions between buyers and sellers. It includes user authentication, role-based access control, post management, and real-time chat features. The platform allows sellers to create and manage posts with media uploads, while buyers can browse, interact with them, and communicate with sellers through an integrated real-time chat system.

## Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Sequelize** - ORM for database interactions
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - Authentication and authorization
- **bcrypt** - Secure password hashing
- **multer** - File upload handling
- **nodemailer** - Email service integration
- **cors** - Cross-origin resource sharing

### Frontend

- **React** - UI library
- **React Router DOM** - Client-side routing
- **Redux & Redux Toolkit** - State management
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication
- **Sass/SCSS** - Styling
- **React Scripts** - Build and development tools

## Features

- **User Authentication & Authorization**
  - Register as buyer or seller
  - Login/Logout with JWT tokens
  - Password reset via email
  - Token blacklisting for secure logout
  - Role-based access control (RBAC)

- **Post Management**
  - Sellers can create, edit, and delete posts
  - Media upload support for posts
  - Buyers can view all available posts

- **User Profile Management**
  - View and update user profiles
  - Profile picture management
  - Buyer and seller-specific features

- **Real-Time Chat System**
  - Real-time messaging between buyers and sellers
  - Chat room management via Socket.IO
  - Message history persistence
  - Online user presence tracking
  - Join/leave chat notifications

- **Role-Based Protections**
  - Buyer-only and seller-only content areas
  - Protected routes with middleware authentication
  - Action-specific permissions (create/edit/delete posts)

## Installation

### Prerequisites

- Node.js (v14 or higher recommended v18+)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend root directory with the following variables:

   ```env
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   DATABASE_URL=postgresql://username:password@localhost:5432/fenora_db
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=fenora_db
   DB_USER=postgres
   DB_PASSWORD=your_password

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d

   # Email Configuration (Gmail OAuth2 or SMTP)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_specific_password

   # Frontend Origin (for Socket.IO CORS)
   FRONTEND_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend root directory (optional):

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`

5. Build for production:
   ```bash
   npm run build
   ```

## Usage

### User Workflows

**As a Buyer:**

1. Visit the landing page and select "Buyer Hub"
2. Register with email and password
3. Browse seller posts from the dashboard
4. Click on posts to view details
5. Initiate a chat with sellers for inquiries
6. View your messages in real-time via the chat interface
7. Manage your profile and preferences

**As a Seller:**

1. Visit the landing page and select "Seller Hub"
2. Register with your business details
3. Access your dashboard
4. Create new posts with:
   - Title, description, and pricing
   - Product images and media
   - Category and availability
5. Edit or delete existing posts
6. Respond to buyer inquiries in real-time
7. Manage buyer communications via chat
8. Update your seller profile

### Core Features in Action

- **Password Recovery**: Use "Forgot Password" to reset your password via email
- **Real-Time Chat**: Messages appear instantly as they're sent
- **Post Management**: Create drafts or publish posts immediately
- **Profile Updates**: Change profile information and avatar anytime

## Project Structure

```
Fenora-Management/
│
├── backend/                          # Node.js Express server
│   ├── src/
│   │   ├── config/                   # Database configuration
│   │   ├── controllers/              # Business logic (auth, chat, posts)
│   │   ├── middleware/               # Authentication & role-based access
│   │   ├── models/                   # Sequelize database models
│   │   ├── routes/                   # API route definitions
│   │   ├── utils/                    # Utility functions & helpers
│   │   └── server.js                 # Main Express server
│   ├── .env                          # Environment variables
│   └── package.json
│
├── frontend/                         # React application
│   ├── public/
│   │   └── index.html                # HTML entry point
│   ├── src/
│   │   ├── components/               # React components (Auth, Chat, Dashboard, etc.)
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── redux/                    # State management
│   │   ├── utils/                    # Utility functions & API calls
│   │   ├── media/                    # Static assets
│   │   ├── App.js                    # Root component
│   │   └── index.js                  # React entry point
│   ├── .env                          # Environment variables (optional)
│   └── package.json
│
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes with clear, descriptive commits
4. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
5. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
6. Open a Pull Request with a description of changes

## Contact & Support

For questions, suggestions, or support, please reach out to the development team or open an issue on GitHub.
