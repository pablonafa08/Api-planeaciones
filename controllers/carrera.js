'use strict'
//modulos
const bcrypt = require('bcrypt-nodejs');

//modelo
const Carrera = require('../models/carrera');


//acciones

function addCarrera(req, res) {
    var carrera = new Carrera();
    var params = req.body;

    carrera.descripcion = params.descripcion;
    carrera.estatus = params.estatus;

    Carrera.findOne({ carrera: carrera.descripcion }, (err, issetCarrera) => {
        if (err) {
            res.status(500).send({ message: `Error al comprobar existencia` });
        } else {
            if (!issetCarrera) {
                carrera.save((err, carreraStored) => {
                    if (err) {
                        res.status(500).send({ message: `Error al guardar la carrera` })
                    } else {
                        if (!carreraStored) {
                            res.status(404).send({ message: `No se pudo guardar la carrera` });
                        } else {
                            res.status(200).send({ carrera: carreraStored });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: `La carrera ya existe` });
            }
        }
    });

}

function updateCarrera(req, res) {
    var carreraId = req.params.id;
    var update = req.body;

    Carrera.findByIdAndUpdate(carreraId, update, { new: true }, (err, carreraUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!carreraUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ carrera: carreraUpdated });
            }
        }
    });
}

function getCarrera(req, res) {
    var carreraId = req.params.id;

    Carrera.findById(carreraId, (err, carrera) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la busqueda` });
        } else {
            if (!carrera) {
                res.status(404).send({ message: `No hay carreras` });
            } else {
                res.status(200).send({ carrera });
            }
        }
    });
}

function getCarreras(req, res) {
    Carrera.find({ estatus: 'A' }).exec((err, allCarreras) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allCarreras) {
                res.status(404).send({ message: `No hay carreras` });
            } else {
                res.status(200).send({ carreras: allCarreras });
            }
        }
    });
}


module.exports = {
    addCarrera,
    updateCarrera,
    getCarrera,
    getCarreras
}