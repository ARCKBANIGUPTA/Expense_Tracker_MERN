require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB =require("./config/db");
const app = express();
const authRoutes = require("./routes/authRoutes");
const upload = require("./middleware/uploadMiddleware");
const IncomeRoutes = require("./routes/IncomeRoutes");
const ExpenseRoutes = require("./routes/ExpenseRputes");
const DashboardRoutes = require("./routes/dashboardRoutes");
app.use(
    cors({
        // origin:process.env.CLIENT_URL || "*",
        //CORS stands for Cross-Origin Resource Sharing. It's a security mechanism implemented
        // in web browsers that controls how web pages in one domain can request and interact with resources from another domain.
        //stops website A to use resources of website B
        origin:["http://localhost:3000","https://expense-tracker-zisr.onrender.com","https://exp-track-96tz.onrender.com"],
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],

    })

);

app.use(express.json());
connectDB();

app.use("/api/v1/auth",authRoutes );
app.use("/api/v1/income",IncomeRoutes );
app.use("/api/v1/expense",ExpenseRoutes );
app.use("/api/v1/dashboard",DashboardRoutes);
const PORT = process.env.PORT || 5000;

app.use("/uploads",express.static(path.join(__dirname,"uploads")));//Express will automatically handle incoming requests for file paths that match files in the designated folder.

app.listen(PORT,'0.0.0.0',()=>{
    console.log("Server is running ....");
})

