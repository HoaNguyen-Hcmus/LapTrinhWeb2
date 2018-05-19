var express=require('express');
var userRepo=require('./userRepo');
var router=express.Router();

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

router.get('/',(req,res)=>{
	userRepo.loadAll().then(rows=>{
		res.json(rows);
	}).catch(err=>{
		console.log(err);
		res.statusCode=500;
		res.end('View error log on console.');
	});
});

router.post('/Signup',(req,res)=>{
// 	var secret='6LeuJloUAAAAABAjRIjkbYBwULYGjQul7v6gIkPT';
// 	var captcha_response=req.body.captcha_response;
// var url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captcha_response}`;
// 	axios.post(url,{

// 	},{
// 		headers:{
//         		"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
// 		}
// 	}).then(function(response){
		userRepo.add(req.body).then(insertID=>{

		res.statusCode=201;
		res.json(req.body);
	//})
		
	})
	.catch(err=>{
		console.log(err);
		res.statusCode=500;
		res.end();
	});
});

module.exports=router;