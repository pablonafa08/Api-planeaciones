'use strict'

const express = require('express')
const router = express.Router();
const evaluacionCtrl = require('../controllers/evaluacion');

router.post('/add', evaluacionCtrl.addEvaluacion);
// router.put('/update/:id', grupoCtrl.updateCarrera);
// router.get('/getone/:id', grupoCtrl.getCarrera);
router.get('/allR/:id', evaluacionCtrl.getevaluacionesRealizadas);
router.get('/allP/:id/:fecha', evaluacionCtrl.getevaluacionesPendientes);

module.exports = router;