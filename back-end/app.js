var morgan = require('morgan'),
	express = require('express'),
	cors = require('cors'),
	bodyparser = require('body-parser'),
	jwt = require('jsonwebtoken'),
	//recapchar=require('express-recaptcha'),
	md5 = require('md5');

var loginCtrl = require('./apiControllers/loginController'),
	userCtrl = require('./apiControllers/userController'),
	adminCtr = require('./apiControllers/adminController'),
	sanPhamCtrl = require('./apiControllers/sanPhamController'),
	nguoibanCtrl = require('./apiControllers/nguoibanController'),
	constants = require('./fn/const'),
	infoCtrl=require('./apiControllers/infoController'),
	fnCheckToken = require('./fn/checkToken');

var app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.json({mess: "Welcome to my page"});
});

//Hòa thực hiện chức năng quản lý hồ sơ cá nhân
app.use('/info',infoCtrl);
//
app.use('/login', loginCtrl);
app.use('/admin', adminCtr);
app.use('/Signup',userCtrl);
app.use('/sanpham', sanPhamCtrl);
app.use('/',userCtrl);
//app.use(vadication());
//app.use(recapchar());
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));


//huyNguyen
app.use('/nguoiban', nguoibanCtrl);

app.listen(3000, () => {
	console.log('API is runnung on port 3000');
});