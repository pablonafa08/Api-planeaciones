'use strict'

const express = require('express');
const router = express.Router();
const maestrosCtrl = require('../controllers/maestros');

router.post('/add', maestrosCtrl.addMaestro);
router.put('/update/:id', maestrosCtrl.updateMaestro);
router.get('/all', maestrosCtrl.getMaestros);
router.get('/getone/:id', maestrosCtrl.getMaestro);
router.post('/login', maestrosCtrl.login);
router.post('/contra', maestrosCtrl.consultarContra);
router.post('/cambiarcontra', maestrosCtrl.cambiarContra);

module.exports = router;