# Part 4 - Testing Express Servers, User Administration

This directory contains the full-stack implementation for the blog list application.

## Main Features

### Blog List Application
- User authentication
- Token-based authorization
- Testing backend
- User administration
- Blog management

## Project Structure
```
bloglist/
├── backend/
│   ├── controllers/
│   │   ├── blogs.js
│   │   ├── login.js
│   │   └── users.js
│   ├── models/
│   │   ├── blog.js
│   │   └── user.js
│   ├── tests/
│   │   ├── blog_api.test.js
│   │   ├── test_helper.js
│   │   └── user_api.test.js
│   ├── utils/
│   │   ├── config.js
│   │   ├── logger.js
│   │   ├── middleware.js
│   │   └── list_helper.js
│   ├── app.js
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogForm.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   └── Notification.jsx
│   │   ├── services/
│   │   │   ├── blogs.js
│   │   │   ├── login.js
│   │   │   └── users.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── tests/
└── requests/
    ├── create_blog.rest
    ├── create_user.rest
    └── login.rest
```

## Key Concepts Learned
- Backend testing
- User authentication
- Token authorization
- Test-driven development
- Async/await
- MongoDB relationships
- Error handling
- Environment configuration
- API documentation
- Request validation

## API Endpoints

### Blogs
- GET /api/blogs - Get all blogs
- POST /api/blogs - Create new blog
- PUT /api/blogs/:id - Update blog
- DELETE /api/blogs/:id - Delete blog

### Users
- GET /api/users - Get all users
- POST /api/users - Create new user

### Authentication
- POST /api/login - User login

## Testing
- Unit tests with Jest
- API testing with Supertest
- Test environment configuration
- Test database handling
- Integration testing
- Component testing