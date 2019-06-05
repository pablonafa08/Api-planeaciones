'use strict'

const express = require('express')
const router = express.Router();
const horarioCtrl = require('../controllers/horario');

router.post('/add', horarioCtrl.addHorario);
// router.put('/update/:id', horarioCtrl.updateCarrera);
router.get('/getbygrupo/:id/:ciclo', horarioCtrl.getHorarios);
router.delete('/delete/:id', horarioCtrl.deleteHorario);
// router.get('/all', horarioCtrl.getCarreras);

module.exports = router;