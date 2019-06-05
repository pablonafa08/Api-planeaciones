'use strict'
//modulos
const bcrypt = require('bcrypt-nodejs');

//modelo
const Relacion = require('../models/rel_mae_mat');


//acciones

function addRelacion(req, res) {
    var relacion = new Relacion();
    var params = req.body;

    relacion.maestro = params.maestro;
    relacion.materia = params.materia;
    relacion.estatus = params.estatus;

    Relacion.findOne({ maestro: relacion.maestro, materia: relacion.materia }, (err, issetRelacion) => {
        if (err) {
            res.status(500).send({ message: `Error al comprobar existencia` });
        } else {
            if (!issetRelacion) {
                relacion.save((err, relacionStored) => {
                    if (err) {
                        res.status(500).send({ message: `Error al guardar la relacion` })
                    } else {
                        if (!relacionStored) {
                            res.status(404).send({ message: `No se pudo guardar la relacion` });
                        } else {
                            res.status(200).send({ relacion: relacionStored });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: `La relacion ya existe` });
            }
        }
    });

}


function getRelByIdMaestro(req, res) {
    var maestroId = req.params.id;
    Relacion.find({ maestro: maestroId, estatus: 'A' }).exec((err, allRelaciones) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allRelaciones) {
                res.status(404).send({ message: `No hay relaciones` });
            } else {
                res.status(200).send({ relaciones: allRelaciones });
            }
        }
    });
}

function getRelByIdMateria(req, res) {
    var materiaId = req.params.id;
    Relacion.find({ materia: materiaId, estatus: 'A' }).exec((err, allRelaciones) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allRelaciones) {
                res.status(404).send({ message: `No hay relaciones` });
            } else {
                res.status(200).send({ relaciones: allRelaciones });
            }
        }
    });
}

function getRelaciones(req, res) {
    Relacion.find({ estatus: 'A' }).populate({ path: 'materia' }).populate({ path: 'maestro' }).exec((err, allRelaciones) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allRelaciones) {
                res.status(404).send({ message: `No hay relaciones` });
            } else {
                res.status(200).send({ relaciones: allRelaciones });
            }
        }
    });
}

function updateRelacion(req, res) {
    var update = req.body;
    var relacionId = req.params.id;

    Relacion.findByIdAndUpdate(relacionId, update, { new: true }, (err, relacionUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!relacionUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ relacion: relacionUpdated });
            }
        }
    });
}

// function getRelByIdCarrera(req, res) {
//     var carreraId = req.params.id;
//     Relacion.find({ estatus: 'A' }).populate({ path: 'materia', find: { carrera: carreraId }, populate: { path: 'carrera' } }).populate({ path: 'maestro' }).exec((err, allRelaciones) => {
//         if (err) {
//             res.status(500).send({ message: `Error al hacer la peticion` });
//         } else {
//             if (!allRelaciones) {
//                 res.status(404).send({ message: `No hay relaciones` });
//             } else {
//                 res.status(200).send({ relaciones: allRelaciones });
//             }
//         }
//     });
// }

function getRelByIdCarrera(req, res) {
    var carreraId = req.params.id;
    Relacion.find({ estatus: 'A' }).populate('materia', null, { carrera: carreraId }).populate({ path: 'maestro' }).exec((err, allRelaciones) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allRelaciones) {
                res.status(404).send({ message: `No hay relaciones` });
            } else {
                res.status(200).send({ relaciones: allRelaciones });
            }
        }
    });
}

module.exports = {
    addRelacion,
    getRelByIdMaestro,
    getRelByIdMateria,
    getRelaciones,
    getRelByIdCarrera,
    updateRelacion
}