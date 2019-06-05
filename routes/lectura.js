'use strict'

const express = require('express')
const router = express.Router();
const lecturaCtrl = require('../controllers/lectura');

router.post('/add', lecturaCtrl.addLectura);
router.get('/all/:id', lecturaCtrl.getLecturasByPlan);
router.put('/update/:id', lecturaCtrl.updateLectura);
router.delete('/delete/:id', lecturaCtrl.deleteLectura);

// router.get('/getone/:id', carreraCtrl.getCarrera);


module.exports = router;