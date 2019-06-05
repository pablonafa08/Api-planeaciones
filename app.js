'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

//rutas
const carrerasRoutes = require('./routes/carrera');
const horariosRoutes = require('./routes/horario');
const gruposRoutes = require('./routes/grupo');
const evaluacionRoutes = require('./routes/evaluacion');
const coordinadoresRoutes = require('./routes/coordinador');
const maestrosRoutes = require('./routes/maestros');
const jefesRoutes = require('./routes/jefes');
const materiasRoutes = require('./routes/materias');
const cicloRoutes = require('./routes/ciclo');
const relacionRoutes = require('./routes/rel_mae_mat');
const planeacionRoutes = require('./routes/planeacion');
const planeacionDetalleRoutes = require('./routes/detalle_planeacion');
const tareaRoutes = require('./routes/tareas');
const lecturaRoutes = require('./routes/lectura');
const bibliografiaRoutes = require('./routes/bibliografia');

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).send({ message: `Hola mundo` });
});

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Anthoriztion, X-API-KEY, Origin, X-Requested-Whith, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//ruteo
app.use('/carreras', carrerasRoutes);
app.use('/horarios', horariosRoutes);
app.use('/grupos', gruposRoutes);
app.use('/evaluaciones', evaluacionRoutes);
app.use('/coordinadores', coordinadoresRoutes);
app.use('/maestros', maestrosRoutes);
app.use('/jefes', jefesRoutes);
app.use('/materias', materiasRoutes);
app.use('/ciclos', cicloRoutes);
app.use('/relaciones', relacionRoutes);
app.use('/planeaciones', planeacionRoutes);
app.use('/detalleplaneacion', planeacionDetalleRoutes);
app.use('/tareas', tareaRoutes);
app.use('/lecturas', lecturaRoutes);
app.use('/bibliografias', bibliografiaRoutes);

module.exports = app;