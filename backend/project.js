const express = require('express');
const fs = require('fs');
const cors=require('cors')
const moviesRouter=require('./Routes/moviesroute')
const dotenv=require('dotenv');

dotenv.config({path:'./backend/config.env'});
const app=express();

app.use(express.json());
app.use(cors())
app.use('/api/v1/movies',moviesRouter);
module.exports=app;