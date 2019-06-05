'use strict'

//modulos
const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');
const jwt = require('../services/jwt');
//modelos
const Grupo = require('../models/grupo');

function addgrupo(req, res) {
    var grupo = new Grupo();
    var params = req.body;

    grupo.descripcion = params.descripcion;
    grupo.carrera = params.carrera;
    grupo.estatus = params.estatus;

    Grupo.findOne({ descripcion: params.descripcion, carrera: params.carrera }).exec((err, issetgrupo) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la busqueda` });
        } else {
            if (!issetgrupo) {

                grupo.save((err, grupoStored) => {
                    if (err) {
                        res.status(500).send({ message: `Error al guardar al grupo ` });
                    } else {
                        if (!grupoStored) {
                            res.status(404).send({ message: `No se pudo guardar` });
                        } else {
                            res.status(200).send({ grupo: grupoStored });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: `El grupo ya existe` });
            }
        }
    });

}

function updateGrupo(req, res) {
    var grupoId = req.params.id;
    var update = req.body;

    Grupo.findByIdAndUpdate(grupoId, update, { new: true }, (err, grupoUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!grupoUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ grupo: grupoUpdated });
            }
        }
    });
}

function getGruposByCarrera(req, res) {
    var carreraId = req.params.id;
    Grupo.find({ estatus: 'A', carrera: carreraId }).populate({ path: 'carrera' }).exec((err, allgrupos) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allgrupos) {
                res.status(404).send({ message: `No se pudo hacer la peticion` });
            } else {
                res.status(200).send({ grupos: allgrupos });
            }
        }
    });
}

function getGrupo(req, res) {
    var grupoId = req.params.id;

    Grupo.findById(grupoId).populate({ path: 'carrera' }).exec((err, grupo) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!grupo) {
                res.status(404).send({ message: `No se pudo hacer la peticion` });
            } else {
                res.status(200).send({ grupo });
            }
        }
    });
}

module.exports = {
    addgrupo,
    updateGrupo,
    getGruposByCarrera,
    getGrupo
}