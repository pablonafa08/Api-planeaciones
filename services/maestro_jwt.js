'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = '1estanoesunaclave2';
exports.createToken = function(maestro) {
    var payload = {
        sub: maestro._id,
        nombres: maestro.nombres,
        app: maestro.app,
        apm: maestro.apm,
        correo: maestro.correo,

        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
};