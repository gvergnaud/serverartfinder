var server={
    init : function(){

        var http = require('http');

        this.server = http.createServer(function(req, res) {
            res.header("Access-Control-Allow-Origin", "*");
            res.writeHead(200);
            res.end('yoyo');
        });
        
        this.server.listen(3000);

        // this.io = require('socket.io');
        
        // this.io.listen(this.server);

        // this.io.on('connection',this.listen);
    },

    listen : function(socket){

        socket.on('postsChanged', function(){
            console.log('postsChanged');
            socket.broadcast.emit('refreshPosts');
        });
    }
};
server.init();