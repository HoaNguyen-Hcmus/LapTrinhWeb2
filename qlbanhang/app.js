var morgan = require('morgan'),
	mysql = require('mysql'),
	express = require('express'),
	cors = require('cors'),
	bodyparser = require('body-parser'),
	jwt = require('jsonwebtoken'),
	md5 = require('md5');


var loginCtrl = require('./apiControllers/loginController');

var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.json());


app.get('/', (req, res) => {
	res.json({mess: "Welcome to my page"});
});


app.use('/login', loginCtrl);

app.listen(3000, () => {
	console.log('API is runnung on port 3000');
});