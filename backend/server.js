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
        origin:process.env.CLIENT_URL || "*",
        //CORS stands for Cross-Origin Resource Sharing. It's a security mechanism implemented
        // in web browsers that controls how web pages in one domain can request and interact with resources from anot her domain.
        //stops website A to use resources of website B
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

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.listen(PORT,()=>{
    console.log("Server is running ....");
})

