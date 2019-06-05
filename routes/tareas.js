'use strict'

const express = require('express')
const router = express.Router();
const tareaCtrl = require('../controllers/tareas');

router.post('/add', tareaCtrl.addTarea);
router.get('/all/:id', tareaCtrl.getTareasByPlan);
router.put('/update/:id', tareaCtrl.updateTarea);
router.delete('/delete/:id', tareaCtrl.deleteTarea);
// router.get('/getone/:id', carreraCtrl.getCarrera);


module.exports = router;