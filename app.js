'use strict';

//loading information from
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors');

app.use(express.static(path.join('public')));
app.use(bodyParser.json());
app.use(cors());
const verify = require('./api/controllers/validation.js');

var config = {
  appRoot: __dirname // required config
};

// app.use('/flight', verify.middlewareVerify);

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port, () => {
    console.log('listening on port ' + port);
  });

  // if (swaggerExpress.runner.swagger.paths['/hello']) {
  //   console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  // }
});

module.exports = app; // for testing
