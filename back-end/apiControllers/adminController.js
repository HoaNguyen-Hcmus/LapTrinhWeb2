var express = require('express'),
	jwt = require('jsonwebtoken'),
	q = require('q'),
	constants = require('../fn/const'), 
	fnCheckToken = require('../fn/checkToken');
	adminRepo = require('../repos/adminRepo');

var router = express.Router();


router.get('/', fnCheckToken.checkTokenAdmin, (req, res) => {
	res.statusCode = 200;
	res.json({
		mess: "Đã đăng nhập"
	});
});

router.post('/login', (req, res) => {
	adminRepo.checkLogin(req.body.user, req.body.pass)
	.then(rows => {
		if(rows.length != 0) {
			var pay_load = {
				user: req.body.user
			}

			var token = jwt.sign(pay_load, constants.SECRET_KEY_ADMIN, {
				expiresIn: 6000
			});

			res.json({
				access_token: token,
				user: rows[0].NAME
			});
		} else {
			res.statusCode = 401;
			res.json({
				msg: 'login failed => no token',
				err: err
			});
		}
	})
	.catch(err => {
		res.statusCode = 401;
		res.json({
			msg: 'login failed => no token',
			err: err
		});
	});
});

//yeu cau ban
router.get('/yeucauban', fnCheckToken.checkTokenAdmin, (req, res) => {
	adminRepo.showYeuCauBan()
	.then(rows => {
		res.statusCode = 200;
		res.json({
			data: rows
		});
	})
	.catch(err => {
		res.statusCode = 401;
		res.json({
			msg: 'login failed => no token',
			err: err
		});
	});
});

router.put('/yeucauban', fnCheckToken.checkTokenAdmin, (req, res) => {
	adminRepo.acceptYeuCauBan(req.body.id)
	.then(changeRow => {
		if(changeRow > 0) {
			adminRepo.showYeuCauBan()
			.then(rows => {
				res.statusCode = 200;
				res.json({
					mess: "Xác nhận yêu cầu bán thành công!",
					data: rows
				});
			})
			.catch(err => {
				res.statusCode = 401;
				res.json({
					msg: 'Có lỗi xảy ra...',
					err: err
				});
			});
		} else {
			res.statusCode = 400,
			res.json({
				mess: "Xác nhận yêu cầu bán không thành công"
			});
		}
	})
	.catch(err => {
		res.statusCode = 401;
		res.json({
			mess: 'Có lỗi truy vấn',
			err: err
		});
	});
});

router.delete('/yeucauban', fnCheckToken.checkTokenAdmin ,(req, res) => {
	adminRepo.declineYeuCauBan(req.body.id)
	.then(row => {
		if(row > 0) {
			adminRepo.showYeuCauBan()
			.then(rows => {
				res.statusCode = 200;
				res.json({
					mess: "Hủy yêu cầu bán thành công!",
					data: rows
				});
			})
			.catch(err => {
				res.statusCode = 401;
				res.json({
					mess: 'Có lỗi xảy ra...',
					err: err
				});
			});
		} else {
			res.statusCode = 400,
			res.json({
				mess: "Xác nhận yêu cầu bán không thành công"
			});
		}
	})
	.catch(err => {
		res.statusCode = 401;
		res.json({
			mess: 'Có lỗi truy vấn',
			err: err
		});
	});
});

//quan li danh muc
router.get('/danhmuc', fnCheckToken.checkTokenAdmin, (req, res) => {
	adminRepo.showDanhMuc()
	.then(rows => {
		res.statusCode = 200;
		res.json({
			mess: 'Show thành công',
			data: rows
		})
	})
	.catch(err => {
		res.statusCode = 501;
		res.json({
			mess: 'Lỗi truy vấn'
		})
	});
});

router.get('/danhmuc/:id', fnCheckToken.checkTokenAdmin, (req, res) => {
	adminRepo.getDanhMuc(req.params['id'])
	.then(rows => {
		res.statusCode = 200;
		res.json({
			mess: '',
			data: rows
		});
	})
	.catch(err => {
		res.statusCode = 501;
		res.json({
			mess: 'Lỗi truy vấn'
		});
	});
});

router.post('/danhmuc', fnCheckToken.checkTokenAdmin, (req, res) => {
	adminRepo.addDanhMuc(req.body.name)
	.then(() => {
		adminRepo.showDanhMuc()
		.then(rows => {
			res.statusCode = 200;
			res.json({
				mess: 'Thêm danh mục thành công',
				data: rows
			})
		})
		.catch(err => {
			res.statusCode = 501;
			res.json({
				mess: 'Lỗi truy vấn'
			})
		});
	})
	.catch(err => {
		res.statusCode = 501;
		res.json({
			mess: 'Lỗi truy vấn'
		})
	});
});

