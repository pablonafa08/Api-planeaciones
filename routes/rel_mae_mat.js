'use strict'

const express = require('express')
const router = express.Router();
const relacionCtrl = require('../controllers/rel_mae_mat');

router.post('/add', relacionCtrl.addRelacion);
router.get('/getbymae/:id', relacionCtrl.getRelByIdMaestro);
router.get('/getbymat/:id', relacionCtrl.getRelByIdMateria);
router.put('/update/:id', relacionCtrl.updateRelacion);
// router.get('/getbycarrera/:id', relacionCtrl.getRelByIdCarrera);
router.get('/all', relacionCtrl.getRelaciones);

module.exports = router;