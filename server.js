var server={
    init : function(){

        var http = require('http');
        var express = require('express'),
            app = express();

        var server = http.createServer(app);

        this.io = require('socket.io').listen(server);  //pass a http.Server instance
        
        server.listen(process.env.PORT);  //listen on port 3000 || process.env.PORT

        this.io.set('origins', '*:*');
        
        this.io.on('connection', this.listen);    
    },

    listen : function(socket){

        console.log('connection');

        socket.on('postsChanged', function(info){
            console.log('postsChanged');
            console.log(info);
            socket.broadcast.emit('refreshPosts', info);
        });

        socket.on('newPost', function(){
            console.log('newPost');
            socket.broadcast.emit('loadNewPost');
        });
    }
};
server.init();