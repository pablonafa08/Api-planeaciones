'use strict'

const express = require('express')
const router = express.Router();
const PlaneacionDetalleCtrl = require('../controllers/detalle_planeacion');

router.post('/add', PlaneacionDetalleCtrl.addPlaneacionDetalle);
router.get('/all/:id', PlaneacionDetalleCtrl.getPlaneacionDetalleByPlan);
router.put('/update/:id', PlaneacionDetalleCtrl.updatePlaneacionDetalle);
router.delete('/delete/:id', PlaneacionDetalleCtrl.deletePlaneacionDetalle);

module.exports = router;