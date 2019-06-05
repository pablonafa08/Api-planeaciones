'use strict'
const app = require('./app');
const mongoose = require('mongoose');


// mongoose.connect('mongodb://localhost:27017/planeacion', { useNewUrlParser: true }, (err) => {
//     if (!err) {
//         app.listen(3000, () => {
//             console.log('El servidor corre en el http://localhost:3000');
//         });
//     }
// });

app.set('port', process.env.PORT || 3000);

mongoose.connect('mongodb://udhkz3ocnyjaucvignrr:89UyiGT82S20qWOhUOK1@bbraklsjlcqqjve-mongodb.services.clever-cloud.com:27017/bbraklsjlcqqjve', { useNewUrlParser: true }, (err) => {
    if (!err) {
        app.listen(app.get('port'), () => {
            console.log(`El servidor corre en el http://localhost:${app.get('port')}`);
        });
    } else {
        console.log(err);
    }
});