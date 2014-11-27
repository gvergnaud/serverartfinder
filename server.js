var server={
    init : function(){

        this.io = require('socket.io').listen(process.env.PORT);  //pass a http.Server instance
        
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