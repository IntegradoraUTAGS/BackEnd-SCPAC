const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
const Lesson = require('./lesson');

//declarar esquema
let Schema = mongoose.Schema;



const dat = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

let rollSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    date: {
        type: Date,
        default: dat(Date())
    }
});

//crea una coleccion
module.exports = mongoose.model('Roll', rollSchema);