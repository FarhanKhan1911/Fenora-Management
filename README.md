# Fenora Management
<img src="https://github.com/FarhanKhan1911/Fenora-Management/blob/main/frontend/src/media/assets/images/landing-page.jpg">

## Description

Fenora Management is a full-stack web application designed to facilitate interactions between buyers and sellers. It includes user authentication, role-based access control, post management, and real-time chat features. The platform allows sellers to create and manage posts, while buyers can browse and interact with them.

## Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM for database interactions
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **multer** - File uploads
- **nodemailer** - Email services

### Frontend

- **React** - UI library
- **Redux** - State management
- **Axios** - HTTP client
- **React Router** - Routing
- **Sass** - Styling
- **Webpack** - Module bundler (via Create React App)

## Features

- **User Authentication**: Register, login, logout, password reset via email
- **Role-Based Access**: Separate permissions for buyers and sellers
- **Post Management**: Sellers can create, edit, and delete posts with media uploads
- **Profile Management**: Users can view and update their profiles
- **Chat System**: Real-time messaging between users
- **Dashboard**: Overview of posts and user activities

## Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the backend root with the following variables:
   ```
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/fenora_db
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```
4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

The application will be available at `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend API.

## Usage

1. **Registration**: Users can register as either buyers or sellers.
2. **Login**: Authenticate using email and password.
3. **Dashboard**: Sellers can create and manage posts; buyers can view posts.
4. **Chat**: Engage in conversations with other users.
5. **Profile**: Update personal information and profile picture.

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forget-password` - Request password reset
- `POST /api/auth/reset-password/:id/:token` - Reset password
- `GET /api/auth/get-profile/:id` - Get user profile
- `PUT /api/auth/update-profile/:id` - Update user profile

### Posts

- `POST /api/posts/create-post` - Create a new post (Seller only)
- `GET /api/posts/all-posts` - Get all posts
- `PUT /api/posts/edit-post/:id` - Edit a post (Seller only)
- `DELETE /api/posts/delete-post/:id` - Delete a post (Seller only)

### Protected Routes

- `GET /api/buyer-data` - Buyer-only content
- `GET /api/seller-data` - Seller-only content

## Project Structure

```
Fenora-Management/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

For questions or support, please contact the development team.
