'use strict'

const express = require('express');
const router = express.Router();
const coordinadorCtrl = require('../controllers/coordinador');

router.post('/add', coordinadorCtrl.addCoordinador);
router.put('/update/:id', coordinadorCtrl.updateCoordinador);
router.get('/all', coordinadorCtrl.getCoordinadores);
router.get('/getone/:id', coordinadorCtrl.getCoordinador);
router.post('/login', coordinadorCtrl.login);
router.post('/contra', coordinadorCtrl.consultarContra);
router.post('/cambiarcontra', coordinadorCtrl.cambiarContra);

module.exports = router;