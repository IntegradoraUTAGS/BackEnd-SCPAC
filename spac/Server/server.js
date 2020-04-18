require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use('/api',require('./routes/index'));

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    
},
    (err,reps) => {
        if(err) throw err; 
        console.log('Base de datos online');      
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto', process.env.PORT)
});