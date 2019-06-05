'use strict'
//modulos
const bcrypt = require('bcrypt-nodejs');

//modelo
const Planeacion = require('../models/planeacion');


//acciones

function addPlaneacion(req, res) {
    var planeacion = new Planeacion();
    var params = req.body;

    planeacion.materia = params.materia;
    planeacion.ciclo = params.ciclo;
    planeacion.estatus = params.estatus;


    Planeacion.findOne({ materia: planeacion.materia, ciclo: planeacion.ciclo }, (err, issetPlaneacion) => {
        if (err) {
            res.status(500).send({ message: `Error al comprobar existencia` });
        } else {
            if (!issetPlaneacion) {
                planeacion.save((err, planeacionStored) => {
                    if (err) {
                        res.status(500).send({ message: `Error al guardar la planeacion` })
                    } else {
                        if (!planeacionStored) {
                            res.status(404).send({ message: `No se pudo guardar la planeacion` });
                        } else {
                            res.status(200).send({ planeacion: planeacionStored });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: `La planeacion ya existe` });
            }
        }
    });

}


function getPlanByIdMateria(req, res) {
    var materiaId = req.params.id;
    Planeacion.find({ materia: materiaId, estatus: 'A' }).populate('materia').populate('ciclo').exec((err, allPlaneaciones) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allPlaneaciones) {
                res.status(404).send({ message: `No hay planeaciones` });
            } else {
                res.status(200).send({ planeaciones: allPlaneaciones });
            }
        }
    });
}


function getPlanByIdMateriaByCiclo(req, res) {
    var materiaId = req.params.id;
    var cicloId = req.params.ciclo;
    Planeacion.find({ materia: materiaId, estatus: 'A', ciclo: cicloId }).populate('materia').populate('ciclo').exec((err, allPlaneaciones) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allPlaneaciones) {
                res.status(404).send({ message: `No hay planeaciones` });
            } else {
                res.status(200).send({ planeaciones: allPlaneaciones });
            }
        }
    });
}


function updatePlaneacion(req, res) {
    var planeacionId = req.params.id;
    var update = req.body;

    Planeacion.findByIdAndUpdate(planeacionId, update, { new: true }, (err, planeacionUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!planeacionUpdated) {
                res.status(404).send({ message: `No se ha podido actualizar` });
            } else {
                res.status(200).send({ planeacion: planeacionUpdated });
            }
        }
    });
}

function getPlaneacion(req, res) {
    var planeacionId = req.params.id;

    Planeacion.findById(planeacionId).populate('materia').populate('ciclo').exec((err, planeacion) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!planeacion) {
                res.status(404).send({ message: `No hay planeaciones` });
            } else {
                res.status(200).send({ planeacion });
            }
        }
    });
}

function getPlanByIdCiclo(req, res) {
    var cicloId = req.params.id;
    Planeacion.find({ ciclo: cicloId, estatus: 'A' }).populate('ciclo').exec((err, allPlaneaciones) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allPlaneaciones) {
                res.status(404).send({ message: `No hay planeaciones` });
            } else {
                res.status(200).send({ planeaciones: allPlaneaciones });
            }
        }
    });
}

function getPlanByIdCicloByCarrera(req, res) {
    var cicloId = req.params.id;
    Planeacion.find({ ciclo: cicloId, estatus: 'A' }).populate('materia').populate('ciclo').exec((err, allPlaneaciones) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allPlaneaciones) {
                res.status(404).send({ message: `No hay planeaciones` });
            } else {
                res.status(200).send({ planeaciones: allPlaneaciones });
            }
        }
    });
}

module.exports = {
    addPlaneacion,
    getPlanByIdMateria,
    updatePlaneacion,
    getPlaneacion,
    getPlanByIdCiclo,
    getPlanByIdCicloByCarrera,
    getPlanByIdMateriaByCiclo
}