'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var lecturaSchema = schema({
    planeacion: { type: schema.ObjectId, ref: 'Planeacion' },
    lectura: String,
    instrucciones: String

});

module.exports = mongoose.model('Lectura', lecturaSchema);