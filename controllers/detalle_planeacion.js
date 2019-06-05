'use strict'
//modulos
const bcrypt = require('bcrypt-nodejs');

//modelo
const PlaneacionDetalle = require('../models/detalle_planeacion');


//acciones

function addPlaneacionDetalle(req, res) {
    var planeacionDetalle = new PlaneacionDetalle();
    var params = req.body;

    planeacionDetalle.planeacion = params.planeacion;
    planeacionDetalle.fecha = params.fecha;
    planeacionDetalle.semana = params.semana;
    planeacionDetalle.contenido_tematico = params.contenido_tematico;
    planeacionDetalle.act_docente = params.act_docente;
    planeacionDetalle.tiempo_act_docente = params.tiempo_act_docente;
    planeacionDetalle.act_aprendizaje = params.act_aprendizaje;
    planeacionDetalle.tiempo_act_aprendizaje = params.tiempo_act_aprendizaje;
    planeacionDetalle.recursos = params.recursos;
    planeacionDetalle.productos_desemp = params.productos_desemp;
    planeacionDetalle.observaciones = params.observaciones;


    planeacionDetalle.save((err, planeacionDetalleStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar la planeacion` })
        } else {
            if (!planeacionDetalleStored) {
                res.status(404).send({ message: `No se pudo guardar la planeacion` });
            } else {
                res.status(200).send({ planeacion: planeacionDetalleStored });
            }
        }
    });

}

function updatePlaneacionDetalle(req, res) {
    var planeacionDetalleId = req.params.id;
    var update = req.body;

    PlaneacionDetalle.findByIdAndUpdate(planeacionDetalleId, update, { new: true }, (err, planeacionDetalleUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!planeacionDetalleUpdated) {
                res.status(404).send({ message: `No se ha podido actualizar` });
            } else {
                res.status(200).send({ planeacion: planeacionDetalleUpdated });
            }
        }
    });
}

function getPlaneacionDetalleByPlan(req, res) {
    var planeacionId = req.params.id;

    PlaneacionDetalle.find({ planeacion: planeacionId }).exec((err, allPlaneacionDetalle) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allPlaneacionDetalle) {
                res.status(404).send({ message: `No hay secuencia de actividades` });
            } else {
                res.status(200).send({ planeaciones: allPlaneacionDetalle });
            }
        }
    });
}

function deletePlaneacionDetalle(req, res) {
    var planeacionDetalleId = req.params.id;

    PlaneacionDetalle.findByIdAndDelete(planeacionDetalleId, (err, planeacionDetalleDeleted) => {
        if (err) {
            res.status(500).send({ message: `Error al eliminar` });
        } else {
            if (!planeacionDetalleDeleted) {
                res.status(404).send({ message: `No se ha podido eliminar` });
            } else {
                res.status(200).send({ planeacion: planeacionDetalleDeleted });
            }
        }
    });
}


module.exports = {
    addPlaneacionDetalle,
    updatePlaneacionDetalle,
    getPlaneacionDetalleByPlan,
    deletePlaneacionDetalle
}