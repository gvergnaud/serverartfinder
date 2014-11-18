var server={
    init : function(){

        var express = require('express');

        var app = express();

        app.get('/', function(req, res) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end('artfinder sockets server');
        });

        app.listen(80);

        this.io = require('socket.io').listen(3000);

        this.io.on('connection', this.listen);
    },

    listen : function(socket){

        socket.on('postsChanged', function(){
            console.log('postsChanged');
            socket.broadcast.emit('refreshPosts');
        });
    }
};
server.init();