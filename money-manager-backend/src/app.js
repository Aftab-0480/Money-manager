const express = require("express");
require('dotenv').config();
const db = require('./config/db')

const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use('/user', authRoutes);
app.use('/transaction', transactionRoutes);

module.exports = app;