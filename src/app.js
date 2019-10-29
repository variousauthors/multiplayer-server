const express = require('express');
const path = require('path');

const app = express();

app.set('port', 5000);

app.use('/', express.static(__dirname + '/'));// Routing

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});// Starts the server.

module.exports = app