'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;


var materiasSchema = schema({
    descripcion: String,
    carrera: { type: schema.ObjectId, ref: 'Carrera' },
    estatus: String,

    horas_s: String,
    horas_t: String,
    horas_p: String,
    horas_i: String,
    horas_total: String,
    creditos: String,
    tipo_competencia: String,
    semestre: String,
    tipo_ua: String,
    competencias: String,
    productos_desempenio: String,
    saberes_teoricos: String,
    saberes_practicos: String,
    saberes_actitud: String,
    contenidos: String,
    competencia_salida: String,
    act_colegiada: String
});


module.exports = mongoose.model('Materia', materiasSchema);