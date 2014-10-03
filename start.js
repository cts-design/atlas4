var fs 			= require('fs');
var http 		= require('http');
var https 		= require('https');
var privateKey 	= fs.readFileSync('./server/ssl/private.key', 'utf8');
var certificate = fs.readFileSync('./server/ssl/ssl.crt', 'utf8');
var cred 		= { key : privateKey, cert : certificate };
var express 	= require('express');
var app 		= express();
var httpServer 	= http.createServer(app);
var httpsServer = https.createServer(cred, app);
var cors 		= require('cors');
var bodyParser 	= require('body-parser');
var mongoose	= require('mongoose');
var expressJwt 	= require('express-jwt');
var config		= require('./config.json');
var api			= express.Router();
//var index		= fs.readFileSync('../client/index.html', 'utf8');

//Activate the database!
mongoose.connect(config.database.development);

//Controllers
var userCtrl 	= require('./server/controllers/user_controller.js');
var pageCtrl 	= require('./server/controllers/page_controller.js');

require('./server/controllers/template_controller.js')(api);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
//app.use(expressJwt({ secret : config.secret }).unless({ path : ['/user/login'] }));
app.use('/api/v1', api);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

api.get('/user', userCtrl.query);
api.get('/user/:id', userCtrl.get);
api.post('/user', userCtrl.save);
api.delete('/user/:id', userCtrl.delete);
api.post('/user/login', auth, userCtrl.login);

api.get('/page/:id', pageCtrl.get);
api.get('/page', pageCtrl.query);
api.post('/page', pageCtrl.save);
api.delete('/page/:id', pageCtrl.delete);


function auth(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	if(!username && !password) {
		res.status(400).end('Must provide a username and password');
	}

	if(username !== 'root' && password !== 'admin') {
		res.status(401).end('Username or password invalid');
	}

	next();
}

httpServer.listen(7000);
httpsServer.listen(8000, '0.0.0.0');

//adding ghost

var ghost = require('ghost');
ghost().then(function(ghostServer){
    ghostServer.start();
});
