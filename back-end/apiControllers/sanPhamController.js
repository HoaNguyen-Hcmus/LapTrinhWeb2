var express = require('express'),
	sanPhamRepo = require('../repos/sanPhanRepo'),
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
	sanPhamRepo.addLikeList(req.body.NguoiDung, req.body.SanPham)
	.then(rows => {
		res.statusCode = 200;
		res.json({
			mess: "Thêm danh sách yêu thích thành công!"
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