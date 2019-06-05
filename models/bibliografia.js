'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var bibliografiaSchema = schema({
    planeacion: { type: schema.ObjectId, ref: 'Planeacion' },
    descripcion: String

});

module.exports = mongoose.model('Bibliografia', bibliografiaSchema);