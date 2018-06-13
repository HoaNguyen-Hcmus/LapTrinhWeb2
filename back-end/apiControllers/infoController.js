var express=require('express');
var infoRepo=require('../repos/infoRepo');
var router=express.Router();
var axios=require('axios');
var md5=require('md5');

router.get('/changeInfo/:id_user',(req,res)=>{
	var userID=req.params["id_user"];
	infoRepo.selectUser(userID).then(rows=>{
		res.json(rows);
	}).catch(err=>{
		console.log(err);
		res.statusCode=402;
		res.end('View error log on console');
	});
});

router.post('/changeInfo',(req,res)=>{
	var userID=req.body.idUser;
	var userName=req.body.name;
	var userAddress=req.body.address;
	var userMail=req.body.mail;
	var userPhone=req.body.phone;
	var userBirth=req.body.birth;

	infoRepo.updateUser(userID,userName,userAddress,userMail,userPhone).then(insertID=>{
		res.statusCode=201;
		res.json(req.body);
		res.json({mess:"Cap nhat thanh cong"});
	}).catch(err=>{
		console.log(err);
		res.statusCode=401;
		res.end('View error log on console');
	});
});

router.post('/changePass',(req,res)=>{
	var userID=req.body.idUser;
	var pass1=md5(req.body.pass1);
	var pass2=req.body.pass2;
	var pass3=req.body.pass3;
	var passOld=null;

	infoRepo.selectPass(userID).then(rows=>{
	if(rows.length>0)
	{
		passOld=rows[0].PASSWORD;
		if(pass1===passOld)
		{
			infoRepo.updatePass(userID,pass2).then(insertID=>{
				res.statusCode=201;
				res.json(req.body);
				res.json({mess:"Cap nhat mat khau thanh cong"});
			}).catch(err=>{
				console.log(err);
				res.statusCode=401;
				res.end('View erroe log on console');
			});
			
		}
	}
	}).catch(err=>{
			console.log(err);
			res.statusCode=402;
			res.end('View error log in console');
		});
	});

router.get('/evaluation/:id_user',(req,res)=>{
	var userID=req.params["id_user"];
	infoRepo.selectEvaluation(userID).then(rows=>{
		res.json(rows);
	}).catch(err=>{
		console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
	});
});

router.get('/favorite/:id_user',(req,res)=>{
	var userID=req.params["id_user"];
	infoRepo.selectFavorite(userID).then(rows=>{
		res.json(rows);
	}).catch(err=>{
		console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
	});
});

router.get('/auction/:id_user',(req,res)=>{
	var userID=req.params["id_user"];
	infoRepo.selectAuction(userID).then(rows=>{
		res.json(rows);
	}).catch(err=>{
		console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
	});
});

router.get('/win/:id_user',(req,res)=>{
	var userID=req.params["id_user"];
	infoRepo.selectWin(userID).then(rows=>{
		res.json(rows);
	}).catch(err=>{
		console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
	});
});

router.get('/:id',(req,res)=>{
	if(req.params['id']){
		var id=req.params['id'];
		if (isNaN(id)) {
			res.statusCode = 400;
			res.end();
			return;
		}
		infoRepo.selectSanPham(id).then(rows=>{
			res.json(rows);
		}).catch(err=>{
			console.log(err);
	        res.statusCode = 500;
	        res.end('View error log on console.');
		});
	}else{
		res.statusCode = 400;
		res.json('error');
	}
});

router.post('/comment',(req,res)=>{
	var userID=req.body.idUser;
	var idSanPham=req.body.id;
	var idNguoiBan=0;
	var nhanxet=req.body.comment;
	var diem=req.body.diem;

	infoRepo.selectNguoiBan(idSanPham).then(rows=>{
		if(rows.length>0)
		{
			idNguoiBan=rows[0].NguoiBan;

			infoRepo.updateDiem(idNguoiBan,diem).then(insertID=>{
				res.statusCode=201;
				res.json(req.body);
				res.json({mess:"Cap nhat diem thanh cong"});
				//infoRepo.insertComment(userID,idNguoiBan,nhanxet,1);
			}).catch(err=>{
				console.log(err);
				res.statusCode=401;
				res.end('View erroe log on console');
			});

			infoRepo.insertComment(userID,idNguoiBan,nhanxet,1).then(insertID=>{
				res.statusCode=201;
				res.json(req.body);
				res.json({mess:"Cap nhat nhan xet thanh cong"});
			}).catch(err=>{
				console.log(err);
				res.statusCode=402;
				res.end('View erroe log on console');
			});
		}else{
		res.statusCode = 400;
		res.json('khong lay duoc userID nguoi ban');
	}
	})

});
module.exports=router;