# 🛠️ Software Approval System

A full-stack web application to streamline the process of requesting and approving software installations in an organization. It allows users to submit software requests and lets administrators approve or reject them based on organizational policies.

---

## 🔗 Live Demo

> 🚧 *Deployment coming soon...*  

---

## 📌 Features

- 🔐 User authentication with role-based access (User/Admin)
- 📨 Submit software installation requests
- ⏳ Track status of submitted requests
- ✅ Admin panel to approve or reject requests
- 📊 Dashboard to manage and view all requests
- 🗂 Request history log
- 🌐 RESTful APIs

---

## 🧰 Tech Stack

### Frontend
- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) *(if used)*

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/) for relational database management
- [JWT](https://jwt.io/) for authentication

---

## 📁 Project Structure

```
Software-Approval/
├── backend/               # Node.js backend (API & DB logic)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── src/                   # React frontend
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── public/                # Static files
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nithinchowdary2532/Software-Approval.git
cd Software-Approval
```

### 2. Install dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

### 3. Create Environment Variables

Create a `.env` file inside the `/backend` folder with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

> 💡 If you're using a SQL database, modify the variables accordingly.

---

## 🧪 Run the App

### Run Backend

```bash
cd backend
npm start
```

### Run Frontend

```bash
cd frontend
npm run dev
```

---

## 🧑‍💼 User Roles

- **User**
  - Submit software approval requests
  - View request status and history
- **Admin**
  - View all requests
  - Approve or reject requests
  - Manage request logs

---

## ✨ Screenshots

![image](https://github.com/user-attachments/assets/d2a2ddb8-b588-4719-a141-d1df3bc538c1)
![image](https://github.com/user-attachments/assets/ac48d675-9074-46f5-af9f-b0c538896c53)
![image](https://github.com/user-attachments/assets/c740a1ca-f399-409c-bb2a-b76f290c2dd8)
![image](https://github.com/user-attachments/assets/45a44490-d057-445b-9729-c097972a8812)
![image](https://github.com/user-attachments/assets/fe912965-16fe-4aef-81a6-b4009a04474e)
![image](https://github.com/user-attachments/assets/18efe367-14a6-480a-bdef-8d1d744b9e32)
![image](https://github.com/user-attachments/assets/8675424d-603c-457c-8723-9e78b4e00b7a)
![image](https://github.com/user-attachments/assets/ee4c126f-6052-4e8d-a892-5ad87d315831)







## 🚀 Deployment

### Frontend
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

### Backend
- [Render](https://render.com/)
- [Railway](https://railway.app/)

## 🧹 TODO / Future Enhancements

- [ ] Email notifications for approval status
- [ ] Role-based dashboard views
- [ ] Filter/search requests
- [ ] Export request logs as CSV
- [ ] Activity logs and analytics for admin

---

## 🛡 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome!  
If you find bugs or want to add features:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## 🙋‍♂️ Author

**Nithin Chowdary**  
🔗 [GitHub](https://github.com/nithinchowdary2532)  
📧 chowdarynithin95@gmail.com

---

Made with ❤️ using MERN Stack
