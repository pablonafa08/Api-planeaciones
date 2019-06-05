'use strict'

const express = require('express')
const router = express.Router();
const grupoCtrl = require('../controllers/grupo');

router.post('/add', grupoCtrl.addgrupo);
router.put('/update/:id', grupoCtrl.updateGrupo);
router.get('/getone/:id', grupoCtrl.getGrupo);
router.get('/allbycarrera/:id', grupoCtrl.getGruposByCarrera);

module.exports = router;