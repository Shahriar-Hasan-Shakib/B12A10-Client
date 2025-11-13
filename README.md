# AI Model Inventory Manager

> A full-stack web application for managing AI model inventory with Firebase authentication, MongoDB database, and modern React UI.

## 🚀 Live Demo

- **Client**: [Add your live link here]
- **Server API**: [Add your API link here]

## ✨ Features

- ✅ User Authentication (Email/Password + Google Sign-In)
- ✅ Add, View, Edit, Delete AI Models
- ✅ Search Models by Name
- ✅ Filter Models by Framework  
- ✅ Purchase AI Models with Real-time Counter
- ✅ View My Created Models
- ✅ View My Purchased Models
- ✅ Dark/Light Theme Toggle
- ✅ Fully Responsive Design

## 🛠️ Built With

- **React 19.2.0** + TypeScript
- **Tailwind CSS 4.1.17** - Styling
- **Firebase 12.5.0** - Authentication
- **React Router DOM 7.9.5** - Routing
- **React Hot Toast 2.6.0** - Notifications
- **Swiper 12.0.3** - Image Slider
- **Axios** - HTTP Client

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Add the following to your `.env` file:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000/api
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

### Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/           # Button, Card, Input, etc.
│   ├── layout/       # Header, Footer, Layout
│   └── features/     # Feature-specific components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── contexts/         # React Context providers
├── utils/            # Utility functions
├── constants/        # App constants
├── config/           # Configuration files
├── types/            # TypeScript types
└── routes/           # Route configuration
```

## 📄 License

This project is part of a programming assignment.

---

**Made with ❤️ using React + TypeScript + Vite**
