const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
const Roll = require('./roll');

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


let lessonSchema = new Schema({
    date: {
        type: Date,
        default: dat(Date())
    },
    rolls: {
        type: [Schema.Types.ObjectId],
        ref: 'Roll',
    },
    status: {
        type: Boolean,
        default: true
    }
});

//crea una coleccion
module.exports = mongoose.model('Lesson', lessonSchema);