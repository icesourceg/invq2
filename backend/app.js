const express = require('express');
const path = require("path")
const app = express();
const env = require('dotenv').config();
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);
const routes = require('./routes');




app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: true}));

app.set('view engine', 'ejs');
app.set('socketio', io);

// Set the default views directory to html folder
app.set('views', path.join(__dirname, 'html'))

// Set the folder for css & java scripts
console.log( express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'./public')));

// Set the folder for specific modules to be used on views
//app.use('/modules/socket.io', express.static(path.join(__dirname,'node_modules/socket.io-client/dist/')));
routes(app);


const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log('server listening on port ' + port);
});
