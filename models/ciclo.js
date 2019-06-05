'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var cicloSchema = schema({
    descripcion: String,
    estatus: String,
    semestre1_inicio: String,
    semestre1_fin: String,
    semestre2_inicio: String,
    semestre2_fin: String,
    vac_semsanta_inicio: String,
    vac_semsanta_fin: String
});

module.exports = mongoose.model('Ciclo', cicloSchema);