router.put('/danhmuc', fnCheckToken.checkTokenAdmin, (req, res) => {
	adminRepo.editDanhMuc(req.body.id, req.body.name)
	.then(rowchange => {
		if(rowchange > 0) {
			adminRepo.showDanhMuc()
			.then(rows => {
				res.statusCode = 200;
				res.json({
					mess: 'Thêm danh mục thành công',
					data: rows
				})
			})
			.catch(err => {
				res.statusCode = 501;
				res.json({
					mess: 'Lỗi truy vấn'
				})
			});
		} else {
			res.statusCode = 501;
			res.json({
				mess: 'Cập nhật không thành công'
			})
		}
	})
	.catch(error => {
		res.statusCode = 501;
		res.json({
			mess: 'Lỗi truy vấn'
		})
	})
});

router.delete('/danhmuc', fnCheckToken.checkTokenAdmin, (req, res) => {
	adminRepo.deleteDanhMuc(req.body.id)
	.then(rowchange => {
		if(rowchange > 0) {
			adminRepo.showDanhMuc()
			.then(rows => {
				res.statusCode = 200;
				res.json({
					mess: 'Xóa danh mục thành công',
					data: rows
				})
			})
			.catch(err => {
				res.statusCode = 501;
				res.json({
					mess: 'Lỗi truy vấn xóa'
				})
			});
		} else {
			res.statusCode = 501;
			res.json({
				mess: 'Xóa không thành công'
			})
		}
	})
	.catch(err => {
		res.statusCode = 501;
		res.json({
			mess: 'Lỗi truy vấn'
		})
	});
});
//quan li nguoi dung

router.get('/nguoidung', fnCheckToken.checkTokenAdmin, (req, res) => {
	adminRepo.getNguoiDung()
	.then(rows => {
		adminRepo.getQuenMatKhau()
		.then(rows1 => {
			res.statusCode = 200;
			res.json({
				mess: '',
				data: rows,
				data1: rows1
			});	
		})
		.catch(err1 => {
			res.statusCode = 501;
			res.json({
				mess: "Lỗi truy vấn"
			})
		});
	})
	.catch(err => {
		res.statusCode = 501;
		res.json({
			mess: "Lỗi truy vấn 1",
			err: err
		})
	});
});

router.delete('/nguoidung', fnCheckToken.checkTokenAdmin, (req, res) => {
	adminRepo.deleteNguoiDung(req.body.id)
	.then(rowchange => {
		if(rowchange > 0) {
			adminRepo.getNguoiDung()
			.then(rows => {
				adminRepo.getQuenMatKhau()
				.then(rows1 => {
					res.statusCode = 200;
					res.json({
						mess: 'Xóa người dùng thành công',
						data: rows,
						data1: rows1
					});	
				})
				.catch(err1 => {
					res.statusCode = 501;
					res.json({
						mess: "Lỗi truy vấn"
					})
				});
			})
			.catch(err => {
				res.statusCode = 501;
				res.json({
					mess: "Lỗi truy vấn hiển thị"
				})
			});
		}
	})
	.catch(err => {
		res.statusCode = 501;
		res.json({
			mess: "Lỗi truy vấn xóa"
		})
	})
});

router.post('/resetpass', fnCheckToken.checkTokenAdmin, (req, res) => {
	adminRepo.acceptResetPass(req.body.id)
	.then(rows => {
		adminRepo.deleteResetPass(req.body.id)
		.then(() => {
			adminRepo.getNguoiDung()
			.then(rows => {
				adminRepo.getQuenMatKhau()
				.then(rows1 => {
					res.statusCode = 200;
					res.json({
						mess: '',
						data: rows,
						data1: rows1
					});	
				})
				.catch(err1 => {
					res.statusCode = 501;
					res.json({
						mess: "Lỗi truy vấn"
					})
				});
			})
			.catch(err => {
				res.statusCode = 501;
				res.json({
					mess: "Lỗi truy vấn hiển thị"
				})
			});
		})
		.catch(err => {
			res.statusCode = 501;
			res.json({
				mess: "Lỗi truy vấn xóa"
			})
		});
	})
	.catch(err => {
		res.statusCode = 501;
		res.json({
			mess: "Lỗi truy vấn cập nhật"
		})
	});
});

router.delete('/resetpass', fnCheckToken.checkTokenAdmin, (req, res) => {
	adminRepo.deleteResetPass(req.body.id)
	.then(row => {
		adminRepo.getNguoiDung()
		.then(rows => {
			adminRepo.getQuenMatKhau()
			.then(rows1 => {
				res.statusCode = 200;
				res.json({
					mess: '',
					data: rows,
					data1: rows1
				});	
			})
			.catch(err1 => {
				res.statusCode = 501;
				res.json({
					mess: "Lỗi truy vấn"
				})
			});
		})
		.catch(err => {
			res.statusCode = 501;
			res.json({
				mess: "Lỗi truy vấn hiển thị"
			})
		});
	})
	.catch(err => {
		res.statusCode = 501;
		res.json({
			mess: "Lỗi truy vấn xóa"
		});
	})
})

module.exports = router;