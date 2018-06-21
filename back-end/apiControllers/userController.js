var express = require('express');
var userRepo = require('../repos/userRepo');
var router = express.Router();
var axios = require('axios');
var constants=require('../fn/const.js');
var checkToken = require('../fn/checkToken');

// Hòa chức năng recapcha
// var bodyParser = require('body-parser');
// var pub = __dirname + '/public';
// router = express();
// var Recaptcha = require('express-recaptcha').Recaptcha;
 
// var recaptcha = new Recaptcha('6LdIoVoUAAAAAI3sKMfFrrJ0abGsl5kC8_CIdsob', '6LdIoVoUAAAAAF7rtLgBGq_KTuARALa6wh83pr7r');
 
// //- required by express-recaptcha in order to get data from body or query.
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded());
 
// router.use(express.static(pub));
// router.set('views', __dirname + '/views');
// router.set('view engine', 'jade');
 
//------------

router.get('/', (req, res) => {
	userRepo.loadAll().then(rows => {
		res.json(rows);
	}).catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.end('View error log on console.');
	});
});

// Hòa chức năng đăng kí
// router.post('/Signup',recaptcha.middleware.verify,function(req,res){
	router.post('/Signup',(req,res)=>{
    // if(!req.recaptcha.error)
    // {
    	var userID = 1;
	 	userRepo.selectUser_ID().then(rows => {
	 		if (rows.length > 0) {
	 			userID = rows[0].maxID;
	 		}
	 	});
	 	userRepo.checkUser(req.body.user).then(rows=>{
	 		if(rows.length==0){
		 		userRepo.selectMail(req.body.mail).then(rows=>{
		 			if(rows.length==0){
		 				userRepo.add(req.body).then(insertID=>{
		 					userRepo.addLogin(req.body, userID + 1).then(insertID=>{
		 						res.json({
		 							data: req.body,
		 							mess: 'Dang ki thanh cong'
		 						})
		 					})
		 				})
		 			}
		 			else
				 	{
				 		console.log(err);
						res.statusCode=402;
						res.end('Mail da ton tai');
				 	}
		 		}).catch(err=>{
				console.log(err);
				res.statusCode=402;
				res.end('Mail da ton tai');
			});
		 	}
		 	else
		 	{
		 		console.log(err);
				res.statusCode=402;
				res.end('Ten dang nhap da ton tai');
		 	}
	 	}).catch(err=>{
			console.log(err);
			res.statusCode=401;
			res.end('View error log on console');
		});
	// }    
 //    else
 //    {
 //       console.log(err);
	// 	res.statusCode=402;
	// 	res.end('Chua chon capchar');
 //    }
});

//----------------------------------

router.post('/xinban', checkToken.checkTokenUser, (req, res) => {
	userRepo.loadUserXinBan(req.body.userID).then(rows => {
		if (rows.length == 0) {
			userRepo.xinban(req.body)
				.then(insertId => {
					var poco = {
						xinBan: 1
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
					xinBan: 2
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

/// Hòa thực hiện chức năng tìm kiếm --------------------------------------
router.get('/sanpham', (req, res) => {
    var page = 0;
    var danhmuc=0;
    var txtSearch="";
    var sapxep=0;
    if (req.query.page) {
        page =req.query.page;
    }
    if (req.query.danhmuc) {
        danhmuc = req.query.danhmuc;
    }
    if (req.query.txtSearch) {
        txtSearch = req.query.txtSearch;
    }
    if(req.query.sapxep){
    	sapxep=req.query.sapxep;
    }
   
	    userRepo.loadSanPhamTheoSapXep(page,txtSearch,danhmuc,sapxep).then(rows => {
	        var hasMore = rows.length > constants.PRODUCTS_PER_PAGE;
	        if (hasMore) {
	            rows.pop();
	        }

	        var data = {
	            sanpham: rows,
	            hasMore: hasMore
	        }
	        res.json(data);
	    }).catch(err => {
	        console.log(err);
	        res.statusCode = 500;
	        res.end('View error log on console.');
	    });
	
	
});

router.get('/danhmuc',(req,res)=>{
	userRepo.selectAllDanhMuc().then(rows=>{
		res.json({
			danhmuc: rows
		});
	}).catch(err=>{
		res.statusCode = 400;
		res.json({
		err: err
		})
	})
})
//-------------------------------------------------------------------------------------
module.exports=router;