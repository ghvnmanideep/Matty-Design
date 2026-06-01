# Matty

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js). 

## 🚀 Features

- **User Authentication:** Secure login and registration with JWT and bcrypt.
- **Google OAuth Integration:** Quick and secure sign-in with Google.
- **Role-Based Access Control:** Differentiate between standard users and admin users.
- **Admin Dashboard:** View and manage registered users in a modern UI.
- **Responsive & Modern UI:** Built with Tailwind CSS, featuring glassmorphism, smooth animations, and dynamic states.
- **State Management:** Utilizing Redux Toolkit for efficient global state handling.
- **Image Uploads:** Backend integration with Cloudinary and Multer.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4, Vanilla CSS
- **State Management:** Redux Toolkit & Redux Persist
- **Routing:** React Router DOM v7
- **Icons:** React Icons
- **HTTP Client:** Axios
- **Authentication:** Google OAuth Provider

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **File Uploads:** Multer & Cloudinary
- **Environment Management:** dotenv

## 📁 Project Structure

```text
Matty_Final/
├── backend/                # Node.js Express server
│   ├── api/                # API routes and controllers
│   ├── models/             # Mongoose schemas
│   ├── server.js           # Entry point
│   └── .env                # Backend environment variables
└── frontend/               # React Vite application
    ├── src/
    │   ├── Login/          # Authentication components
    │   ├── pages/          # Main application pages (Users, Dashboard)
    │   ├── store/          # Redux store and slices
    │   ├── utils/          # Axios interceptors and utilities
    │   ├── index.css       # Global styles and animations
    │   └── App.jsx         # App router and layout
    └── .env                # Frontend environment variables
```

## ⚙️ Local Development Setup

Follow these steps to run the project locally.

### Prerequisites
- Node.js installed (v18+)
- MongoDB Atlas cluster (or local MongoDB server)
- Cloudinary account (for image uploads)
- Google Cloud Console project (for OAuth Client ID)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Matty_Final.git
cd Matty_Final
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal tab and navigate to the frontend folder.
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000
```
Start the Vite development server:
```bash
npm run dev
```

The application should now be running at `http://localhost:5173`.

## 🌐 Deployment Instructions

### Backend (Render)
1. Push your code to GitHub.
2. Create a new Web Service on [Render](https://render.com/).
3. Connect your repository and set the **Root Directory** to `backend`.
4. Build command: `npm install` | Start command: `node server.js`.
5. Add your Environment Variables.
6. Once deployed, copy the Render URL.

### Frontend (Netlify)
1. In `frontend/public`, ensure the `_redirects` file exists containing `/* /index.html 200` to handle React Router.
2. Import the repository into [Netlify](https://netlify.com/).
3. Set **Base directory** to `frontend`, **Build command** to `npm run build`, and **Publish directory** to `frontend/dist`.
4. Add the `VITE_API_URL` environment variable with your Render backend URL.
5. Deploy the site.

*(Note: Remember to update the CORS origin in your backend `server.js` to allow your new Netlify URL).*

## 📄 License
This project is licensed under the ISC License.
