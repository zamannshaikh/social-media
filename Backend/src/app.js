const express = require('express');
const cokkieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');



const app = express();
app.use(cokkieParser());
app.use(express.json());

// Routes
app.use("/auth",authRoutes);
app.use("/",postRoutes);




module.exports = app;