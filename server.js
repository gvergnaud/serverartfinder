var server={
    init : function(){

        this.http = require('http');

        this.server = http.createServer(function(req, res) {
          res.writeHead(200);
          res.end('yoyo');
        });

        this.server.set('origins', '*:*');
        
        this.server.listen(80);

        this.io = require('socket.io');
        
        this.io.listen(server);

        this.io.on('connection',this.listen);
    },

    listen : function(socket){

        socket.on('postsChanged', function(){
            console.log('postsChanged');
            socket.broadcast.emit('refreshPosts');
        });
    }
};
server.init();