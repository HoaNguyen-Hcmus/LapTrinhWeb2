var morgan = require('morgan'),
	mysql = require('mysql'),
	express = require('express'),
	cors = require('cors'),
	bodyparser = require('body-parser');

var adminCtr = require('./controller/adminController'),
	constants = require('./fn/const'),
	fnCheckToken = require('./fn/checkToken');

var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.json());

app.use(express.static('public'));

app.use('/admin', adminCtr);

app.get('/', (req, res) => {
	res.json({mess: "Welcome to my page"});
});


app.listen(3000, () => {
	console.log('API is runnung on port 3000');
});