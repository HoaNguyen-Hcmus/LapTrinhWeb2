var morgan = require('morgan'),
	mysql = require('mysql'),
	express = require('express'),
	cors = require('cors'),
	bodyparser = require('body-parser'),
	jwt = require('jsonwebtoken'),
//<<<<<<< HEAD
	md5 = require('md5');


var loginCtrl = require('./apiControllers/loginController');

var app = express();

//=======
	//vadication=require('jquery-validation'),
	recapchar=require('express-recaptcha'),
	md5 = require('md5');


var app = express();

// Hòa - đăng kí
var userCtrl=require('./1560202-Hoa/userController');

///

//>>>>>>> NguyenHoa
app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.json());


//<<<<<<< HEAD
app.get('/', (req, res) => {
	res.json({mess: "Welcome to my page"});
});


app.use('/login', loginCtrl);
//=======

// app.get('/', (req, res) => {
// 	res.json({mess: "Welcome to my page"});
// });

// đăng kí - Hòa
app.use('/',userCtrl);
app.use('/Signup',userCtrl);
//app.use(vadication());
//app.use(recapchar());
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));
//-------
//>>>>>>> NguyenHoa

app.listen(3000, () => {
	console.log('API is runnung on port 3000');
});