'use strict'

const express = require('express')
const router = express.Router();
const carreraCtrl = require('../controllers/carrera');

router.post('/add', carreraCtrl.addCarrera);
router.put('/update/:id', carreraCtrl.updateCarrera);
router.get('/getone/:id', carreraCtrl.getCarrera);
router.get('/all', carreraCtrl.getCarreras);

module.exports = router;