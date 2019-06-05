'use strict'

const express = require('express')
const router = express.Router();
const planeacionCtrl = require('../controllers/planeacion');

router.post('/add', planeacionCtrl.addPlaneacion);
router.get('/getbymat/:id', planeacionCtrl.getPlanByIdMateria);
router.put('/update/:id', planeacionCtrl.updatePlaneacion);
router.get('/getone/:id', planeacionCtrl.getPlaneacion);
router.get('/getbyciclo/:id', planeacionCtrl.getPlanByIdCiclo);
router.get('/getbyciclobycar/:id', planeacionCtrl.getPlanByIdCicloByCarrera);
router.get('/getbymatbyciclo/:id/:ciclo', planeacionCtrl.getPlanByIdMateriaByCiclo);
// router.get('/all', carreraCtrl.getCarreras);

module.exports = router;