# Whispr

This is a full-featured, real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and powered by Socket.IO. It provides a seamless and interactive chatting experience with features like user authentication, private messaging, online user status, and real-time notifications.

## ✨ Features

*   **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
*   **Real-Time Messaging**: Instant message delivery and reception powered by Socket.IO.
*   **Private Chats**: Users can start one-on-one conversations with any other registered user.
*   **Online Status**: A visual indicator shows which users are currently online.
*   **Message Notifications**: Receive real-time notifications for new messages, even when the chat window with the sender is not active.
*   **"Mark as Read"**: Notifications can be marked as read individually or all at once.
*   **Chat History**: All conversations are saved to the database and loaded when a chat is opened.
*   **Responsive UI**: A clean and modern user interface built with React and styled with React-Bootstrap.

## 🛠️ Tech Stack

The application is built with a modern technology stack, separating the frontend, backend API, and real-time socket server.

| Category      | Technology                                                                                                                                                                                                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**  | [React](https://reactjs.org/), [React Router](https://reactrouter.com/), [React Context API](https://reactjs.org/docs/context.html), [Socket.IO Client](https://socket.io/docs/v4/client-api/), [Bootstrap](https://getbootstrap.com/), [React-Bootstrap](https://react-bootstrap.github.io/), [moment.js](https://momentjs.com/), [react-input-emoji](https://www.npmjs.com/package/react-input-emoji) |
| **Backend**   | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/), [Socket.IO](https://socket.io/), [JSON Web Tokens (JWT)](https://jwt.io/), [Bcrypt.js](https://www.npmjs.com/package/bcrypt), [Dotenv](https://www.npmjs.com/package/dotenv), [CORS](https://www.npmjs.com/package/cors) |

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

*   **Node.js** (v14 or later)
*   **npm** or **yarn**
*   **MongoDB** (you can use a local instance or a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Adam556678/whispr.git
    cd whispr
    ```

2.  **Backend (API Server) Setup:**
    *   Navigate to the API server directory (the folder containing `controllers`, `models`, `routes`, etc.).
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Create a `.env` file in this directory and add the following variables:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_super_secret_jwt_key
        ```
    *   Start the API server:
        ```bash
        npm start
        ```
        The API server will be running on `http://localhost:5000`.

3.  **Backend (Socket Server) Setup:**
    *   Navigate to the Socket server directory (the folder containing the `socket.io` `index.js` file).
    *   Install dependencies:
        ```bash
        npm install socket.io
        ```
    *   Start the Socket server:
        ```bash
        node index.js
        ```
        The Socket server will be running on `http://localhost:3000`.

4.  **Frontend (Client) Setup:**
    *   Navigate to the client directory (the folder containing `src`, `public`, etc.).
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Start the React development server:
        ```bash
        npm run dev
        ```
        The application will be accessible at `http://localhost:5173`.

## ⚙️ Environment Variables

The backend API server requires a `.env` file with the following keys:
*   `PORT`: The port on which the Express server will run (e.g., `5000`).
*   `MONGO_URI`: Your connection string for the MongoDB database.
*   `JWT_SECRET`: A strong, secret key for signing JSON Web Tokens.

## 📡 API Endpoints & Socket Events

### REST API

The following are the main API routes available:

| Method | Endpoint                             | Description                                 |
| ------ | ------------------------------------ | ------------------------------------------- |
| `POST` | `/api/users/register`                | Register a new user.                        |
| `POST` | `/api/users/login`                   | Log in an existing user.                    |
| `GET`  | `/api/users/find/:userId`            | Find a user by their ID.                    |
| `GET`  | `/api/users`                         | Get a list of all registered users.         |
| `POST` | `/api/chats`                         | Create a new chat between two users.        |
| `GET`  | `/api/chats/:userId`                 | Get all chats for a specific user.          |
| `GET`  | `/api/chats/find/:firstId/:secondId` | Find a specific chat between two users.     |
| `POST` | `/api/messages`                      | Create and save a new message.              |
| `GET`  | `/api/messages/:chatId`              | Get all messages for a specific chat.       |

### Socket.IO Events

Real-time communication is handled through these socket events:

| Event Name         | Direction | Description                                                                    |
| ------------------ | --------- | ------------------------------------------------------------------------------ |
| `addNewUser`       | Client → Server | Sent when a user logs in, adding them to the list of online users.           |
| `sendMessage`      | Client → Server | Sent when a user sends a message, which the server relays to the recipient.  |
| `getOnlineUsers`   | Server → Client | Broadcasts the updated list of online users to all connected clients.        |
| `getMessage`       | Server → Client | Delivers a new message to the intended recipient.                            |
| `getNotification`  | Server → Client | Sends a notification payload to the recipient of a new message.              |
| `disconnect`       | Client → Server | Automatically fired when a user disconnects, removing them from online users.|

## 💡 Future Improvements

This project has a solid foundation, but there's always room for more features:

-   [ ] **Group Chats**: Allow users to create and participate in conversations with multiple members.
-   [ ] **File & Image Sharing**: Implement functionality to send images and other file types.
-   [ ] **Typing Indicators**: Show a "... is typing" indicator to improve user experience.
-   [ ] **Message Seen/Read Receipts**: Add indicators to show when a message has been delivered and read.
-   [ ] **End-to-end Encryption**: Implement a higher level of security for messages.
