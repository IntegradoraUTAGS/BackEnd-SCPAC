const mongoose =  require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Ingrese su nombre']
    },
    password: {
        type: String,
        required: [true, 'Ingrese una contraseña']
    },
    email: {
        type: String,
        required: [true, 'Ingrese su email'],
        unique: true
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);