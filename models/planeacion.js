'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var planeacionSchema = schema({
    materia: { type: schema.ObjectId, ref: 'Materia' },
    ciclo: { type: schema.ObjectId, ref: 'Ciclo' },
    estatus: String

});

module.exports = mongoose.model('Planeacion', planeacionSchema);