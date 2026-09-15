# 💸 PayGem

PayGem is a full-stack digital wallet application inspired by modern payment platforms.

It allows users to create an account, sign in, manage their wallet balance, deposit money, transfer money to other users, and view transaction history.

The project is built with React and TypeScript on the frontend and Express + MongoDB on the backend.

---

## 🚀 Live Demo

**Frontend:**  
https://paygem.vercel.app/

**Backend:**  
https://gem-olqb.onrender.com/

> The backend root URL may show `Cannot GET /`. This is expected because the API does not define a route for `/`.

---

## ✨ Features

- 🔐 User Sign Up
- 🔑 User Sign In
- 👤 JWT-based authentication
- 💰 Wallet balance management
- ➕ Add money to wallet
- 🔄 Transfer money between users
- 🔎 Search users
- 📜 Transaction history
- 📊 Wallet balance display
- 🔒 Protected API routes
- 🌐 REST API
- 📱 Responsive frontend
- ☁️ Deployed frontend and backend

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hot Toast
- React Icons
- JWT Decode
- js-cookie

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

### Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 📁 Project Structure

```text
gem/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── ui/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   ├── pages/
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
