const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//declarar esquema
let Schema = mongoose.Schema;
const Group = require('./group');
let usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Pon un nombre']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Pon un e-mail valido']
    },
    password: {
        type: String,
        required: [true, 'Pon un password']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
    },
    status: {
        type: Boolean,
        default: false
    },
    groups: {
        type: [Schema.Types.ObjectId],
        ref: 'Group'
    }
});
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} Need to be unique and different'
});


module.exports = mongoose.model('Usuario', usuarioSchema);