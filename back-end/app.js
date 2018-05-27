var morgan = require('morgan'),
	mysql = require('mysql'),
	express = require('express'),
	cors = require('cors'),
	bodyparser = require('body-parser'),
	jwt = require('jsonwebtoken'),
	//recapchar=require('express-recaptcha'),
	md5 = require('md5');

var loginCtrl = require('./apiControllers/loginController'),
	userCtrl = require('./apiControllers/userController'),
	adminCtr = require('./apiControllers/adminController'),
	constants = require('./fn/const'),
	fnCheckToken = require('./fn/checkToken');

var app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.json({mess: "Welcome to my page"});
});


app.use('/login', loginCtrl);
app.use('/admin', adminCtr);
//app.use('/',userCtrl);
app.use('/Signup',userCtrl);
app.use('/',userCtrl);
//app.use(vadication());
//app.use(recapchar());
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));


app.listen(3000, () => {
	console.log('API is runnung on port 3000');
});