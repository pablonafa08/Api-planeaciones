'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'bienvenido-al-infierno-muggle';

exports.createToken = function(jefe) {
    var payload = {
        sub: jefe._id,
        nombres: jefe.nombres,
        app: jefe.app,
        apm: jefe.apm,
        correo: jefe.correo,
        carrera: jefe.carrera,
        tel: jefe.tel,
        grupo: jefe.grupo,
        estatus: jefe.estatus,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);
};