const { Schema, model } = require('mongoose');

const MedicamentoSchema = Schema({

    Nombre: {
        type: String,
        required: true
    },
    Lote: {
        type: String,
        required: true,
        unique: true
    },
    Marca: {
        type: String,
        required: true,
    },
    Dosis: {
        type: String,
        required: true,
    }
});


MedicamentoSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model( 'Medicamento', MedicamentoSchema );
