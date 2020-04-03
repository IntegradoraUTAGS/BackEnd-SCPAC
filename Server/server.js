require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
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

app.use('/api', require('./routes/index'));

mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
            /// ${smk}linea de arriba~~salta DeprecationWarning: mongoose en el delete si no la pongo igual no hace el delete(group/delete)... wtf man what happend here >:vG<
    },
    (err, reps) => {
        if (err) throw err;
        console.log('Base de datos online');
    });

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto 3000')
});