# Todo Application

A Todo web application developed as a web programming project. The application allows users to register and log in, after which they can manage their own todo tasks.

## Technologies

- React
- Vite
- JavaScript
- Express
- PostgreSQL
- Axios
- JWT authentication
- bcrypt
- React Router

## Features

Users can:

- Sign up
- Sign in
- View todo tasks
- Add new tasks
- Delete tasks

Authentication is required for adding and deleting tasks.

When a task is added or deleted, the PostgreSQL database is updated accordingly.

## Project Structure

The frontend is built with React and Vite, while the backend is built with Express.

```text
todo/
├── server/
│   ├── controllers/
│   ├── helper/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── index.test.js
│
├── src/
│   ├── components/
│   ├── context/
│   ├── screens/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

## Testing

The application includes automated tests for the main backend functionality. The tests are written using Mocha and Chai.

The tests cover functionality such as:

- Fetching tasks
- Creating tasks
- Deleting tasks
- Validating task creation without a description
- User registration
- User sign in
- JWT authentication when creating and deleting tasks
- Checking the returned HTTP status codes and response data
