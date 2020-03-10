const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//declarar esquema
let Schema = mongoose.Schema;
const Lesson = require('./lesson');

const Usuario = require('./usuario');
let groupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Pon un nombre']
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    lessons: {
        type: [Schema.Types.ObjectId],
        ref: 'Lesson'
    },
    members: {
        type: [Schema.Types.ObjectId],
        ref: 'Usuario'
    },
    status: {
        type: Boolean,
        default: true


    }
});

module.exports = mongoose.model('Group', groupSchema);