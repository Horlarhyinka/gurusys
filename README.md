# Gurusys

Gurusys is a Node.js and Express-based application with user authentication, blog, and comment management functionalities. The project uses MongoDB as the database and includes various middlewares for security, validation, and error handling.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [Authentication](#authentication)
  - [Blogs](#blogs)
  - [Comments](#comments)
- [Middleware](#middleware)
- [Validation](#validation)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/gurusys.git
    ```

2. Install dependencies:

    ```bash
    cd gurusys
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the necessary environment variables:

    ```
    DB_URI=your_mongodb_connection_string
    APP_SECRET=your_jwt_secret
    APP_PORT=your_port
    ```

4. Build and start the project:

    ```bash
    npm run build
    npm start
    ```

    For development, use:

    ```bash
    npm run start:dev
    ```

## Usage

The application provides a RESTful API for managing users, blogs, and comments. Below are the available endpoints and their functionalities.

## Endpoints

### Authentication

- **Register**

    ```http
    POST /api/v1/auth/register
    ```

    Request body:

    ```json
    {
      "username": "your_username",
      "password": "your_password"
    }
    ```

- **Login**

    ```http
    POST /api/v1/auth/login
    ```

    Request body:

    ```json
    {
      "username": "your_username",
      "password": "your_password"
    }
    ```

### Blogs

- **Create a Blog**

    ```http
    POST /api/v1/blogs
    ```

    Requires authentication.

    Request body:

    ```json
    {
      "title": "Blog Title",
      "content": "Blog Content",
      "tags": ["tag1", "tag2"]
    }
    ```

- **Get all Blogs**

    ```http
    GET /api/v1/blogs
    ```

    Query parameters (optional):

    - `filter`: Filter by field (authorid, title, tags, content)
    - `value`: Filter value
    - `page`: Page number (default: 1)
    - `size`: Page size (default: 20)

- **Get a Blog by ID**

    ```http
    GET /api/v1/blogs/:blogId
    ```

- **Update a Blog**

    ```http
    PUT /api/v1/blogs/:blogId
    ```

    Requires authentication and the blog must belong to the authenticated user.

    Request body (partial updates allowed):

    ```json
    {
      "title": "Updated Blog Title",
      "content": "Updated Blog Content",
      "tags": ["updatedTag1", "updatedTag2"]
    }
    ```

- **Delete a Blog**

    ```http
    DELETE /api/v1/blogs/:blogId
    ```

    Requires authentication and the blog must belong to the authenticated user.

### Comments

- **Create a Comment**

    ```http
    POST /api/v1/comments
    ```

    Requires authentication.

    Request body:

    ```json
    {
      "body": "Comment body",
      "blogId": "blog_id"
    }
    ```

- **Get all Comments for a Blog**

    ```http
    GET /api/v1/comments
    ```

    Query parameters (required):

    - `blogId`: ID of the blog

- **Get a Comment by ID**

    ```http
    GET /api/v1/comments/:commentId
    ```

## Middleware

- **Authentication Middleware**

    Protects routes that require authentication by verifying the JWT token.

- **ID Parameter Middleware**

    Validates the ID parameter in routes that require a specific ID.

- **Rate Limiting**

    Limits the number of requests to 100 per 15 minutes.

- **Helmet**

    Adds security headers to requests.

- **CORS**

    Allows cross-origin requests.

## Validation

- **Joi**

    Used for validating request payloads for registration, blog creation, and comment creation.

## Error Handling

- **catchAsyncErrors**

    A utility to catch and handle async errors in route handlers.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

Project license to be added.
