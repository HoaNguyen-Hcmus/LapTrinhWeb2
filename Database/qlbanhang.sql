-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 20, 2018 lúc 10:08 AM
-- Phiên bản máy phục vụ: 10.1.31-MariaDB
-- Phiên bản PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `qlbanhang`
--


-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `ADDRESS` varchar(100) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `PHONE` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `admin`
--

INSERT INTO `admin` (`ID`, `NAME`, `ADDRESS`, `EMAIL`, `PHONE`) VALUES
(101, 'Nguyễn Quang Huy', '748/16/6 Hồng Bàng Quận 11', 'huydeptrai@ahihi.com', '0123456789');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `caplaimatkhau`
--

CREATE TABLE `caplaimatkhau` (
  `ID` int(11) NOT NULL,
  `NguoiDung` int(11) NOT NULL,
  `ThoiGian` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TrangThai` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhmuc`
--

CREATE TABLE `danhmuc` (
  `ID` int(11) NOT NULL,
  `Ten` varchar(200) NOT NULL,
  `TrangThai` tinyint(1) NOT NULL DEFAULT '1',
  `NgayThem` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `NgaySuaDoi` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `danhmuc`
--

INSERT INTO `danhmuc` (`ID`, `Ten`, `TrangThai`, `NgayThem`, `NgaySuaDoi`) VALUES
(1, 'Điện thoại', 1, '2018-05-25 14:38:18', '2018-06-13 17:54:23'),
(2, 'Máy tính', 1, '2018-05-25 14:38:18', '2018-05-26 10:50:51'),
(3, 'Test', 0, '2018-05-26 10:20:36', '2018-05-26 10:48:29'),
(4, '123456', 0, '2018-05-26 10:20:45', '2018-06-13 17:54:31'),
(5, '', 0, '2018-05-26 10:21:27', '2018-05-26 10:52:09'),
(6, '', 0, '2018-05-26 10:21:50', NULL),
(7, 'Phim ảnh', 0, '2018-05-26 10:22:01', NULL),
(8, '', 0, '2018-05-26 10:23:35', NULL),
(9, 'Hình ảnh', 0, '2018-05-26 15:40:03', NULL),
(10, 'Test', 0, '2018-05-26 15:40:19', NULL),
(11, 'jsajdnas', 0, '2018-06-13 13:09:27', NULL),
(12, '132121', 0, '2018-06-13 17:54:44', NULL),
(13, 'Phim ảnh', 0, '2018-06-13 17:55:09', NULL),
(14, 'Máy ảnh', 1, '2018-06-13 17:59:00', NULL),
(15, 'Tủ lạnh', 1, '2018-06-19 00:51:17', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhsachyeuthich`
--

CREATE TABLE `danhsachyeuthich` (
  `ID` int(11) NOT NULL,
  `NguoiDung` int(11) NOT NULL,
  `SanPham` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `danhsachyeuthich`
--

INSERT INTO `danhsachyeuthich` (`ID`, `NguoiDung`, `SanPham`) VALUES
(10, 1, 7),
(12, 5, 6),
(11, 5, 9);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `daugia`
--

CREATE TABLE `daugia` (
  `ID` int(11) NOT NULL,
  `SanPham` int(11) NOT NULL,
  `NguoiRaGia` int(11) NOT NULL,
  `GiaDuaRa` decimal(10,0) NOT NULL,
  `GiaDauTuDong` decimal(10,0) NOT NULL DEFAULT '0',
  `TrangThaiKick` tinyint(1) NOT NULL DEFAULT '0',
  `CoThangCuoc` tinyint(1) NOT NULL DEFAULT '0',
  `ThoiGianDuaRa` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `daugia`
--

INSERT INTO `daugia` (`ID`, `SanPham`, `NguoiRaGia`, `GiaDuaRa`, `GiaDauTuDong`, `TrangThaiKick`, `CoThangCuoc`, `ThoiGianDuaRa`) VALUES
(1, 7, 1, '7000000', '0', 1, 0, '2018-06-15 12:19:25'),
(2, 7, 2, '7200000', '0', 0, 0, '2018-06-15 12:19:25'),
(3, 7, 1, '7000000', '0', 1, 0, '2018-06-15 12:20:26'),
(4, 7, 2, '7200000', '0', 0, 0, '2018-06-15 12:20:26'),
(5, 7, 1, '7400000', '0', 1, 0, '2018-06-15 12:20:54'),
(6, 7, 2, '7600000', '0', 0, 0, '2018-06-15 12:20:54'),
(7, 7, 2, '7700000', '0', 0, 0, '2018-06-18 00:25:46'),
(8, 7, 2, '7800000', '0', 0, 0, '2018-06-18 00:29:40'),
(9, 7, 2, '7800000', '0', 0, 0, '2018-06-18 00:30:15'),
(10, 7, 2, '7900000', '0', 0, 0, '2018-06-18 00:30:34'),
(11, 7, 2, '7900000', '0', 0, 0, '2018-06-18 00:30:47'),
(12, 7, 2, '8000000', '0', 0, 0, '2018-06-18 00:36:10'),
(13, 7, 2, '8000000', '0', 0, 0, '2018-06-18 00:36:54'),
(14, 7, 2, '8100000', '0', 0, 0, '2018-06-18 00:37:08'),
(15, 7, 2, '8200000', '0', 0, 0, '2018-06-18 00:38:25'),
(16, 7, 2, '8300000', '0', 0, 0, '2018-06-18 00:39:25'),
(17, 7, 2, '8400000', '0', 0, 0, '2018-06-18 00:39:30'),
(18, 7, 2, '8500000', '0', 0, 0, '2018-06-18 00:39:35'),
(19, 6, 2, '17000000', '0', 0, 0, '2018-06-18 12:37:39'),
(20, 8, 6, '6191000', '0', 0, 0, '2018-06-19 00:57:14'),
(21, 9, 5, '34840000', '0', 0, 0, '2018-06-19 01:01:54'),
(22, 9, 1, '36919000', '0', 0, 0, '2018-06-19 07:54:43'),
(23, 9, 1, '36969000', '0', 0, 0, '2018-06-19 14:18:02'),
(24, 9, 1, '37100000', '0', 0, 0, '2018-06-19 14:18:24'),
(25, 9, 1, '37150000', '0', 0, 0, '2018-06-19 14:19:25'),
(26, 9, 1, '37200000', '0', 0, 0, '2018-06-19 14:20:46'),
(27, 9, 1, '37250000', '0', 0, 0, '2018-06-19 14:35:21'),
(28, 8, 1, '6291000', '0', 0, 0, '2018-06-19 14:35:42'),
(29, 8, 1, '6391000', '0', 0, 1, '2018-06-19 14:36:02'),
(30, 9, 1, '37300000', '0', 0, 0, '2018-06-20 12:47:38'),
(31, 9, 1, '37350000', '0', 0, 0, '2018-06-20 12:47:52'),
(32, 9, 1, '37400000', '0', 0, 0, '2018-06-20 12:49:52'),
(33, 9, 1, '37450000', '0', 0, 0, '2018-06-20 12:51:32'),
(34, 9, 1, '37500000', '0', 0, 0, '2018-06-20 12:53:46'),
(35, 9, 1, '37550000', '0', 0, 0, '2018-06-20 12:53:49'),
(36, 9, 1, '37600000', '0', 0, 0, '2018-06-20 12:55:26'),
(37, 9, 1, '37650000', '0', 0, 0, '2018-06-20 12:56:09'),
(38, 9, 1, '37700000', '0', 0, 0, '2018-06-20 12:57:15'),
(39, 9, 1, '37750000', '0', 0, 0, '2018-06-20 12:57:58'),
(40, 9, 1, '37800000', '0', 0, 0, '2018-06-20 12:59:13'),
(41, 9, 1, '37850000', '0', 0, 0, '2018-06-20 12:59:48');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `login`
--

CREATE TABLE `login` (
  `ID` int(11) NOT NULL,
  `USERNAME` varchar(50) NOT NULL,
  `PASSWORD` varchar(100) NOT NULL,
  `LAST_LOGIN` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `WRONG_PASS` int(11) NOT NULL DEFAULT '0',
  `USER_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `login`
--

INSERT INTO `login` (`ID`, `USERNAME`, `PASSWORD`, `LAST_LOGIN`, `WRONG_PASS`, `USER_ID`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', '2018-05-17 13:54:00', 0, 101),
(2, 'huynvp', 'e10adc3949ba59abbe56e057f20f883e', '2018-05-19 20:58:33', 0, 1),
(3, 'huy', 'e10adc3949ba59abbe56e057f20f883e', '2018-05-19 20:58:42', 0, 2),
(4, 'nvhoa', 'e10adc3949ba59abbe56e057f20f883e', '2018-06-11 22:25:38', 0, 2),
(5, 'testNhom1', 'e10adc3949ba59abbe56e057f20f883e', '2018-06-19 00:31:40', 0, 5),
(6, 'testNhom2', 'e10adc3949ba59abbe56e057f20f883e', '2018-06-19 00:31:54', 0, 6),
(7, 'test1', 'e10adc3949ba59abbe56e057f20f883e', '2018-06-19 22:53:02', 0, 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `mota`
--

CREATE TABLE `mota` (
  `ID` int(11) NOT NULL,
  `SanPham` int(11) NOT NULL,
  `MoTa` varchar(2500) NOT NULL,
  `ThoiGian` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `mota`
--

INSERT INTO `mota` (`ID`, `SanPham`, `MoTa`, `ThoiGian`) VALUES
(1, 6, '<h3>Màn hình sắc nét</h3><p>Với màn hình LCD&nbsp;3.0 inches hiển thị hình ảnh rõ nét trên&nbsp;<a href=\"https://www.nguyenkim.com/may-anh-mirrorless/\">máy ảnh</a>, việc thao tác, điều chỉnh trở nên dễ dàng hơn rất nhiều và được thực hiện một cách nhanh chóng.</p><h3>Kết nối không giới hạn</h3><p><a href=\"https://www.nguyenkim.com/may-anh-canon-eos-m10-kit-15-45mm-den.html\">Máy ảnh Canon EOS M10</a>&nbsp;trang bị khả năng kết nối phong phú như không dây Wi-fi, USB và cổng HDMI, giờ đây việc chia sẻ hình ảnh với các thiết bị hiện đại khác trở nên dễ dàng hơn bao giờ hết.</p>', '2018-06-13 22:41:00'),
(2, 7, '<h3>Màn hình sắc nét</h3><p>Với màn hình LCD&nbsp;3.0 inches hiển thị hình ảnh rõ nét trên&nbsp;</p><p><a href=\"https://www.nguyenkim.com/may-anh-mirrorless/\">máy ảnh</a></p><p>, việc thao tác, điều chỉnh trở nên dễ dàng hơn rất nhiều và được thực hiện một cách nhanh chóng.</p>', '2018-06-13 22:44:11'),
(3, 7, '<p>Thêm mô <strong>tả</strong></p>', '2018-06-14 18:25:08'),
(4, 7, '<p>Mô tả <strong>thứ 3</strong></p>', '2018-06-14 20:04:18'),
(5, 7, '<p>Mô tả thứ 4</p>', '2018-06-14 20:05:06'),
(6, 7, '<p>Mô tả thứ 5</p>', '2018-06-14 20:05:40'),
(7, 7, '<p>Mô tả thứ 5</p>', '2018-06-14 20:05:42'),
(8, 7, '<p>Mô tả 7</p>', '2018-06-14 20:06:18'),
(9, 7, '<p>adasd</p>', '2018-06-14 20:06:38'),
(10, 7, '<p>đá</p>', '2018-06-14 20:07:09'),
(11, 7, '<p>đá</p>', '2018-06-14 20:07:28'),
(12, 7, '<p>ád</p>', '2018-06-14 20:07:58'),
(13, 7, '<p>mô tả</p>', '2018-06-14 20:08:39'),
(14, 7, '<p>mô tả 13</p>', '2018-06-14 20:08:49'),
(15, 7, '<p>data 14</p>', '2018-06-14 20:10:26'),
(16, 7, '<p>data 15</p>', '2018-06-14 20:10:50'),
(17, 7, '<p>123456789</p>', '2018-06-16 09:05:17'),
(18, 7, '<p>123</p>', '2018-06-16 09:10:07'),
(19, 7, '<p>&nbsp;</p>', '2018-06-16 11:00:41'),
(20, 7, '<p>Load mô tả test</p>', '2018-06-16 22:54:50'),
(21, 8, '<p>Đặc điểm nổi bật</p><ul><li>Công nghệ Inverter và Econavi tiết kiệm điện năng vượt trội, giúp tủ lạnh hoạt động ổn định và êm ái.</li><li>Công nghệ làm lạnh Panorama làm lạnh đa chiều và đồng đều ngăn đông, giúp làm đông nhanh chóng và tiết kiệm điện năng.</li><li>Bộ khử mùi phân tử bạc Nano Ag+ tiêu diệt vi khuẩn, khử mùi hôi hiệu quả, bảo vệ sức khỏe cho người sử dụng.</li><li>Hộc rau quả giữ ấm giúp rau quả được bảo quản lâu hơn và giữ được vị ngon trọn vẹn.</li></ul>', '2018-06-19 00:54:07'),
(22, 8, '<ul><li>Dung tích tổng:188 lít</li><li>Số người sử dụng:3 - 5 người</li><li>Dung tích ngăn đá:53 lít</li><li>Dung tích ngăn lạnh:135 lít</li><li>Công nghệ Inverter:<a href=\"https://www.dienmayxanh.com/kinh-nghiem-hay/tu-lanh-inverter-la-gi-585937\">Tủ lạnh Inverter</a></li><li>Chế độ tiết kiệm điện khác:<a href=\"https://www.dienmayxanh.com/kinh-nghiem-hay/cong-nghe-econavi-tren-tu-lanh-panasonic-720959\">Econavi</a></li><li>Công nghệ làm lạnh:<a href=\"https://www.dienmayxanh.com/kinh-nghiem-hay/cong-nghe-lam-lanh-tren-tu-lanh-panasonic-585689#panorama\">Panorama</a></li><li>Công nghệ kháng khuẩn, khử mùi:<a href=\"https://www.dienmayxanh.com/kinh-nghiem-hay/danh-bay-mui-tu-lanh-voi-cong-nghe-ag-clean-cua-pa-993561\">Công nghệ kháng khuẩn Ag Clean với tinh thể bạc Ag+</a></li><li>Công nghệ bảo quản thực phẩm:Ngăn rau quả giữ ẩm</li><li>Kiểu tủ:Ngăn đá trên</li><li>Số cửa:2 cửa</li><li>Chất liệu cửa tủ lạnh:Kim loại phủ sơn tĩnh điện</li><li>Chất liệu khay ngăn:Kính chịu lực</li><li>Kích thước - Khối lượng:Cao 136 cm - Rộng 52 cm - Sâu 57 cm - Nặng 36 kg</li><li>Đèn chiếu sáng:Đèn LED</li><li>Chất liệu dàn lạnh:Nhôm</li><li>Nơi sản xuất:Việt Nam</li><li>Năm ra mắt:2017</li></ul>', '2018-06-19 00:55:35'),
(23, 9, '<h2><strong>iPhone X được&nbsp;Apple&nbsp;ra mắt ngày 12/9 vừa rồi đánh dấu chặng đường 10 năm lần đầu tiên iPhone ra đời. Sau một thời gian, </strong><a href=\"https://www.thegioididong.com/dtdd/iphone-x-64gb\"><strong>giá iPhone X</strong></a><strong> cũng được công bố. iPhone X mang trên mình thiết kế hoàn toàn mới với màn hình Super Retina viền cực mỏng và trang bị nhiều công nghệ hiện đại như nhận diện khuôn mặt Face ID, sạc pin nhanh và sạc không dây cùng khả năng chống nước bụi cao cấp.</strong></h2>', '2018-06-19 01:01:30'),
(24, 10, '<p>Mô tả <strong>sản phẩm</strong></p>', '2018-06-20 09:03:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanxet`
--

CREATE TABLE `nhanxet` (
  `ID` int(11) NOT NULL,
  `NguoiNhanXet` int(11) NOT NULL,
  `LoiNhanXet` varchar(500) NOT NULL,
  `NguoiDuocNhanXet` int(11) NOT NULL,
  `ThoiGian` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TrangThai` tinyint(1) NOT NULL,
  `SanPham` int(11) NOT NULL,
  `LoaiNX` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `nhanxet`
--

INSERT INTO `nhanxet` (`ID`, `NguoiNhanXet`, `LoiNhanXet`, `NguoiDuocNhanXet`, `ThoiGian`, `TrangThai`, `SanPham`, `LoaiNX`) VALUES
(9, 1, '123 nhận xét người bán', 5, '2018-06-20 00:07:14', 1, 8, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `ID` int(11) NOT NULL,
  `Ten` varchar(200) NOT NULL,
  `GiaDauGia` decimal(10,0) NOT NULL,
  `GiaMuaNgay` decimal(10,0) NOT NULL,
  `GioDang` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ThoiHanBan` datetime NOT NULL,
  `TrangThai` tinyint(1) NOT NULL,
  `NguoiBan` int(11) NOT NULL,
  `SoLuotRaGia` int(11) NOT NULL,
  `DanhMuc` int(11) NOT NULL,
  `BuocGia` decimal(10,0) NOT NULL,
  `TuDongGiaHan` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`ID`, `Ten`, `GiaDauGia`, `GiaMuaNgay`, `GioDang`, `ThoiHanBan`, `TrangThai`, `NguoiBan`, `SoLuotRaGia`, `DanhMuc`, `BuocGia`, `TuDongGiaHan`) VALUES
(6, 'MÁY ẢNH CHUYÊN NGHIỆP CANON EOS M10 KIT 15-45MM', '6990000', '10500000', '2018-06-13 22:41:00', '2018-06-25 00:00:00', 1, 1, 0, 14, '100000', 1),
(7, 'MÁY ẢNH CHUYÊN NGHIỆP CANON EOS M10 KIT 15-45MM', '6990000', '10800000', '2018-06-13 22:44:11', '2018-06-13 00:00:00', 1, 1, 0, 14, '100000', 1),
(8, 'Tủ lạnh Panasonic 188 lít NR-BA228PKV1', '6090000', '9090000', '2018-06-19 00:54:07', '2018-06-20 08:32:00', 1, 5, 0, 15, '100000', 1),
(9, 'Điện thoại iPhone X 256GB Gray', '34790000', '36790000', '2018-06-19 01:01:30', '2018-06-20 13:08:00', 1, 6, 0, 1, '50000', 1),
(10, 'Sản phẩm 1', '2000000', '1000', '2018-06-20 09:03:57', '2018-06-20 09:20:00', 1, 2, 0, 1, '200000', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `ADDRESS` varchar(100) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `PHONE` varchar(12) NOT NULL,
  `DiemDanhGia` int(11) NOT NULL DEFAULT '0',
  `TYPE` tinyint(1) NOT NULL COMMENT 'Người mua và người bán',
  `STATUS` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`ID`, `NAME`, `ADDRESS`, `EMAIL`, `PHONE`, `DiemDanhGia`, `TYPE`, `STATUS`) VALUES
(1, 'Nguyễn Quang Huy', '145 HB Quận 11', 'huynvp@gmail.com', '0966033066', 0, 1, 1),
(2, 'Nguyễn Văn Hòa', 'djsahd', 'hjhh', '54545', 0, 0, 0),
(3, 'Nguyễn Xuân Hiếu', '455', '54', '545', 0, 0, 1),
(4, 'Nguyễn Văn Hòa', 'ew', 'cotinhtoan@gmail.com', '0906150150', 0, 1, 1),
(5, 'Nhóm 1  ABC', '123 Hồng Bàng, Phường 1 Quận 11', 'nhom1@gmail.com', '0123456789', 9, 1, 1),
(6, 'Nhóm 2  ABC', '123 Hồng Bàng, Phường 1 Quận 11', 'nhom1@gmail.com', '0123456789', 0, 1, 1),
(7, 'test', '123 hn', '213132@xn--1ca9g.com', '0123456789', 0, 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `xinduocban`
--

CREATE TABLE `xinduocban` (
  `ID` int(11) NOT NULL,
  `NguoiDung` int(11) NOT NULL,
  `ThoiGianXin` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ThoiGianChapNhan` datetime DEFAULT NULL,
  `TrangThai` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `xinduocban`
--

INSERT INTO `xinduocban` (`ID`, `NguoiDung`, `ThoiGianXin`, `ThoiGianChapNhan`, `TrangThai`) VALUES
(1, 1, '2018-06-20 00:14:45', '2018-06-20 00:14:52', 1),
(4, 2, '2018-06-20 09:01:36', '2018-06-20 09:02:04', 1),
(5, 5, '2018-06-19 22:24:17', '2018-06-19 22:24:38', 1),
(6, 6, '2018-06-19 00:57:59', '2018-06-19 00:58:06', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `caplaimatkhau`
--
ALTER TABLE `caplaimatkhau`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NguoiDung` (`NguoiDung`);

--
-- Chỉ mục cho bảng `danhmuc`
--
ALTER TABLE `danhmuc`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `danhsachyeuthich`
--
ALTER TABLE `danhsachyeuthich`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NguoiDung` (`NguoiDung`,`SanPham`) USING BTREE,
  ADD KEY `FK_YeuThich_SanPham` (`SanPham`);

--
-- Chỉ mục cho bảng `daugia`
--
ALTER TABLE `daugia`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_DauGia_SanPham` (`SanPham`),
  ADD KEY `FK_DauGia_NguoiDung` (`NguoiRaGia`);

--
-- Chỉ mục cho bảng `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `USER_ID` (`USER_ID`,`USERNAME`);

--
-- Chỉ mục cho bảng `mota`
--
ALTER TABLE `mota`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_MoTa_SanPham` (`SanPham`);

--
-- Chỉ mục cho bảng `nhanxet`
--
ALTER TABLE `nhanxet`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NguoiNhanXet` (`NguoiNhanXet`,`SanPham`,`LoaiNX`),
  ADD KEY `FK_DuocNhanXet_NguoiDung` (`NguoiDuocNhanXet`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_SanPham_DanhMuc` (`DanhMuc`),
  ADD KEY `FK_SanPham_NguoiBan` (`NguoiBan`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `xinduocban`
--
ALTER TABLE `xinduocban`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `TrangThai` (`TrangThai`,`NguoiDung`) USING BTREE,
  ADD KEY `FK_XinBan_NguoiDung` (`NguoiDung`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT cho bảng `caplaimatkhau`
--
ALTER TABLE `caplaimatkhau`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `danhmuc`
--
ALTER TABLE `danhmuc`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `danhsachyeuthich`
--
ALTER TABLE `danhsachyeuthich`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `daugia`
--
ALTER TABLE `daugia`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT cho bảng `login`
--
ALTER TABLE `login`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `mota`
--
ALTER TABLE `mota`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `nhanxet`
--
ALTER TABLE `nhanxet`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `xinduocban`
--
ALTER TABLE `xinduocban`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `caplaimatkhau`
--
ALTER TABLE `caplaimatkhau`
  ADD CONSTRAINT `FK_CapMatKhau_NguoiDung` FOREIGN KEY (`NguoiDung`) REFERENCES `user` (`ID`);

--
-- Các ràng buộc cho bảng `danhsachyeuthich`
--
ALTER TABLE `danhsachyeuthich`
  ADD CONSTRAINT `FK_YeuThich_NguoiDung` FOREIGN KEY (`NguoiDung`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `FK_YeuThich_SanPham` FOREIGN KEY (`SanPham`) REFERENCES `sanpham` (`ID`);

--
-- Các ràng buộc cho bảng `daugia`
--
ALTER TABLE `daugia`
  ADD CONSTRAINT `FK_DauGia_NguoiDung` FOREIGN KEY (`NguoiRaGia`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `FK_DauGia_SanPham` FOREIGN KEY (`SanPham`) REFERENCES `sanpham` (`ID`);

--
-- Các ràng buộc cho bảng `mota`
--
ALTER TABLE `mota`
  ADD CONSTRAINT `FK_MoTa_SanPham` FOREIGN KEY (`SanPham`) REFERENCES `sanpham` (`ID`);

--
-- Các ràng buộc cho bảng `nhanxet`
--
ALTER TABLE `nhanxet`
  ADD CONSTRAINT `FK_DuocNhanXet_NguoiDung` FOREIGN KEY (`NguoiDuocNhanXet`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `FK_NhanXet_NguoiDung` FOREIGN KEY (`NguoiNhanXet`) REFERENCES `user` (`ID`);

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `FK_SanPham_DanhMuc` FOREIGN KEY (`DanhMuc`) REFERENCES `danhmuc` (`ID`),
  ADD CONSTRAINT `FK_SanPham_NguoiBan` FOREIGN KEY (`NguoiBan`) REFERENCES `user` (`ID`);

--
-- Các ràng buộc cho bảng `xinduocban`
--
ALTER TABLE `xinduocban`
  ADD CONSTRAINT `FK_XinBan_NguoiDung` FOREIGN KEY (`NguoiDung`) REFERENCES `user` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
