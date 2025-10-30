const {Server} = require("socket.io");

const io = new Server({cors: "http://localhost:5173/"});

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("New Socket Connection", socket.id);

    // Listen to a connection
    socket.on("addNewUser", (userId) => {
        if (!onlineUsers.some((user) => user.userId === userId)){
            onlineUsers.push({
                userId,
                socketId: socket.id
            });
        }
        console.log("Online users: ", onlineUsers);

        io.emit("getOnlineUsers", onlineUsers);
    });
    
    // Add message event
    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find((user) => user.userId === message.recipientId);

        if (user){
            io.to(user.socketId).emit("getMessage", message);
        }
    });

    // User disconnets event
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
        
        io.emit("getOnlineUsers", onlineUsers);
    });
});

io.listen(3000);