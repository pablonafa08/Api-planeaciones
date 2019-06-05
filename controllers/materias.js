'use strict'

//modulos


//modelos
const Materia = require('../models/materias');

//acciones

function addMateria(req, res) {
    var materia = new Materia();
    var params = req.body;

    materia.descripcion = params.descripcion;
    materia.carrera = params.carrera;
    materia.estatus = params.estatus;

    materia.horas_s = params.horas_s;
    materia.horas_t = params.horas_t;
    materia.horas_p = params.horas_p;
    materia.horas_i = params.horas_i;
    materia.horas_total = params.horas_total;
    materia.creditos = params.creditos;
    materia.tipo_competencia = params.tipo_competencia;
    materia.semestre = params.semestre;
    materia.tipo_ua = params.tipo_ua;
    materia.competencias = params.competencias;
    materia.productos_desempenio = params.productos_desempenio;
    materia.saberes_teoricos = params.saberes_teoricos;
    materia.saberes_practicos = params.saberes_practicos;
    materia.saberes_actitud = params.saberes_actitud;
    materia.contenidos = params.contenidos;
    materia.competencia_salida = params.competencia_salida;
    materia.act_colegiada = params.act_colegiada;

    materia.save((err, materiaStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar` });
        } else {
            if (!materiaStored) {
                res.status(404).send({ message: `No se pudo guardar` });
            } else {
                res.status(200).send({ materia: materiaStored });
            }
        }
    });

}

function updateMateria(req, res) {
    var materiaId = req.params.id;
    var update = req.body;

    Materia.findByIdAndUpdate(materiaId, update, { new: true }, (err, materiaUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!materiaUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ materia: materiaUpdated });
            }
        }
    });
}

function getMaterias(req, res) {
    Materia.find({ estatus: 'A' }).populate({ path: 'carrera' }).exec((err, allMaterias) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allMaterias) {
                res.status(404).send({ message: `No se pudo hacer la peticion` });
            } else {
                res.status(200).send({ materias: allMaterias });
            }
        }
    });
}

function getMateriasByCarrera(req, res) {
    var carreraId = req.params.id;
    Materia.find({ carrera: carreraId, estatus: 'A' }).populate({ path: 'carrera' }).exec((err, allMaterias) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allMaterias) {
                res.status(404).send({ message: `No se pudo hacer la peticion` });
            } else {
                res.status(200).send({ materias: allMaterias });
            }
        }
    });
}

function getMateria(req, res) {
    var materiaId = req.params.id;

    Materia.findById(materiaId).populate({ path: 'carrera' }).exec((err, materia) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!materia) {
                res.status(404).send({ message: `No se pudo hacer la peticion` });
            } else {
                res.status(200).send({ materia });
            }
        }
    });
}

module.exports = {
    addMateria,
    updateMateria,
    getMaterias,
    getMateria,
    getMateriasByCarrera
}