const { Schema, model } = require('mongoose');

const NotificacionSchema = Schema({
    Nombre: {
        type: String,
        required: true
    },
    pacienteNombre: {
        type: String,
        required: true
    },
    pacienteApellido: {
        type: String,
        required: true
    },
    pacienteEdad: {
        type: Number,
        required: true
    },
    RS: {
        type: String,
        required: true
    },
    Cantidad: {
        type: Number,
        required: true
    },
    // img: {
    //     type: String,
    // },
    // usuario: {
    //     required: true,
    //     type: Schema.Types.ObjectId,
    //     ref: 'Usuario'
    // }
});


NotificacionSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Notificacion', NotificacionSchema );