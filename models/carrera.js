'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var carreraSchema = schema({
    descripcion: String,
    estatus: String
});

module.exports = mongoose.model('Carrera', carreraSchema);