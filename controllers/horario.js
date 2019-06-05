'use strict'

//modulos
const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');
const jwt = require('../services/jwt');
//modelos
const Horario = require('../models/horario');

function addHorario(req, res) {
    var horario = new Horario();
    var params = req.body;

    horario.hora = params.hora;
    horario.ciclo = params.ciclo;
    horario.semestre = params.semestre;
    horario.maestro = params.maestro;
    horario.materia = params.materia;
    horario.grupo = params.grupo;
    horario.estatus = params.estatus;

    Horario.findOne({ maestro: params.maestro, hora: params.hora, ciclo: params.ciclo }).exec((err, issetHorario) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la busqueda` });
        } else {
            if (!issetHorario) {
                Horario.findOne({ grupo: params.grupo, hora: params.hora, ciclo: params.ciclo }).exec((err, issetHorario2) => {
                    if (!issetHorario2) {
                        // res.status(200).send({ message: `guardado1` });
                        horario.save((err, HorarioStored) => {
                            if (err) {
                                res.status(500).send({ message: `Error al guardar al Horario ` });
                            } else {
                                if (!HorarioStored) {
                                    res.status(404).send({ message: `No se pudo guardar` });
                                } else {
                                    res.status(200).send({ Horario: HorarioStored });
                                }
                            }
                        });
                    } else {
                        res.status(200).send({ message: `El grupo ya tiene maestro a esa hora` });
                    }
                });

            } else {
                res.status(200).send({ message: `El maestro ya tiene un grupo a esa hora` });
            }
        }
    });

}

function getHorarios(req, res) {
    var grupo = req.params.id;
    var ciclo = req.params.ciclo;
    Horario.find({ grupo: grupo, ciclo: ciclo }).populate({ path: 'maestro' }).populate({ path: 'materia' }).exec((err, allHorarios) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la peticion` });
        } else {
            if (!allHorarios) {
                res.status(404).send({ message: `No se pudo hacer la peticion` });
            } else {
                res.status(200).send({ Horarios: allHorarios });
            }
        }
    });
}

function deleteHorario(req, res) {
    var horarioid = req.params.id;
    Horario.findByIdAndDelete(horarioid, (err, horarioDeleted) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la eliminación` });
        } else {
            if (!horarioDeleted) {
                res.status(404).send({ message: `No se pudo hacer la eliminación` });
            } else {
                res.status(200).send({ horario: horarioDeleted });
            }
        }
    });
}


module.exports = {
    addHorario,
    getHorarios,
    deleteHorario
}