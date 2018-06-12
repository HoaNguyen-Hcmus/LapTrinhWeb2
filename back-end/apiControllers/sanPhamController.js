var express = require('express'),
	sanPhamRepo = require('../repos/sanPhanRepo');

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

module.exports = router;