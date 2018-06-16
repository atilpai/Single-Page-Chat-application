// server.js
var app = require('./app');
var socket = require('http').createServer();
var port = process.env.PORT || 3000;
let io = require('socket.io')(socket, {path: '/'});
var User = require('./user/User');

socket.listen(3001);
var activeRooms=[];

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);

  io.on('connection', function(socket){
  	 // console.log('SocketId['+socket.id+'] connected');

  	 socket.on('room-info', function(data) { // listen for fromClient userInfo
          socket.join(data.roomName);
          activeRooms.push(data.roomName);
          socket.join(data.roomName2);
          activeRooms.push(data.roomName);
          console.log('Added rooms : '+data.roomName+' and '+data.roomName2);
  	 });

  	 socket.on('message', function(data){
        User.update({
            username : data.sender
        }, 
        { $push: { messages: {content: data.content, receiver: data.receiver, sender: data.sender} } },
        function (err, user) {
            if (err) console.log('There was a problem accessing the information to the database.');
            console.log('Mongo message add success');
        });

        User.update({
            username : data.receiver
        }, 
        { $push: { messages: {content: data.content, receiver: data.receiver, sender: data.sender} } },
        function (err, user) {
            if (err) console.log('There was a problem accessing the information to the database.');
            console.log('Mongo message add success');
        });
  	   console.log(data.sender+" just messaged "+data.receiver);
       socket.broadcast.in(data.sender+data.receiver).emit('nextMessage', {content: data.content, sender: data.sender, receiver: data.receiver});
       // socket.broadcast.in(data.receiver+data.sender).emit('nextMessage', {content: data.content, sender: data.sender, receiver: data.receiver});
  	 });
  })

});