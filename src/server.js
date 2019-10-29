const http = require('http');
const socketIO = require('socket.io');
const app = require('./app')

const server = http.Server(app);

const io = socketIO(server);

server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 60);

const players = {};
io.on('connection', function(socket) {
  socket.on('new player', function() {
    players[socket.id] = {
      x: 300,
      y: 300
    };
  });

  socket.on('player quit', function() {
    delete players[socket.id]
  });

  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }
  });
});
