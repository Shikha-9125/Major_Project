# E-SPARK - Electrical Society for Progression, Academic Research & Knowledge

A comprehensive placement portal for the Electrical Engineering Department at NIT Jalandhar, designed to facilitate interview experience sharing and placement preparation.

## 🌟 Features

### For Students
- **Share Interview Experiences**: Share detailed interview experiences including company details, interview rounds, technical/HR questions, and tips
- **Browse Experiences**: View and learn from others' placement experiences
- **Personal Dashboard**: Track your shared experiences and view statistics
- **Resource Hub**: Access placement preparation materials (coming soon)

### For Admins
- **Content Moderation**: Delete inappropriate or outdated experiences
- **Statistics Dashboard**: View placement statistics and trends
- **Admin Badge**: Special badge to identify administrators

### General Features
- **Role-Based Access**: Automatic role assignment (student/admin) based on email
- **Secure Authentication**: JWT-based authentication with 30-day token expiry
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Notifications**: Toast notifications for user actions
- **Beautiful UI**: Modern design with gradients, animations, and hover effects

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **TailwindCSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB/Mongoose** - Database (with in-memory fallback)
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (optional - in-memory store available)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shikha-9125/Major_Project.git
   cd Major_Project
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_here
   MONGODB_URI=mongodb://localhost:27017/espark
   NODE_ENV=development
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Run the Application**

   In the backend directory:
   ```bash
   npm run start
   ```

   In the frontend directory:
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 👥 Admin Users

The following email addresses are automatically assigned admin role:
- shikha@gmail.com
- gopichand@example.com
- sudhakar@example.com
- shubhi@example.com

All other users are assigned the 'student' role by default.

## 📁 Project Structure

```
E-SPARK/
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Request handlers
│   ├── middlewares/      # Auth and error handling
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── public/          # Static files & uploads
│   └── server.js        # Entry point
│
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── contexts/    # Context providers
│   │   ├── hooks/       # Custom hooks
│   │   ├── services/    # API services
│   │   └── App.jsx      # Main app component
│   └── index.html       # HTML template
│
└── README.md            # This file
```

## 🔑 Key Features Explained

### Experience Sharing
Students can share comprehensive interview experiences including:
- Personal information (name, batch, department)
- Company details (name, type, package, role)
- Interview process (rounds, questions, difficulty)
- Contact information (phone, email, LinkedIn)
- Tips and advice for future candidates

### Admin Privileges
Admins have special permissions to:
- Delete any user's experience (for moderation)
- Access admin-only features (future)
- Identified by purple "Admin" badge

### Security
- Passwords hashed using bcryptjs
- JWT tokens with HS256 algorithm
- Protected routes requiring authentication
- Role-based access control

## 🎨 Design Highlights

- **Modern UI**: Gradient backgrounds, smooth animations, hover effects
- **Responsive**: Mobile-first design approach
- **Accessible**: Semantic HTML, ARIA labels
- **Intuitive**: Clear navigation, visual feedback
- **Color-Coded**: Different sections use distinct color schemes

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/my` - Get my experiences
- `POST /api/experiences` - Create new experience (protected)
- `DELETE /api/experiences/:id` - Delete experience (protected)

## 👨‍💻 Contributors

- **Shikha** - Lead Developer
- **Gopichand** - Backend Developer
- **Sudhakar** - Frontend Developer
- **Shubhi** - UI/UX Designer

## 📄 License

This project is developed for educational purposes at NIT Jalandhar.

## 🐛 Known Issues

- None at the moment

## 🔮 Future Enhancements

- [ ] Add placement resources section
- [ ] Email notifications for new experiences
- [ ] Advanced search and filters
- [ ] Experience likes and comments
- [ ] Export experiences as PDF
- [ ] Analytics dashboard for admins
- [ ] Mobile app

## 📞 Support

For any queries or issues, please contact the contributors or raise an issue on GitHub.

---

**Made with ❤️ by the E-SPARK Team at NIT Jalandhar**
