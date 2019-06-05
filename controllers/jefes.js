'use strict'

//modulos
const bcrypt = require('bcrypt-nodejs');

const jwt = require('../services/jwt');
//modelos
const Jefe = require('../models/jefes');

//acciones

function addJefe(req, res) {
    var jefe = new Jefe();
    var params = req.body;

    jefe.nombres = params.nombres;
    jefe.app = params.app;
    jefe.apm = params.apm;
    jefe.carrera = params.carrera;
    jefe.correo = params.correo;
    jefe.contra = params.contra;
    jefe.tel = params.tel;
    jefe.grupo = params.grupo;
    jefe.estatus = params.estatus;

    Jefe.findOne({ correo: params.correo }, (err, issetJefe) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la busqueda` });
        } else {
            if (!issetJefe) {
                bcrypt.hash(params.contra, null, null, (err, hash) => {
                    jefe.contra = hash;
                    jefe.save((err, jefeStored) => {
                        if (err) {
                            res.status(500).send({ message: `Error al guardar al jefe de grupo` });
                        } else {
                            if (!jefeStored) {
                                res.status(404).send({ message: `No se pudo guardar` });
                            } else {
                                res.status(200).send({ jefe: jefeStored });
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

function updateJefe(req, res) {
    var jefeId = req.params.id;
    var update = req.body;

    Jefe.findByIdAndUpdate(jefeId, update, { new: true }, (err, jefeUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!jefeUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ jefe: jefeUpdated });
            }
        }
    });
}

function getJefes(req, res) {
    var carreraId = req.params.id;
    Jefe.find({ estatus: 'A', carrera: carreraId }).populate({ path: 'grupo' }).populate({ path: 'carrera' }).exec((err, allJefes) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allJefes) {
                res.status(404).send({ message: `No se pudo hacer la peticion` });
            } else {
                res.status(200).send({ jefes: allJefes });
            }
        }
    });
}

function getJefe2(req, res) {
    var jefeId = req.params.id;

    Jefe.findById(jefeId, (err, jefe) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!jefe) {
                res.status(404).send({ message: `No se pudo hacer la peticion` });
            } else {
                res.status(200).send({ jefe });
            }
        }
    });
}

function getJefe(req, res) {
    var jefeId = req.params.id;

    Jefe.findById(jefeId).populate({ path: 'grupo' }).exec((err, jefe) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!jefe) {
                res.status(404).send({ message: `No se pudo hacer la peticion` });
            } else {
                res.status(200).send({ jefe });
            }
        }
    });
}

function login(req, res) {
    var params = req.body;

    var correo = params.correo;
    var contra = params.contra;

    Jefe.findOne({ correo: correo.toLowerCase() }, (err, Jefe) => {
        if (err) {
            res.status(500).send({ error: true, message: `Ocurrio un error, intentarlo mas tarde` });
        } else {
            if (!Jefe) {
                res.status(404).send({ error: true, message: `El usuario no existe` });
            } else {
                bcrypt.compare(contra, Jefe.contra, (err, check) => {
                    if (check) {
                        if (params.gettoken) {
                            res.status(200).send({ Jefe, token: jwt.createToken(Jefe) });
                        } else {
                            Jefe.contra = "";
                            res.status(200).send({ Jefe, token: jwt.createToken(Jefe) });
                        }
                    } else {
                        res.status(404).send({ message: `La contraseña no es correcta` });
                    }
                });
            }
        }
    });
}

module.exports = {
    addJefe,
    updateJefe,
    getJefes,
    getJefe,
    getJefe2,
    login
}