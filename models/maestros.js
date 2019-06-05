'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;


var maestrosSchema = schema({
    nombres: String,
    app: String,
    apm: String,
    correo: String,
    contra: String,
    estatus: String
});

module.exports = mongoose.model('Maestro', maestrosSchema);