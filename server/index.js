const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", require("./routes/userRoute.js"));
app.use("/api/chats", require("./routes/chatRoute.js"));
app.use("/api/messages", require("./routes/messageRoute.js"));
app.get("/", (req, res) => {
    console.log("Welcome to our Chat App");
    
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server running on port " + port); 
});


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB successfully");
    
});