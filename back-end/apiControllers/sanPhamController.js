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

module.exports = router;