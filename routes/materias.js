'use strict'

const express = require('express');
const router = express.Router();
const materiasCtrl = require('../controllers/materias');

router.post('/add', materiasCtrl.addMateria);
router.put('/update/:id', materiasCtrl.updateMateria);
router.get('/all', materiasCtrl.getMaterias);
router.get('/getone/:id', materiasCtrl.getMateria);
router.get('/getbycarrera/:id', materiasCtrl.getMateriasByCarrera);

module.exports = router;