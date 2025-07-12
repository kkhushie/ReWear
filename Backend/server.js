require("dotenv").config();
const express=require('express')
const app=express();
const cors = require('cors')
const cookieParser=require('cookie-parser')

app.use(express.json());
app.use(cookieParser())
app.use(cors())


//routes import
const authRoutes=require('./routes/auth.routes')

//db connection
const connectDB = require('./config/db')
try {
    connectDB()
}
catch (err) {
    console.log("Error Connecting DATABASE!..", err);
}


//all routes
app.use("/api/auth",authRoutes)


app.listen(process.env.PORT,()=>{
    console.log("server is running 3000")
})