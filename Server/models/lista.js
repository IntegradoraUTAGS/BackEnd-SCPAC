const mongoose =  require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let listaSchema = new Schema ({
    nombreLista: {
        type: String,
        required: [true, 'Porfavor pon el nombre de la lista']
    }, 
    Status: {
        type: Boolean,
        default: true
    }
});

listaSchema.plugin(uniqueValidator,{
    message: '(PATH) Debe ser unico y diferente'
});

module.exports = mongoose.model('lista', listaSchema);