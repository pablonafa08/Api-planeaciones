'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var tareaSchema = schema({
    planeacion: { type: schema.ObjectId, ref: 'Planeacion' },
    tarea: String,
    instrucciones: String

});

module.exports = mongoose.model('Tarea', tareaSchema);