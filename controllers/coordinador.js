'use strict'

//modulos
const bcrypt = require('bcrypt-nodejs');

//modelo
const Coordinador = require('../models/coordinador');

//servicio jwt
const jwt = require('../services/coordinador_jwt');

//acciones

function addCoordinador(req, res) {
    var coordinador = new Coordinador();
    var params = req.body;

    coordinador.nombres = params.nombres;
    coordinador.app = params.app;
    coordinador.apm = params.apm;
    coordinador.correo = params.correo;
    coordinador.contra = params.contra;
    coordinador.carrera = params.carrera;
    coordinador.estatus = params.estatus;

    Coordinador.findOne({ correo: coordinador.correo }, (err, issetCoordinador) => {
        if (err) {
            res.status(500).send({ message: `Error al buscar al coordinador` });
        } else {
            if (!issetCoordinador) {
                //cifrar contraseña
                bcrypt.hash(params.contra, null, null, (err, hash) => {
                    coordinador.contra = hash;
                    coordinador.save((err, coordinadorStored) => {
                        if (err) {
                            res.status(500).send({ message: `Error al guardar el coordinador` });
                        } else {
                            if (!coordinadorStored) {
                                res.status(404).send({ message: `No se pudo guardar el coordinador` });
                            } else {
                                res.status(200).send({ coordinador: coordinadorStored });
                            }
                        }
                    });
                });
            } else {
                res.status(200).send({ message: `El correo ya existe` });
            }
        }
    });


}

function updateCoordinador(req, res) {
    var coordinadorId = req.params.id;
    var update = req.body;

    Coordinador.findByIdAndUpdate(coordinadorId, update, { new: true }, (err, coordinadorUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!coordinadorUpdated) {
                res.status(404).send({ message: `No se ha podido actualizar` });
            } else {
                res.status(200).send({ coordinador: coordinadorUpdated });
            }
        }
    })
}

function getCoordinadores(req, res) {
    Coordinador.find({ estatus: 'A' }).populate({ path: 'carrera' }).exec((err, allCoordinadores) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allCoordinadores) {
                res.status(404).send({ message: `No hay coordinadores` });
            } else {
                res.status(200).send({ coordinadores: allCoordinadores });
            }
        }
    });
}

function getCoordinador(req, res) {
    var coordinadorId = req.params.id;

    Coordinador.findById(coordinadorId).populate({ path: 'carrera' }).exec((err, coordinador) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!coordinador) {
                res.status(404).send({ message: `No hay coordinadores` });
            } else {
                res.status(200).send({ coordinador });
            }
        }
    });
}

function login(req, res) {
    var params = req.body;
    var correo = params.correo;
    var contra = params.contra;

    Coordinador.findOne({ correo: correo }, (err, coordinador) => {
        if (err) {
            res.status(500).send({ message: 'Error al comprobar el coordinador' });
        } else {
            if (coordinador) {
                bcrypt.compare(contra, coordinador.contra, (err, check) => {
                    if (check) {
                        //comprobar y generar token
                        if (params.gettoken) {
                            // console.log("hola2");
                            res.status(200).send({
                                token: jwt.createToken(coordinador)
                            });
                        } else {
                            // console.log("hola");
                            res.status(200).send({ coordinador });
                        }
                    } else {
                        res.status(404).send({
                            message: 'La contraseña ingresada no es correcta'
                        });
                    }
                });
                //res.status(200).send({user});
            } else {
                res.status(404).send({ message: 'Coordinador no registrado' });
            }
        }
    });

}

function consultarContra(req, res) {
    // var coordinadorId = req.params.id;
    var params = req.body;
    var contra = params.contra;
    // console.log(params._id);

    Coordinador.findById(params._id).exec((err, coordinador) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!coordinador) {
                res.status(404).send({ message: `Coordinador no registrado` });
            } else {
                bcrypt.compare(contra, coordinador.contra, (err, check) => {
                    if (check) {
                        res.status(200).send({ coordinador });
                    } else {
                        res.status(200).send({
                            message: 'La contraseña ingresada no es correcta'
                        });
                    }
                });
            }
        }
    });

}

function cambiarContra(req, res) {
    var update = req.body;
    bcrypt.hash(update.contra, null, null, (err, hash) => {
        update.contra = hash;
        Coordinador.findByIdAndUpdate(update._id, update, { new: true }, (err, coordinadorUpdated) => {
            if (err) {
                res.status(500).send({ message: `Error al actualizar` });
            } else {
                if (!coordinadorUpdated) {
                    res.status(404).send({ message: `No se ha podido actualizar` });
                } else {
                    res.status(200).send({ coordinador: coordinadorUpdated });
                }
            }
        });
    });
}

module.exports = {
    addCoordinador,
    updateCoordinador,
    getCoordinadores,
    getCoordinador,
    login,
    consultarContra,
    cambiarContra
}