const express = require('express');
const db = require('./core/dbLib/db.connect');
const middleware = require('./core/middleware/verifyUser');

const app = express.Router();
db.connect(true);

app.use('/login', require('./core/login/login').apiLogin);
app.use('/signup', require('./core/login/login').apiSignUp);

app.all('*', middleware.verifyToken);

module.exports = app;
