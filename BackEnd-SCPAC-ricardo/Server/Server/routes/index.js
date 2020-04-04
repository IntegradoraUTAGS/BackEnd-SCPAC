const express = require('express');
const app = express();

app.use('/usuario',require('./usuario'));
app.use('/usuario',require('./login'));
app.use('/lesson', require('./lesson'))
module.exports = app;