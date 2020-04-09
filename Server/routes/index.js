const express = require('express');
const app = express();

app.use('/usuario',require('./usuario'));
app.use('/usuario',require('./login'));
app.use('/lesson', require('./lesson'))
app.use('/roll', require('./roll'));
app.use('/group',require('./group'));

module.exports = app;