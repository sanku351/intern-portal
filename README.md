# 🚀 Intern Portal - MERN Stack Application

A full-stack intern management portal built with MongoDB, Express.js, React, and Node.js.

## ✨ Features

### Frontend (React)
- 🔐 Login/Signup pages with form validation
- 📊 Interactive dashboard showing:
  - Intern name and referral code
  - Total donations raised
  - Rewards and achievements system
  - Progress tracking
- 🏆 Leaderboard with top fundraisers
- 📱 Fully responsive design
- 🎨 Modern UI with gradient backgrounds

### Backend (Node.js + Express)
- 🔒 JWT-based authentication
- 📡 RESTful API endpoints
- 🗄️ MongoDB integration with Mongoose
- 🛡️ Password hashing with bcrypt
- 🎯 CORS enabled for cross-origin requests

### Database (MongoDB)
- 👤 User management with profiles
- 💰 Donation tracking
- 🏅 Rewards system
- 📈 Leaderboard data

## 📸 Screenshots

<img width="1919" height="915" alt="image" src="https://github.com/user-attachments/assets/6990b786-ce98-4248-9285-989af57e8d23" />
<img width="1917" height="912" alt="image" src="https://github.com/user-attachments/assets/247bbf5d-05a5-49c1-8cb6-f74625455029" />
<img width="1899" height="905" alt="image" src="https://github.com/user-attachments/assets/d371d425-b563-4b7f-9b03-484814e5fb35" />
<img width="1919" height="908" alt="image" src="https://github.com/user-attachments/assets/7d6eef95-e7e4-4404-924c-df73e6446f2b" />

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```
git clone https://github.com/sanku351/intern-portal.git
cd intern-portal
```

### 2. Backend Setup
```
# Install backend dependencies
npm install
```

# Create environment file
```
cp backend/.env
```

# Edit backend/.env with your MongoDB connection string
```
MONGODB_URI=mongodb://localhost:27017/intern-portal
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

### 3. Frontend Setup
# Install frontend dependencies
```
npm install
```

### 4. Database Setup
Make sure MongoDB is running on your system:

**For local MongoDB:**
# Start MongoDB service
```
mongod
```

**For MongoDB Atlas:**
- Create a cluster on MongoDB Atlas
- Get your connection string
- Update MONGODB_URI in backend/.env

### 5. Run the Application

**Option 1: Run both frontend and backend together**
```
npm run dev
```

**Option 2: Run separately**
# Terminal 1 - Backend
```
npm run dev
```

# Terminal 2 - Frontend
```
npm run dev
```

### 6. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔑 Demo Credentials
For testing purposes, you can create a new account or use these demo credentials:
- Email: demo@example.com
- Password: demo123

## 📡 API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register new user
- \`POST /api/auth/login\` - Login user

### Dashboard
- \`GET /api/dashboard\` - Get user dashboard data
- \`POST /api/dashboard/update-donations\` - Update donation amount

### Leaderboard
- \`GET /api/leaderboard\` - Get top 10 fundraisers

## 🗂️ Project Structure
```
intern-portal/
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   └── leaderboard.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Leaderboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── public/
│       └── index.html
└── README.md
```

## 🚀 Deployment Options

### Frontend Deployment
- **Vercel**: Connect your GitHub repo to Vercel
- **Netlify**: Drag and drop the build folder
- **GitHub Pages**: Use gh-pages package

### Backend Deployment
- **Render**: Connect GitHub repo and deploy
- **Railway**: One-click deployment
- **Cyclic**: Serverless deployment

### Database
- **MongoDB Atlas**: Cloud MongoDB service
- **Local MongoDB**: For development

## 🧪 Testing the Application

1. **Register a new account** - Creates dummy donation data
2. **View dashboard** - See your stats and rewards
3. **Add demo donations** - Click the button to simulate fundraising
4. **Check leaderboard** - See how you rank against others
5. **Test responsiveness** - Try on different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.
