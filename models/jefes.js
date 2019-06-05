'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;


var jefesSchema = schema({
    nombres: String,
    app: String,
    apm: String,
    carrera: { type: schema.ObjectId, ref: 'Carrera' },
    correo: String,
    contra: String,
    tel: String,
    grupo: { type: schema.ObjectId, ref: 'Grupo' }, //checar
    estatus: String
});


module.exports = mongoose.model('Jefe', jefesSchema);