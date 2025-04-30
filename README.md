# Blog Platform API

A modern RESTful API for a blog platform, built with Node.js, Express, and MongoDB. Enables secure user authentication, blog post management, commenting, and category organization with a focus on scalability and developer experience. Deployed on Render with automated CI/CD via GitHub Actions.

## Why This Project?

This API powers a dynamic blog platform, showcasing my ability to deliver secure, well-documented, and production-ready backend solutions. Ideal for clients seeking robust APIs for content-driven applications.

## Features

- Secure user registration and login (JWT-based)
- Blog post creation, editing, deletion, and filtering by category/tag
- Comment system with like/dislike functionality
- Pagination for efficient data retrieval
- Rate limiting to protect sensitive endpoints
- Interactive API documentation via Swagger
- Automated testing with Jest

## Tech Stack

- Node.js
- Express.js (ES Modules)
- MongoDB (Atlas) with Mongoose
- JWT for authentication
- Swagger for API documentation
- Jest for testing
- express-rate-limit for security
- Render for deployment
- GitHub Actions for CI/CD

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Render account
- GitHub account
- Postman (optional, for testing)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/blog-api.git
   cd blog-api
   •	Install Dependencies:
   bash
   npm install
   •	Set Up Environment Variables: Create a .env file:
   env
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/blog?retryWrites=true&w=majority
   JWT_SECRET=your-secret-key
   PORT=3000
   NODE_ENV=development
   •	Run the API:
   bash
   npm run dev
   •	API: http://localhost:3000/api
   •	Docs: http://localhost:3000/api-docs
   Testing
   •	Run Tests:
   bash
   npm test
   •	Test with Postman:
   •	Import Swagger spec from http://localhost:3000/api-docs/swagger.json.
   •	Test endpoints like /api/register, /api/login, /api/posts.
   ```

• Register User:
• Postman: POST https://blog-api.onrender.com/api/register
• Body:
json
{
"email": "author5@example.com",
"password": "password123",
"role": "author"
}
• Retest Login:
• Postman: POST https://blog-api.onrender.com/api/login
• Body:
json
{
"email": "author5@example.com",
"password": "password123"
}

API Documentation
Explore interactive documentation at https://blog-api.onrender.com/api-docs (Swagger UI).
Deployment
Live demo: https://blog-api.onrender.com
Deployment Steps
• Create a Web Service on Render.
• Connect your GitHub repo (your-username/blog-api).
• Configure environment variables:
• MONGODB_URI
• JWT_SECRET
• PORT=10000
• NODE_ENV=production
• Enable auto-deploys for the main branch.
CI/CD
• Continuous Integration: GitHub Actions runs tests and linting on every push.
• Continuous Deployment: Automatically deploys to Render on main branch updates.
Troubleshooting
• MongoDB Issues: Verify MONGODB_URI and set MongoDB Atlas IP whitelist to 0.0.0.0/0.
• Authentication Errors: Ensure JWT_SECRET is consistent across environments.
• Rate Limiting: Exceeding 100 requests in 15 minutes triggers a 429 error.
License
MIT License
