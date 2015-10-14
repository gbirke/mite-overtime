// A small app to display static pages
var path    = require('path');
var express = require('express');
var morgan  = require('morgan');

var app = express();
app.set('port', (process.env.PORT || 8080));
app.use(morgan("dev"));
app.use('/', express.static(path.join(__dirname, 'web')));
app.listen(app.get('port'), function() {
  console.log('Server started at: http://localhost:' + app.get('port') + '/');
});
