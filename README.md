# Café Fausse Website

A responsive web application for **Café Fausse**, blending traditional Italian flavors with modern innovation.  
Frontend built with **React (Vite)**, backend with **Flask + PostgreSQL** (already hosted on Render) => Github Repository https://github.com/JacobChikwanda/cafe-server.git.

🌐 Live site: [https://cafe-chi-seven.vercel.app](https://cafe-chi-seven.vercel.app)  
🔗 API: [https://cafe-server-nnnm.onrender.com](https://cafe-server-nnnm.onrender.com) 
---

## 🚀 Features
- **Home Page** – Hero section with background image, featured menu, contact & hours.
- **Menu Page** – Dishes with images, categories, and prices.
- **Reservations Page** – Form integrated with backend API.
- **About Us Page** – Restaurant history, mission, founders.
- **Gallery Page** – Images, awards, and customer reviews.
- **Newsletter Signup** – Email signup form with validation.
- **Admin Section** – Manage reservations and customers:
  - View reservations (all / by ID / by customer).
  - View customer by ID.
  - Delete customer by ID.

---

## 🛠️ Tech Stack
- **Frontend:** React + Vite, React Router, CSS Modules
- **Backend:** Flask (hosted on Render) https://github.com/JacobChikwanda/cafe-server.git
- **Database:** PostgreSQL
- **Deployment:** Vercel (frontend), Render (backend)
- **API:** REST endpoints for customers and reservations

---

## 📂 Project Structure
src/
  components/   # Reusable UI components (Navbar, Footer, MenuCard, etc.)
  data/         # Menu data (sample)
  lib/          # API client and helpers
  pages/        # Route pages (Home, Menu, Reservations, Admin, etc.)
  App.jsx       # Root layout
  main.jsx      # React Router setup


## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/Cafe.git
cd Cafe
npm install
### Create .env file and add:
VITE_API_BASE_URL=https://cafe-server-nnnm.onrender.com
VITE_USE_MOCKS=false
npm run dev

### Build for production
npm run build
npm run preview

## 🔐 Admin Usage
Visit: https://cafe-chi-seven.vercel.app/admin
Functions:
Reservations
All reservations
Reservation by ID
Reservations by Customer ID
Customers
Customer by ID → returns { id, name, email, phone_number }
Delete Customer by ID → permanently removes customer
