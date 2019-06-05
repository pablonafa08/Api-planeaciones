'use strict'

const express = require('express')
const router = express.Router();
const bibliografiaCtrl = require('../controllers/bibliografia');

router.post('/add', bibliografiaCtrl.addBibliografia);
router.get('/all/:id', bibliografiaCtrl.getBibliografiaByPlan);
router.put('/update/:id', bibliografiaCtrl.updateBibliografia);
router.delete('/delete/:id', bibliografiaCtrl.deleteBibliografia);

// router.get('/getone/:id', carreraCtrl.getCarrera);

module.exports = router;