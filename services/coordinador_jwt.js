'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = '1estanoesunaclave2';
exports.createToken = function(coordinador) {
    var payload = {
        sub: coordinador._id,
        nombres: coordinador.nombres,
        app: coordinador.app,
        apm: coordinador.apm,
        correo: coordinador.correo,

        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
};