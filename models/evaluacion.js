'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;


var evaluacionesSchema = schema({
    maestro: { type: schema.ObjectId, ref: 'Maestro' },
    materia: { type: schema.ObjectId, ref: 'Materia' },
    grupo: { type: schema.ObjectId, ref: 'Grupo' },
    asistencia: Boolean,
    tema: String,
    estrategias: String,
    fecha: String,
    estatus: String
});


module.exports = mongoose.model('Evaluacion', evaluacionesSchema);