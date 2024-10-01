const express = require('express');
const { connectMongoDB } = require('./connection');
const urlRouter = require('./routes/url')
const analyticsRouter = require('./routes/analytics')
 
const app = express();

// Connect
connectMongoDB("mongodb://localhost:27017/shortUrl")
.then(()=>{
    console.log("Connection Successfull!");
})
.catch((err)=>{
    console.log("Can't connect: ", err);
})

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res)=>{
    return res.send("ShortURL!");
})

app.use("/url", urlRouter);

app.use("/analytics", analyticsRouter);


const PORT = 5500;
app.listen(PORT, ()=>{
    console.log(`Server running at PORT:${PORT}...`);
})