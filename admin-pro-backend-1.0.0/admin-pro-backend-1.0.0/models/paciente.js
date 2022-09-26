const { Schema, model } = require('mongoose');

const PacienteSchema = Schema({

    Nombres: {
        type: String,
        required: true
    },
    Apellidos: {
        type: String,
        required: true
    },
    Edad: {
        type: Number,
        required: true
    },
    Peso: {
        type: Number,
        required: true
    },
    Estatura: {
        type: Number,
        required: true
    },
    DNI: {
        type: String,
        required: true
    },
 
});


PacienteSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model( 'Usuario', PacienteSchema );
