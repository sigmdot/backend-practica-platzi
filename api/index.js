const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');

const user = require('./components/user/network');
const auth = require('./components/auth/network');

const errors = require('../network/errors');
const swaggerUi = require('swagger-ui-express');


const app = express();

app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json');

//ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth);

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);

app.listen(config.api.port, ()=>{
    console.log('Api escuchando en el puerto', config.api.port);
});