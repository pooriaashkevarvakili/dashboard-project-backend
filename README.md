# 🚀 Crypto Dashboard Backend API

A scalable and production-ready backend built with **NestJS** for a Crypto Dashboard application. The API provides cryptocurrency market data, portfolio management, authentication, and analytics with interactive API documentation powered by Swagger.

---

## ✨ Features

- 🔐 JWT Authentication & Authorization
- 👤 User Management
- 💰 Cryptocurrency Market Data
- 📊 Portfolio Management
- 📈 Dashboard Analytics
- 📝 Request Validation
- 📚 Swagger API Documentation
- ⚡ RESTful API Architecture
- 🛡️ Global Exception Handling
- 🌍 CORS Enabled
- 🔄 Environment-based Configuration

---

## 🛠️ Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL / MongoDB *(update based on your project)*
- **ORM:** Prisma / TypeORM *(update accordingly)*
- **Authentication:** JWT
- **Validation:** class-validator
- **Documentation:** Swagger
- **Deployment:** Render

---

## 📁 Project Structure

```
src/
├── auth/
├── users/
├── crypto/
├── dashboard/
├── portfolio/
├── common/
├── config/
├── guards/
├── interceptors/
├── filters/
├── dto/
├── entities/
├── app.module.ts
└── main.ts
```

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/your-username/dashboard-project-backend.git
```

Navigate to the project

```bash
cd dashboard-project-backend
```

Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=3000

DATABASE_URL=

JWT_SECRET=

JWT_EXPIRES_IN=7d
```

---

## ▶️ Running the Application

Development

```bash
npm run start:dev
```

Production

```bash
npm run build
npm run start:prod
```

Watch Mode

```bash
npm run start
```

---

## 📚 API Documentation

Swagger documentation is available at:

**https://dashboard-project-backend-ljk7.onrender.com/dashboard-api-swagger**

After starting the application locally:

```
http://localhost:3000/dashboard-api-swagger
```

---

## 🔑 Authentication

The API uses **JWT Bearer Authentication**.

After logging in:

1. Copy the access token.
2. Click **Authorize** in Swagger.
3. Enter:

```
Bearer YOUR_ACCESS_TOKEN
```

---

## 📌 Main API Modules

- Authentication
- Users
- Dashboard
- Cryptocurrency
- Portfolio
- Analytics

---

## 🧪 Testing

Run unit tests

```bash
npm run test
```

Run e2e tests

```bash
npm run test:e2e
```

Coverage

```bash
npm run test:cov
```

---

## 🚀 Deployment

The backend is deployed on **Render**.

Production URL

```
https://dashboard-project-backend-ljk7.onrender.com
```

Swagger

```
https://dashboard-project-backend-ljk7.onrender.com/dashboard-api-swagger
```

---

## 📖 API Response Example

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {}
}
```

---

## 🔒 Security

- JWT Authentication
- Password Hashing (bcrypt)
- Request Validation
- CORS Protection
- Environment Variable Configuration
- Exception Filters

---

## 📈 Future Improvements

- WebSocket Real-time Crypto Prices
- Email Verification
- Refresh Tokens
- Rate Limiting
- Redis Caching
- Docker Support
- CI/CD Pipeline

---

## 👨‍💻 Author

**Your Name**

Backend Developer

GitHub: https://github.com/pooriaashkevarvakili

LinkedIn: https://www.linkedin.com/in/pooriavakili

---

## 📄 License

This project is licensed under the MIT License.