'use strict'
//modulos
const bcrypt = require('bcrypt-nodejs');

//modelo
const Tarea = require('../models/tareas');


//acciones

function addTarea(req, res) {
    var tarea = new Tarea();
    var params = req.body;

    tarea.planeacion = params.planeacion;
    tarea.tarea = params.tarea;
    tarea.instrucciones = params.instrucciones;

    tarea.save((err, tareaStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar la tarea` })
        } else {
            if (!tareaStored) {
                res.status(404).send({ message: `No se pudo guardar la tarea` });
            } else {
                res.status(200).send({ tarea: tareaStored });
            }
        }
    });

}

function updateTarea(req, res) {
    var tareaId = req.params.id;
    var update = req.body;

    Tarea.findByIdAndUpdate(tareaId, update, { new: true }, (err, tareaUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!tareaUpdated) {
                res.status(404).send({ message: `No se ha podido actualizar` });
            } else {
                res.status(200).send({ tarea: tareaUpdated });
            }
        }
    });
}

function getTareasByPlan(req, res) {
    var planeacionId = req.params.id;

    Tarea.find({ planeacion: planeacionId }).exec((err, allTareas) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allTareas) {
                res.status(404).send({ message: `No hay tareas` });
            } else {
                res.status(200).send({ tareas: allTareas });
            }
        }
    });
}


function deleteTarea(req, res) {
    var tareaId = req.params.id;

    Tarea.findByIdAndDelete(tareaId, (err, tareaDeleted) => {
        if (err) {
            res.status(500).send({ message: `Error al eliminar` });
        } else {
            if (!tareaDeleted) {
                res.status(404).send({ message: `No se ha podido eliminar` });
            } else {
                res.status(200).send({ tarea: tareaDeleted });
            }
        }
    });
}

module.exports = {
    addTarea,
    getTareasByPlan,
    updateTarea,
    deleteTarea
}