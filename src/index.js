import express from "express";

const app = express()
console.log('ff')
app.listen(5000,(req,res)=>{
    console.log("Server running on port 5000")
})