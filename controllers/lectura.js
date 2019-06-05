'use strict'
//modulos
const bcrypt = require('bcrypt-nodejs');

//modelo
const Lectura = require('../models/lectura');


//acciones

function addLectura(req, res) {
    var lectura = new Lectura();
    var params = req.body;

    lectura.planeacion = params.planeacion;
    lectura.lectura = params.lectura;
    lectura.instrucciones = params.instrucciones;

    lectura.save((err, lecturaStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar la lectura` })
        } else {
            if (!lecturaStored) {
                res.status(404).send({ message: `No se pudo guardar la lectura` });
            } else {
                res.status(200).send({ lectura: lecturaStored });
            }
        }
    });

}


function updateLectura(req, res) {
    var lecturaId = req.params.id;
    var update = req.body;

    Lectura.findByIdAndUpdate(lecturaId, update, { new: true }, (err, lecturaUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!lecturaUpdated) {
                res.status(404).send({ message: `No se ha podido actualizar` });
            } else {
                res.status(200).send({ lectura: lecturaUpdated });
            }
        }
    });
}

function getLecturasByPlan(req, res) {
    var planeacionId = req.params.id;

    Lectura.find({ planeacion: planeacionId }).exec((err, allLecturas) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allLecturas) {
                res.status(404).send({ message: `No hay lecturas` });
            } else {
                res.status(200).send({ lecturas: allLecturas });
            }
        }
    });
}


function deleteLectura(req, res) {
    var lecturaId = req.params.id;

    Lectura.findByIdAndDelete(lecturaId, (err, lecturaDeleted) => {
        if (err) {
            res.status(500).send({ message: `Error al eliminar` });
        } else {
            if (!lecturaDeleted) {
                res.status(404).send({ message: `No se ha podido eliminar` });
            } else {
                res.status(200).send({ lectura: lecturaDeleted });
            }
        }
    });
}



module.exports = {
    addLectura,
    updateLectura,
    getLecturasByPlan,
    deleteLectura
}