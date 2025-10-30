const {Server} = require("socket.io");

const io = new Server({cors: "http://localhost:5173/"});

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("New Socket Connection", socket.id);

    // Listen to a connection
    socket.on("addNewUser", (userId) => {
        onlineUsers.push({
            userId,
            socketId: socket.id
        });
    });
});

io.listen(3000);