'use strict'
//modulos
const bcrypt = require('bcrypt-nodejs');

//modelo
const Bibliografia = require('../models/bibliografia');


//acciones

function addBibliografia(req, res) {
    var bibliografia = new Bibliografia();
    var params = req.body;

    bibliografia.planeacion = params.planeacion;
    bibliografia.descripcion = params.descripcion;

    bibliografia.save((err, bibliografiaStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar la bibliografia` })
        } else {
            if (!bibliografiaStored) {
                res.status(404).send({ message: `No se pudo guardar la bibliografia` });
            } else {
                res.status(200).send({ bibliografia: bibliografiaStored });
            }
        }
    });

}


function updateBibliografia(req, res) {
    var bibliografiaId = req.params.id;
    var update = req.body;

    Bibliografia.findByIdAndUpdate(bibliografiaId, update, { new: true }, (err, bibliografiaUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!bibliografiaUpdated) {
                res.status(404).send({ message: `No se ha podido actualizar` });
            } else {
                res.status(200).send({ bibliografia: bibliografiaUpdated });
            }
        }
    });
}

function getBibliografiaByPlan(req, res) {
    var planeacionId = req.params.id;

    Bibliografia.find({ planeacion: planeacionId }).exec((err, allBibliografias) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allBibliografias) {
                res.status(404).send({ message: `No hay bibliografias` });
            } else {
                res.status(200).send({ bibliografias: allBibliografias });
            }
        }
    });
}


function deleteBibliografia(req, res) {
    var bibliografiaId = req.params.id;

    Bibliografia.findByIdAndDelete(bibliografiaId, (err, bibliografiaDeleted) => {
        if (err) {
            res.status(500).send({ message: `Error al eliminar` });
        } else {
            if (!bibliografiaDeleted) {
                res.status(404).send({ message: `No se ha podido eliminar` });
            } else {
                res.status(200).send({ bibliografia: bibliografiaDeleted });
            }
        }
    });
}



module.exports = {
    addBibliografia,
    updateBibliografia,
    getBibliografiaByPlan,
    deleteBibliografia
}