'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;


var gruposSchema = schema({
    descripcion: String,
    carrera: { type: schema.ObjectId, ref: 'Carrera' },
    estatus: String
    //ciclo?
});


module.exports = mongoose.model('Grupo', gruposSchema);