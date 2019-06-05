'use strict'

//modulos
const bcrypt = require('bcrypt-nodejs');

//modelos
const Maestro = require('../models/maestros');

//servicio jwt
const jwt = require('../services/maestro_jwt');

//acciones


function addMaestro(req, res) {
    var maestro = new Maestro();
    var params = req.body;

    maestro.nombres = params.nombres;
    maestro.app = params.app;
    maestro.apm = params.apm;
    maestro.correo = params.correo;
    maestro.contra = params.contra;
    maestro.estatus = params.estatus;

    Maestro.findOne({ correo: maestro.correo }, (err, issetMaestro) => {
        if (err) {
            res.status(500).send({ message: `No se pudo realizar la busqueda` });
        } else {
            if (!issetMaestro) {
                bcrypt.hash(params.contra, null, null, (err, hash) => {
                    maestro.contra = hash;
                    maestro.save((err, maestroStored) => {
                        if (err) {
                            res.status(500).send({ message: `Error al guardar el maestro` });
                        } else {
                            if (!maestroStored) {
                                res.status(404).send({ message: `No se pudo guardar el maestro` });
                            } else {
                                res.status(200).send({ maestro: maestroStored });
                            }
                        }
                    });
                });
            } else {
                res.status(404).send({ message: `El correo ya existe` });
            }
        }
    });

}

function updateMaestro(req, res) {
    var maestroId = req.params.id;
    var update = req.body;

    Maestro.findByIdAndUpdate(maestroId, update, { new: true }, (err, maestroUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!maestroUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ maestro: maestroUpdated });
            }
        }
    });
}

function getMaestros(req, res) {
    Maestro.find({ estatus: 'A' }).exec((err, allMaestros) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allMaestros) {
                res.status(404).send({ message: `No hay maestros` });
            } else {
                res.status(200).send({ maestros: allMaestros });
            }
        }
    });
}

function getMaestro(req, res) {
    var maestroId = req.params.id;

    Maestro.findById(maestroId, (err, maestro) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!maestro) {
                res.status(404).send({ message: `No se pudo realizar la peticion` });
            } else {
                res.status(200).send({ maestro });
            }
        }
    });
}

function login(req, res) {
    var params = req.body;
    var correo = params.correo;
    var contra = params.contra;

    Maestro.findOne({ correo: correo }, (err, maestro) => {
        if (err) {
            res.status(500).send({ message: 'Error al comprobar el maestro' });
        } else {
            if (maestro) {
                bcrypt.compare(contra, maestro.contra, (err, check) => {
                    if (check) {
                        //comprobar y generar token
                        if (params.gettoken) {
                            res.status(200).send({
                                token: jwt.createToken(maestro)
                            });
                        } else {
                            res.status(200).send({ maestro });
                        }
                    } else {
                        res.status(404).send({
                            message: 'La contraseña ingresada no es correcta'
                        });
                    }
                });
                //res.status(200).send({user});
            } else {
                res.status(404).send({ message: 'Maestro no registrado' });
            }
        }
    });

}

function consultarContra(req, res) {
    // var coordinadorId = req.params.id;
    var params = req.body;
    var contra = params.contra;
    // console.log(params._id);

    Maestro.findById(params._id).exec((err, maestro) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!maestro) {
                res.status(404).send({ message: `Maestro no registrado` });
            } else {
                bcrypt.compare(contra, maestro.contra, (err, check) => {
                    if (check) {
                        res.status(200).send({ maestro });
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
        Maestro.findByIdAndUpdate(update._id, update, { new: true }, (err, maestroUpdated) => {
            if (err) {
                res.status(500).send({ message: `Error al actualizar` });
            } else {
                if (!maestroUpdated) {
                    res.status(404).send({ message: `No se ha podido actualizar` });
                } else {
                    res.status(200).send({ maestro: maestroUpdated });
                }
            }
        });
    });
}

module.exports = {
    addMaestro,
    updateMaestro,
    getMaestros,
    getMaestro,
    login,
    consultarContra,
    cambiarContra
}