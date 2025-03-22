# **BlueMedix Repository**  

This repository contains two separate assignments for **BlueMedix**:  

1. **Frontend Application:** A React-based project using FakeStore API for product management.  
2. **Backend API:** A Node.js/Express backend for user authentication and management using MongoDB.  

Each assignment operates independently and does not integrate with the other.  
---  


Each folder (`app`  and `backend`) contains its own setup and documentation.  

---

### Setting up
1. Clone the repository to your local machine.
```bash
cd clone https://github.com/fltdeep007/opportunity.git
```


## **Frontend Setup**  

The **BlueMedix Dashboard** is a React-based application that allows users to manage products and users using the **FakeStore API**.  

### **Features**  

✔️ Product Management: View, create, update, and delete products  
✔️ User Management: Local state management for users  
✔️ Responsive Design: Works on mobile, tablet, and desktop  
✔️ Form Validation: Ensures data integrity using React Hook Form  

### **Tech Stack**  

- **React.js** (Functional Components, Hooks)  
- **React Router** for navigation  
- **Context API** for state management  
- **Axios** for API requests  
- **React Hook Form** for form handling  
- **Tailwind CSS** for styling  

### **Installation & Running the Frontend**  

1. **Navigate to the frontend directory:**  

   ```sh
   cd app
   ```

2. Set up Tailwind CSS:
```bash
npm install tailwindcss @tailwindcss/vite
```

3. Configure Tailwind CSS by updating `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

4. Run the application:
```sh
npm run dev
```




### Tasks Performed from Frontend Assessment  

✅ Implemented product management using FakeStore API.  
✅ Created user management functionality with local state.  
✅ Designed a modern UI using Tailwind CSS.  
✅ Integrated form validation with React Hook Form.  

For more details, check the `app/README.md`.  

---

## **Backend Setup**  

The backend is a **Node.js/Express API** designed for user authentication and management using **MongoDB**.  

### **Features**  

✔️ User Authentication: Register, login, and JWT authentication  
✔️ Role-Based Access Control (RBAC): User roles (Admin, Seller, Customer)  
✔️ Secure API: Uses bcrypt.js for password hashing  
✔️ RESTful API with CRUD operations for users  

### **Tech Stack**  

- **Node.js**  
- **Express.js**  
- **MongoDB + Mongoose**  
- **JWT (jsonwebtoken)** for authentication  
- **bcrypt.js** for password hashing  
- **Middleware** for authorization  

### **Installation & Running the Backend**  

1. **Navigate to the backend directory:**  

   ```sh
   cd backend
   ```

2. **Install dependencies:**  

   ```sh
   npm install
   ```

3. **Create a `.env` file** in the `backend` folder and add:  

   ```sh
   MONGO_URI="your_mongo_database_url"
   PORT=5000
   NODE_ENV=development
   JWT_SECRET="your_secret_key"
   ```

4. **Run the server:**  

   ```sh
   npm start
   ```

### **Tasks Performed from Backend Assessment**  

✅ Developed a RESTful API for user management (CRUD).  
✅ Implemented JWT-based authentication and Role-Based Access Control.  
✅ Created middleware for authentication and authorization.  
✅ Designed a scalable and secure API with error handling.  

For more details, check the `backend/README.md`.  

---


