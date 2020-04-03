const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//declarar esquema
let Schema = mongoose.Schema;
const Lesson = require('./lesson');

const Usuario = require('./usuario');
let groupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Pon un nombre valido'],
        unique: true,

    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',

    },
    lessons: {
        type: [Schema.Types.ObjectId],
        ref: 'Lesson',
        default: []
    },
    members: {
        type: [Schema.Types.ObjectId],
        ref: 'Usuario',

        index: true
    },
    status: {
        type: Boolean,
        default: true


    }
});
groupSchema.plugin(uniqueValidator, {
    message: '{PATH} Need to be unique and different'
});

module.exports = mongoose.model('Group', groupSchema);