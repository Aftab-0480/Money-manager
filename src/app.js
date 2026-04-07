const express = require("express");
require('dotenv').config();
const db = require('./config/db')

const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');

app.use('/user', authRoutes);

module.exports = app;