# Part 4 - Testing Express Servers, User Administration

This directory contains the backend implementation for the blog list application.

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
├── backend/                # Backend source code
│   ├── controllers/        # Route handlers
│   │   ├── blogs.js       # Blog operations
│   │   ├── login.js       # Authentication
│   │   └── users.js       # User management
│   ├── models/            # Database models
│   │   ├── blog.js        # Blog schema
│   │   └── user.js        # User schema
│   ├── tests/             # Test files
│   │   ├── blog_api.test.js
│   │   ├── test_helper.js
│   │   └── user_api.test.js
│   ├── utils/             # Helper functions
│   │   ├── config.js      # Environment configuration
│   │   ├── logger.js      # Logging
│   │   ├── middleware.js  # Custom middleware
│   │   └── list_helper.js # Test helpers
│   ├── app.js            # Express app setup
│   └── index.js          # Server entry point
└── requests/             # API test requests
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