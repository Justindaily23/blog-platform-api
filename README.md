# Blog Platform API

A RESTful API for a blog platform, built with Node.js, Express, and MongoDB. Enables user authentication, post and comment management, categories, and like/dislike features. Deployed on Render with CI/CD via GitHub Actions.

## Features

- User registration and login with JWT authentication
- CRUD operations for posts, categories, and comments
- Like/dislike functionality for comments
- Post filtering by category/tag with pagination
- Rate limiting for secure endpoints
- Swagger documentation at `/api-docs`
- Unit tests with Jest

## Tech Stack

- Node.js, Express (ES Modules)
- MongoDB (Atlas), Mongoose
- JWT, bcrypt, Joi
- Jest, Swagger, express-rate-limit
- Render, GitHub Actions

## Prerequisites

- Node.js (>=18.x)
- MongoDB Atlas
- Render
- GitHub
- Postman

## Setup

1. **Clone Repository**:
   ```bash
   git clone https://github.com/your-username/blog-api.git
   cd blog-api
   •	Install Dependencies:
   bash
   npm install
   •	Configure Environment: Create .env:
   env
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/blog?retryWrites=true&w=majority
   JWT_SECRET=your-secret-key
   PORT=3000
   NODE_ENV=development
   •	Run Locally:
   bash
   npm run dev
   API: http://localhost:3000/api
   Docs: http://localhost:3000/api-docs
   •	Run Tests:
   bash
   npm test
   API Documentation
   Explore endpoints at https://blog-api.onrender.com/api-docs (Swagger UI).
   Deployment
   Live on Render: https://blog-api.onrender.com
   Steps:
   •	Create Render Web Service.
   •	Link GitHub repo (your-username/blog-api).
   •	Set env vars: MONGODB_URI, JWT_SECRET, PORT=10000, NODE_ENV=production.
   •	Enable auto-deploy for main.
   CI/CD
   •	CI: GitHub Actions runs tests/linting on push.
   •	CD: Auto-deploys to Render on main push.
   Testing
   Use Postman:
   •	Import Swagger spec (/api-docs/swagger.json).
   •	Set baseUrl: https://blog-api.onrender.com/api.
   •	Test: Register, login, create posts/comments.
   Troubleshooting
   •	MongoDB: Ensure MONGODB_URI and Atlas IP whitelist (0.0.0.0/0).
   •	JWT: Match JWT_SECRET locally and on Render.
   •	Rate Limiting: 429 after 100 requests/15 mins.
   License
   MIT
   ```

---

### Why This README Is Better

- **Concise**: Removed code, endpoint tables, and verbose examples; points to Swagger for details.
- **Professional**: Clear structure, client-friendly language, portfolio-focused.
- **Portfolio-Ready**: Highlights features, tech, and deployment for Upwork/LinkedIn.
- **No Code**: Avoids technical snippets, keeping it accessible.
- **Skimmable**: Short sections, bullet points, and minimal jargon.

**Customizations Needed**:

- Replace `your-username` with your GitHub username.
- Update `https://blog-api.onrender.com` if different.
- Add image uploads/sharing if implemented (e.g., “Image support for posts” under Features).

---

### Login Fix Plan

To ensure your live demo works for Upwork/LinkedIn:

1. **Share Postman Error** (status, message, e.g., `500: Server error`).
2. **Check**:
   - Render → **Logs** for `MongoServerError`, `JWT error`.
   - Render → **Environment** → Verify `MONGODB_URI`, `JWT_SECRET`.
   - MongoDB Atlas → **Network Access** → Set `0.0.0.0/0`.
3. **Register User**:
   - Postman: `POST https://blog-api.onrender.com/api/register`
   - Body:
     ```json
     {
       "email": "author5@example.com",
       "password": "password123",
       "role": "author"
     }
     ```
4. **Retest Login**:
   - Postman: `POST https://blog-api.onrender.com/api/login`
   - Body:
     ```json
     {
       "email": "author5@example.com",
       "password": "password123"
     }
     ```
5. **If Fails**:
   - Update `src/controllers/user.js` (as shared previously).
   - Re-deploy:
     ```bash
     git commit --allow-empty -m "Day 14: Fix login"
     git push origin main
     ```
