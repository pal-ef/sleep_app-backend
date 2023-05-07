const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// routes
const userRouter = require('./routes/user');

// middlewares
// Calling the express.json() method for parsing
app.use(cors());
app.use(express.json());

// routers
app.use('/user/', userRouter);

// server listen
app.listen(process.env.PORT || 3000);