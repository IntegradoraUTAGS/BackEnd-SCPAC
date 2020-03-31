const express = require('express');
const app = express();


app.use(require('./lista'));
module.exports = app;