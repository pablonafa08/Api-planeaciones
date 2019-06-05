'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var relacionSchema = schema({
    maestro: { type: schema.ObjectId, ref: 'Maestro' },
    materia: { type: schema.ObjectId, ref: 'Materia' },
    estatus: String
});

module.exports = mongoose.model('RelMaeMat', relacionSchema);