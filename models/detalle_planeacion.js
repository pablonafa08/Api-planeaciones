'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var planeaciondetalleSchema = schema({
    planeacion: { type: schema.ObjectId, ref: 'Planeacion' },
    fecha: String,
    semana: String, //cambiar para que acepte mas
    contenido_tematico: String,
    act_docente: String,
    tiempo_act_docente: String,
    act_aprendizaje: String,
    tiempo_act_aprendizaje: String,
    recursos: String,
    productos_desemp: String,
    ponderacion: String,
    observaciones: String

});

module.exports = mongoose.model('PlaneacionDetalle', planeaciondetalleSchema);