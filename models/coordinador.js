'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var coordinadorSchema = schema({
    nombres: String,
    app: String,
    apm: String,
    correo: String,
    contra: String,
    carrera: { type: schema.ObjectId, ref: 'Carrera' }, //carrera
    estatus: String

});

module.exports = mongoose.model('Coordinador', coordinadorSchema);