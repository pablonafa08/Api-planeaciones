'use strict'

const express = require('express')
const router = express.Router();
const cicloCtrl = require('../controllers/ciclo');

router.post('/add', cicloCtrl.addCiclo);
router.put('/update/:id', cicloCtrl.updateCiclo);
router.get('/getone/:id', cicloCtrl.getCiclo);
router.get('/all', cicloCtrl.getCiclos);

module.exports = router;