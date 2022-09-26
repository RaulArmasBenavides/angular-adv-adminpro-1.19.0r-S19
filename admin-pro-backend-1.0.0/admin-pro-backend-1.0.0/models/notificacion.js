const { Schema, model } = require('mongoose');


const NotificacionSchema = Schema({
    // Codigo: {
    //     type: String,
    //     required: true
    // },
    // img: {
    //     type: String,
    // },
    medicamento: {
        type:Object,
        required: true,
    },
    paciente: {
        type:Object,
        required: true,
    }
});


NotificacionSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Notificacion', NotificacionSchema );