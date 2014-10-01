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
//var index		= fs.readFileSync('../client/index.html', 'utf8');

//Controllers
var userCtrl 	= require('./server/controllers/user_controller.js');
var pageCtrl 	= require('./server/controllers/page_controller.js');

//Models
var User		= require('./server/models/user_model.js');

//Activate the database!
mongoose.connect(config.database.development);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
//app.use(expressJwt({ secret : config.secret }).unless({ path : ['/user/login'] }));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.get('/user', userCtrl.query);
app.get('/user/:id', userCtrl.get);
app.post('/user', userCtrl.save);
app.delete('/user/:id', userCtrl.delete);
app.post('/user/login', auth, userCtrl.login);

app.get('/page', pageCtrl.query);
app.get('/page/:id', pageCtrl.get);
app.post('/page', pageCtrl.save);

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