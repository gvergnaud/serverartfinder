var server={
    init : function(){

        var http = require('http');
        var express = require('express'),
            app = express();

        var server = http.createServer(app);

        this.io = require('socket.io').listen(server);  //pass a http.Server instance
        
        server.listen(80);  //listen on port 80

        this.io.set('origins', '*:*');
        
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