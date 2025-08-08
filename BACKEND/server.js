require("dotenv").config();
const cookie = require("cookie-parser");
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

const dbconnect  = require("./db/db.js");
dbconnect();
app.use(cookie());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const time = new Date().toLocaleString(); 
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
});

const User = require("./routes/auth.route.js");
app.use("/api/user" , User);

const port = process.env.PORT
app.listen(port,'0.0.0.0', ()=>{
    console.log(`server is running on port ${port}`);
})
