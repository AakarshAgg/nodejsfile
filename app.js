const express=require("express")
const databaseconnect = require("./config/databaseConfig")
const authRouter = require("./router/authRoute")
const app=express()
const cookieParser=require("cookie-parser")
const cors=require("cors")

databaseconnect()

app.use(express.json())  //built in middleware
app.use(cookieParser())
app.use(cors({
    origin:[process.env.CLIENT_URL],
    credentials:true}))


app.use("/api/auth",authRouter)

app.use("/",(req,res)=>{
    res.status(200).json({
        data:"JWTauth server"
    })
})

module.exports=app;