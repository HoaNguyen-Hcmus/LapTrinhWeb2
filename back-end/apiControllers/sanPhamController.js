var express = require('express'),
	sanPhamRepo = require('../repos/sanPhamRepo'),
	checkToken = require('../fn/checkToken');

var router = express.Router();

router.get('/:id', (req, res) => {
	sanPhamRepo.loadOnce(req.params['id'])
	.then(rows => {
		sanPhamRepo.loadMoTa(req.params['id'])
		.then(rows1 => {
			sanPhamRepo.loadNguoiGiuGia(req.params['id'])
			.then(rows2 => {
				res.statusCode = 200;
				res.json({
					data: rows,
					mota: rows1,
					nguoigiugia: rows2
				})
			})
			.catch(err => {
				res.statusCode = 500;
				res.json({
					err: `Lỗi: ${err}`
				})
			})			
		})
		.catch(err => {
			res.statusCode = 500;
			res.json({
				err: `Lỗi: ${err}`
			})
		})
	})
	.catch(err => {
		res.statusCode = 500;
		res.json({
			err: `Lỗi: ${err}`
		})
	})
});

router.get('/top/ragia', (req, res) => {
	sanPhamRepo.loadSanPhamNhieuLuotRaGia().then(rows => {
		res.json(rows);
	}).catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.end('View error log on console.');
	});
});

router.get('/top/gia', (req, res) => {
	sanPhamRepo.loadSanPhamGiaCao().then(rows => {
		res.json(rows);
	}).catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.end('View error log on console.');
	});
});

router.get('/top/ganketthuc', (req, res) => {
	sanPhamRepo.loadSanPhamGanKetThuc().then(rows => {
		res.json(rows);
	}).catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.end('View error log on console.');
	});
});

router.post('/addLikeList', checkToken.checkTokenUser, (req, res) => {
	sanPhamRepo.loadsanPhamYeuThichChoUser(req.body.NguoiDung,req.body.SanPham).then(rows => {
		if (rows.length == 0) {
			sanPhamRepo.addLikeList(req.body.NguoiDung, req.body.SanPham)
				.then(insertID => {
					res.statusCode = 200;
					res.json({
						affrow: insertID
					})
				})
				.catch(err => {
					res.statusCode = 500;
					res.json({
						err: `Lỗi: ${err}`
					})
				})
		}
		else{
			var poco = {
				affrow: 0
			}
			res.statusCode = 201;
			res.json(poco);
		}
	})
});

router.get('/loaddaugia/:sp', (req, res) => {
	sanPhamRepo.loadDauGia(req.params['sp'])
	.then(rows => {
		res.statusCode = 200;
		res.json({
			data: rows
		})
	})
	.catch(err => {
		res.statusCode = 500;
		res.json({
			err: `Lỗi: ${err}`
		})
	})
})

router.post('/daugia', (req, res) => {
	sanPhamRepo.updateTrangThaiDauGia(req.body.sanpham)
	.then(updateRow => {
		sanPhamRepo.dauGia(req.body.sanpham, req.body.nguoiragia, req.body.giaduara)
		.then(rows1 => {
			sanPhamRepo.loadDauGia(req.body.sanpham)
			.then(rows2 => {
				sanPhamRepo.loadOnce(req.body.sanpham)
				.then(rows3 => {
					sanPhamRepo.loadMoTa(req.body.sanpham)
					.then(rows4 => {
						sanPhamRepo.loadNguoiGiuGia(req.body.sanpham)
						.then(rows5 => {
							res.statusCode = 200;
							res.json({
								daugia: rows2,
								data: rows3,
								mota: rows4,
								nguoigiugia: rows5
							})
						})
						.catch(err => {
							res.statusCode = 500;
							res.json({
								err: `Lỗi: ${err}`
							})
						})			
					})
					.catch(err => {
						res.statusCode = 500;
						res.json({
							err: `Lỗi: ${err}`
						})
					})
				})
				.catch(err => {
					res.statusCode = 500;
					res.json({
						err: `Lỗi: ${err}`
					})
				})
			})
			.catch(err => {
				res.statusCode = 500;
				res.json({
					err: `Lỗi: ${err}`
				})
			})
		})
		.catch(err => {
			res.statusCode = 500;
			res.json({
				err: `Lỗi: ${err}`
			})
		})
	})
});

router.get('/getProfile/:id', (req, res) => {
	sanPhamRepo.loadNguoiDUng(req.params['id'])
	.then(rows1 => {
		sanPhamRepo.loadNhanXet(req.params['id'])
		.then(rows2 => {
			res.statusCode = 200;
			res.json({
				data: rows1,
				nhanxet: rows2
			})
		})
		.catch(err => {
			res.statusCode = 500;
			res.json({
				err: `Lỗi: ${err}`
			})
		})
	})
	.catch(err => {
		res.statusCode = 500;
		res.json({
			err: `Lỗi: ${err}`
		})
	})
})

module.exports = router;