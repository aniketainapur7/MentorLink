require("dotenv").config();
const express = require("express");
const cookie = require("cookie-parser");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


const dbconnect = require("./db/db.js");
dbconnect();


const logrequest = require("./middleware/logrequest.js");
app.use("/api/user", logrequest, require("./routes/auth.route.js"));
app.use("/api/mentor", logrequest, require("./routes/mentor.route.js"));
app.use("/api/student", logrequest, require("./routes/student.route.js"));
app.use("/api/session", logrequest, require("./routes/session.route.js"));
app.use("/api/chat", logrequest, require("./routes/chat.route.js"));


const { initSocket } = require("./utils/socket.js");
initSocket(server);

const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
