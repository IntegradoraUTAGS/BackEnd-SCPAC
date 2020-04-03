const express = require('express');
const app = express();

app.use('/group', require('./group'));

app.use('/usuario', require('./usuario'));
app.use('/usuario', require('./login'));
module.exports = app;