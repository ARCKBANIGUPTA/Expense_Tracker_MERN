require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB =require("./config/db");
const app = express();
const authRoutes = require("./routes/authRoutes")
app.use(
    cors({
        origin:process.env.CLIENT_URL || "*",
        //CORS stands for Cross-Origin Resource Sharing. It's a security mechanism implemented
        // in web browsers that controls how web pages in one domain can request and interact with resources from another domain.
        //stops website A to use resources of website B
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],

    })

);

app.use(express.json());
connectDB();

app.use("/api/v1/auth",authRoutes )
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Server is running ....");
})

