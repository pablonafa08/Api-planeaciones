'use strict'

const express = require('express');
const router = express.Router();
const jefesCtrl = require('../controllers/jefes');

router.post('/add', jefesCtrl.addJefe);
router.put('/update/:id', jefesCtrl.updateJefe);
router.get('/allbycarrera/:id', jefesCtrl.getJefes);
router.get('/getone/:id', jefesCtrl.getJefe);
router.get('/getone2/:id', jefesCtrl.getJefe2);
router.post('/login', jefesCtrl.login);

//viabilidad y trabajos por autor
module.exports = router;