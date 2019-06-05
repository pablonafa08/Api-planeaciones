'use strict'
//modulos
const bcrypt = require('bcrypt-nodejs');

//modelo
const Ciclo = require('../models/ciclo');


//acciones

function addCiclo(req, res) {
    var ciclo = new Ciclo();
    var params = req.body;

    ciclo.descripcion = params.descripcion;
    ciclo.estatus = params.estatus;
    ciclo.semestre1_inicio = params.semestre1_inicio;
    ciclo.semestre1_fin = params.semestre1_fin;
    ciclo.semestre2_inicio = params.semestre2_inicio;
    ciclo.semestre2_fin = params.semestre2_fin;
    ciclo.vac_semsanta_inicio = params.vac_semsanta_inicio;
    ciclo.vac_semsanta_fin = params.vac_semsanta_fin;

    Ciclo.findOne({ descripcion: ciclo.descripcion, estatus: 'A' }, (err, issetCiclo) => {
        if (err) {
            res.status(500).send({ message: `Error al comprobar existencia` });
        } else {
            if (!issetCiclo) {
                ciclo.save((err, cicloStored) => {
                    if (err) {
                        res.status(500).send({ message: `Error al guardar el ciclo` })
                    } else {
                        if (!cicloStored) {
                            res.status(404).send({ message: `No se pudo guardar el ciclo` });
                        } else {
                            res.status(200).send({ ciclo: cicloStored });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: `El ciclo ya existe` });
            }
        }
    });

}

function updateCiclo(req, res) {
    var cicloId = req.params.id;
    var update = req.body;

    Ciclo.findByIdAndUpdate(cicloId, update, { new: true }, (err, cicloUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!cicloUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ ciclo: cicloUpdated });
            }
        }
    });
}

function getCiclos(req, res) {
    Ciclo.find({ estatus: 'A' }).exec((err, allCiclos) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allCiclos) {
                res.status(404).send({ message: `No se pudo hacer la peticion` });
            } else {
                res.status(200).send({ ciclos: allCiclos });
            }
        }
    });
}

function getCiclo(req, res) {
    var cicloId = req.params.id;

    Ciclo.findById(cicloId).exec((err, ciclo) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!ciclo) {
                res.status(404).send({ message: `No se pudo hacer la peticion` });
            } else {
                res.status(200).send({ ciclo });
            }
        }
    });
}


module.exports = {
    addCiclo,
    updateCiclo,
    getCiclos,
    getCiclo
}