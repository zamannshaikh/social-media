const express = require('express');
const authRoutes = require('./routes/auth.routes');
console.log(authRoutes);


const app = express();
app.use(express.json());

// Routes
app.use("/auth",authRoutes);




module.exports = app;