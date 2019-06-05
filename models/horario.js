'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;


var horariosSchema = schema({
    // descripcion: String,
    hora: String,
    ciclo: { type: schema.ObjectId, ref: 'Ciclo' },
    semestre: String,
    maestro: { type: schema.ObjectId, ref: 'Maestro' },
    materia: { type: schema.ObjectId, ref: 'Materia' },
    grupo: { type: schema.ObjectId, ref: 'Grupo' },
    estatus: String
});


module.exports = mongoose.model('Horario', horariosSchema);