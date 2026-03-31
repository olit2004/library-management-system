# Library Management System (LMS) - Stack Shelf



A  full-stack Library Management System designed for modern library operations. This project features a robust tiered access system (Members, Librarians, Admins), automated book tracking, and seamless integration with external book metadata services.

<div align="center">
  <a href="https://lms-kuusa.netlify.app" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Website-brightgreen?style=for-the-badge&logo=netlify" alt="Live Demo">
  </a>
</div>

---

##  Overview
Stack Shelf is a digital platform for managing and tracking books. It supports both readers and librarians with real-time updates, organized data management, and clear, functional dashboards.

###  Key Features

- **Multi-Role Access Control**: Integrated authentication system with Member, Librarian, and Admin tiers.
- **Smart Book Management**: Full CRUD operations for books, authors, and categories.
- **Dynamic Cataloging**: Integration with Google Books API for rich metadata, cover images, and preview links.
- **Intelligent Loan System**: Track checkouts, due dates, and renewals. Automatic "Overdue" status calculation.
- **Reservation Queue**: Queue-based book reservations with position tracking and automated availability notifications.
- **Responsive UI/UX**: Built with React 19 and Tailwind CSS 4, ensuring a sleek, mobile-first experience.
- **Author Profiles**: Deep-dive into author bios and their associated library catalog.

---

##  Tech Stack

### Frontend
- **Framework**: React 19 (Latest stable release)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4 (Atomic CSS utility-first approach)
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Hooks & Context API
- **Routing**: React Router 7

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5 (Next-gen Express features)
- **Database**: PostgreSQL
- **ORM**: Prisma (Type-safe database interactions)
- **Authentication**: JWT (JSON Web Tokens) with Secure Cookie-based storage
- **Security**: Bcrypt for password hashing, Zod for schema validation



## 📸 Demo Screenshots

<div align="center">
  <h3>Landing Page</h3>
  <img src="./kuusaa_landing%20page%20.png" alt="Landing Page" width="800" style="border-radius: 10px; border: 1px solid #ddd; margin-bottom: 20px;">
  
  <h3> Member Dashboard</h3>
  <img src="./kuusaa%20meber%20dashboard.png" alt="Member Dashboard" width="800" style="border-radius: 10px; border: 1px solid #ddd; margin-bottom: 20px;">
  
  <h3> Librarian/Admin Panel</h3>
  <img src="./kuusaa%20admin%20page.png" alt="Admin Panel" width="800" style="border-radius: 10px; border: 1px solid #ddd; margin-bottom: 20px;">
</div>

---

##  Future Enhancements

- [ ] **E-book Reader**: Native integration for digital book previews.

- [ ] **Analytics Dashboard**: Visual charts for library usage and popular genres.
- [ ] **Multi-Library Support**: Expand to manage multiple branches under one system.



