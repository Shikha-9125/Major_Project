# E-SPARK Setup Guide for Collaborators

Welcome to the E-SPARK project! This guide will help you get started quickly.

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Shikha-9125/Major_Project.git
cd Major_Project
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
PORT=5000
JWT_SECRET=espark_secret_key_2024
MONGODB_URI=mongodb://localhost:27017/espark
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` file in frontend folder:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Run the Project

**Terminal 1 - Backend:**
```bash
cd backend
npm run start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Access the Application
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 👤 Test Accounts

### Admin Account
- Email: shikha@gmail.com (or gopichand@example.com, sudhakar@example.com, shubhi@example.com)
- Password: (create during signup)
- Role: Admin (auto-assigned)

### Student Account
- Email: Any email (except admin emails)
- Password: (create during signup)
- Role: Student (auto-assigned)

## 📂 Folder Structure

```
Major_Project/
├── backend/          # Node.js + Express API
│   ├── controllers/  # Business logic
│   ├── models/       # Database schemas
│   ├── routes/       # API endpoints
│   └── server.js     # Entry point
│
└── frontend/         # React + Vite
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   └── services/    # API calls
    └── index.html
```

## 🛠️ Development Workflow

### Making Changes
1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test thoroughly
4. Commit: `git commit -m "Add: your feature description"`
5. Push: `git push origin feature/your-feature-name`
6. Create a Pull Request on GitHub

### Git Commands Cheat Sheet
```bash
# Get latest changes
git pull origin main

# Create new branch
git checkout -b feature/feature-name

# Stage changes
git add .

# Commit changes
git commit -m "Your message"

# Push changes
git push origin feature/feature-name

# Switch to main branch
git checkout main

# See current status
git status

# See commit history
git log --oneline
```

## 🔧 Common Issues & Solutions

### Port Already in Use
```bash
# Kill process on port 5000 (Backend)
npx kill-port 5000

# Kill process on port 5173 (Frontend)
npx kill-port 5173
```

### Module Not Found
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Database Connection Error
- Check if MongoDB is running
- Project works with in-memory store if MongoDB is not available
- No action needed for basic testing

## 📝 Code Style Guidelines

### JavaScript/React
- Use ES6+ features (arrow functions, destructuring, etc.)
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable names

### Git Commit Messages
- Use present tense: "Add feature" not "Added feature"
- Be descriptive: "Add user authentication" not "Update files"
- Prefix types: `Add:`, `Fix:`, `Update:`, `Remove:`

## 🎯 Key Features to Test

1. **Authentication**
   - Sign up with student email
   - Sign up with admin email (check admin badge)
   - Login/Logout

2. **Experience Sharing**
   - Create new experience
   - View all experiences
   - View my experiences
   - Delete own experience

3. **Admin Features**
   - Delete any user's experience
   - Admin badge visibility

4. **Navigation**
   - Home page
   - Shared Experiences tab
   - Landing page
   - Contributors page

## 🤝 Need Help?

- Check the main README.md for detailed documentation
- Ask in the team group
- Create an issue on GitHub

## 📚 Resources

- [React Docs](https://react.dev)
- [Express.js Docs](https://expressjs.com)
- [TailwindCSS Docs](https://tailwindcss.com)
- [MongoDB Docs](https://www.mongodb.com/docs)

---

**Happy Coding! 🚀**
