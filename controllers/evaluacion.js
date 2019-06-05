'use strict'

//modulos

//modelos
const Evaluacion = require('../models/evaluacion');
const Horarios = require('../models/horario');

function addEvaluacion(req, res) {
    var evaluacion = new Evaluacion();
    var params = req.body;

    evaluacion.maestro = params.maestro;
    evaluacion.materia = params.materia;
    evaluacion.grupo = params.grupo;
    evaluacion.tema = params.tema;
    evaluacion.estrategias = params.estrategias;
    evaluacion.fecha = params.fecha;
    evaluacion.estatus = params.estatus;

    if (params.asistencia == "true") {
        evaluacion.asistencia = true;
    } else {
        evaluacion.asistencia = false;
    }
    //evaluacion.asistencia = params.asistencia;
    //ciclo

    Evaluacion.findOne({ fecha: params.fecha, estatus: 'A', maestro: params.maestro, materia: params.materia }).exec((err, issetgrupo) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la petición` });
        } else {
            if (!issetgrupo) {

                evaluacion.save((err, grupoStored) => {
                    if (err) {
                        res.status(500).send({ message: `Error al guardar evaluación ` });
                    } else {
                        if (!grupoStored) {
                            res.status(404).send({ message: `No se pudo guardar` });
                        } else {
                            res.status(200).send({ evaluacion: grupoStored });
                        }
                    }
                });
            } else {
                res.status(404).send({ message: `Ya se evaluo el dia de hoy` });
            }
        }
    });

}

function getevaluacionesRealizadas(req, res) {
    var grupo = req.params.id;

    Evaluacion.find({ grupo: grupo, estatus: "A" }).populate({ path: 'maestro' }).populate({ path: 'materia' }).exec((err, allevaluacions) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allevaluacions) {
                res.status(404).send({ message: `No se pudo hacer la peticion` });
            } else {
                res.status(200).send({ evaluacions: allevaluacions });
            }
        }
    });
}

function getevaluacionesPendientes(req, res) {
    var grupo = req.params.id;
    var fecha = req.params.fecha;

    // Horarios.find({grupo: grupo}).exec((err,horarios)=>{
    //     if(err){
    //         res.status(500).send({message:'Error al hacer la peticion'});
    //     }else{
    //         if(!horarios){
    //             res.status(404)({message:'No se encontro la peticion'});
    //         }else{
    //             //res.status(200).send({horarios});
    //             // console.log(horarios[0].maestro);
    Evaluacion.find({ grupo: grupo, fecha: fecha }).populate({ path: 'maestro' }).populate({ path: 'materia' }).exec((err, allevaluacions) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allevaluacions) {
                res.status(404).send({ message: `No se pudo hacer la peticion` });
            } else {
                res.status(200).send({ evaluacions: allevaluacions });
            }
        }
    });
    //         }
    //     }
    // });

}

module.exports = {
    addEvaluacion,
    getevaluacionesRealizadas,
    getevaluacionesPendientes
}