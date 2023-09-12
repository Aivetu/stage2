require('dotenv').config();
const express = require('express');
const app = express();
const mongoose =require('mongoose');
const dbConnect = require('./src/config/connectDB');
const userRoute = require('./src/route/user.route');

const PORT = process.env.PORT || 8094;



dbConnect();



app.use(express.json());

app.use('/api',userRoute);


mongoose.connection.once('open',()=>{
    console.log("This mongoDb connection is Live!!");
    app.listen(PORT, () => console.log(`service running at port ${PORT}`));
})
