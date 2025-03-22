# Backend API - Project

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <repository-url>
cd backend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `backend` folder and add the following variables:
```env
MONGO_URI="your_mongo_database_url"
PORT=5000
NODE_ENV=development
JWT_SECRET="your_secret_key"
```

### 4. Start the Server
```sh
npm run start
```

The server will start on `http://localhost:5000` (or your configured port).

---

## API Endpoints & Testing in Postman

### 1. User Authentication
#### Register a User
**Endpoint:** `POST /api/users`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "role":"Customer"  
//   {"Customer" ,"Seller" , "Admin"}
}
```

#### Login a User
**Endpoint:** `POST /api/users/login`
- **Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### 2. User Management 
#### Get All Users (Admin Access Required)
**Endpoint:** `GET /api/users`
- **Headers:** `{ Authorization:<your_token> }`

#### Get User by ID (User Auth required)
**Endpoint:** `GET /api/users/:id`
- **Headers:** `{ Authorization:<your_token> }`

#### Update User (User Auth required)
**Endpoint:** `PUT /api/users/:id`
- **Headers:** `{ Authorization:<your_token> }`
- **Body:**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```
 
#### Delete User (User Auth required)
**Endpoint:** `DELETE /api/users/:id`
- **Headers:** `{ Authorization:<your_token> }`

### 3. Testing with Postman
1. Open [Postman](https://www.postman.com/).
2. Set up a new request with the desired endpoint.
3. If authentication is required, add `Authorization:<your_token>` in headers.
4. Send requests and check responses.

---

## Notes
- Ensure MongoDB is running before starting the server.
- Use Postman or any API client for testing endpoints.
- Modify `.env` variables as needed for production.

---

