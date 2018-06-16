var express = require('express');
var userRepo = require('../repos/userRepo');
var router = express.Router();
var axios = require('axios');

//Capchar
// var Recaptcha=require('express-recaptcha');

// var recaptcha=new Recaptcha('6LfmFVoUAAAAAJMZ1xUKr7VwZNM2ATGiRlC-8BtD','6LfmFVoUAAAAAO221CXMnOdhP_rCazwUWaHJYhqg');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

// app.use(express.static(pub));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');

// app.post('/Signup', function(req, res){
//     recaptcha.verify(req, function(error, data){
//         if(!error)
//             //success code
//         else
//             //error code
//     });
// });
// end capchar

router.get('/', (req, res) => {
	userRepo.loadAll().then(rows => {
		res.json(rows);
	}).catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.end('View error log on console.');
	});
});

router.post('/Signup', (req, res) => {
	var secret = '6LdIoVoUAAAAAF7rtLgBGq_KTuARALa6wh83pr7r';
	var captcha_response = req.body.captcha_response;

	var url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captcha_response}`;

	var userID = 1;
	axios.post(url, {
	}, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
			}
		})
		.then(function (response) {

			res.json(response.data);
			if (response.data) {

				userRepo.selectUser_ID().then(rows => {
					if (rows.length > 0) {
						userID = rows[0].maxID;
					}
				}).catch(err => {
					console.log(err);
					res.statusCode = 500;
					res.json('error');
				});
				var userName = req.body.user;
				userRepo.checkUser(userName).then(rows => {
					if (rows.length > 0) {
						res.statusCode = 500;
						res.json('error');
					} else {
						userRepo.add(req.body).then(insertID => {
							res.statusCode = 201;

							res.json(req.body);

							res.json({ mess: "Them thanh cong" });

						})
							.catch(err => {
								console.log(err);
								res.statusCode = 500;
								res.end();
							});
						userRepo.addLogin(req.body, userID + 1);
					}
				});

			}

		})
		.catch(function (error) {
			res.end('fail');
		});
});

router.post('/xinban', (req, res) => {
	userRepo.loadUserXinBan(req.body.userID).then(rows => {
		console.log(rows.length);
		if (rows.length == 0) {
			userRepo.xinban(req.body)
				.then(insertId => {
					var poco = {
						xinBan: insertId
					}
					res.statusCode = 201;
					res.json(poco);
				})
				.catch(err => {
					console.log(err);
					res.statusCode = 500;
					res.json(err);
				});
		}
		else{
			userRepo.updateUserXinBan(req.body.userID)
			.then(insertId => {
				var poco = {
					xinBan: insertId
				}
				res.statusCode = 201;
				res.json(poco);
			})
			.catch(err => {
				console.log(err);
				res.statusCode = 500;
				res.json(err);
			});
		}
	})

});

module.exports = router;