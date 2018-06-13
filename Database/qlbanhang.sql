-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 13, 2018 lúc 05:16 AM
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
(1, 'Điện thoại', 1, '2018-05-25 14:38:18', NULL),
(2, 'Máy tính', 1, '2018-05-25 14:38:18', '2018-05-26 10:50:51'),
(3, 'Test', 0, '2018-05-26 10:20:36', '2018-05-26 10:48:29'),
(4, 'Test', 0, '2018-05-26 10:20:45', '2018-05-26 15:40:24'),
(5, '', 0, '2018-05-26 10:21:27', '2018-05-26 10:52:09'),
(6, '', 0, '2018-05-26 10:21:50', NULL),
(7, 'Phim ảnh', 0, '2018-05-26 10:22:01', NULL),
(8, '', 0, '2018-05-26 10:23:35', NULL),
(9, 'Hình ảnh', 1, '2018-05-26 15:40:03', NULL),
(10, 'Test', 0, '2018-05-26 15:40:19', NULL);

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
(1, 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `daugia`
--

CREATE TABLE `daugia` (
  `ID` int(11) NOT NULL,
  `SanPham` int(11) NOT NULL,
  `NguoiRaGia` int(11) NOT NULL,
  `GiaDuaRa` decimal(10,0) NOT NULL,
  `GiaDauTuDong` decimal(10,0) NOT NULL,
  `TrangThaiKick` tinyint(1) NOT NULL DEFAULT '0',
  `CoThangCuoc` tinyint(1) NOT NULL DEFAULT '0',
  `ThoiGianDuaRa` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `daugia`
--

INSERT INTO `daugia` (`ID`, `SanPham`, `NguoiRaGia`, `GiaDuaRa`, `GiaDauTuDong`, `TrangThaiKick`, `CoThangCuoc`, `ThoiGianDuaRa`) VALUES
(1, 1, 3, '17000000', '0', 0, 0, '2018-06-10 22:10:16'),
(2, 2, 3, '17000000', '17000000', 0, 0, '2018-06-10 22:10:37'),
(3, 3, 3, '17500000', '17500000', 0, 0, '2018-06-10 22:11:04'),
(4, 1, 2, '17200000', '17200000', 0, 0, '2018-06-10 22:11:21');

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
(4, 'nvhoa', 'e10adc3949ba59abbe56e057f20f883e', '2018-06-11 22:25:38', 0, 2);

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
(1, 1, '<p><a href=\"https://www.thegioididong.com/laptop/acer-aspire-a315-51-39dj-i3-7130u-nxgnpsv030\"><strong>Laptop Acer Aspire A315 51 39DJ</strong></a><strong> là mẫu máy tính tầm trung trang bị chip Intel Core i3 Kabylake (thế hệ 7) hoạt động rất ổn định và có một thiết kế mang đậm chất mạnh mẽ, tinh tế.</strong></p><p><strong>Thiết kế góc cạnh</strong></p><p>Mẫu <a href=\"https://www.thegioididong.com/laptop-acer\">laptop Acer</a> mình muốn giới thiệu là mẫu <a href=\"https://www.thegioididong.com/laptop\">máy tính xách tay</a> nằm trong phân khúc tầm trung, có thiết kế bằng chất liệu vỏ nhựa, 4 góc cạnh vuông vức giúp máy mạnh mẽ và đầy tinh tế. Máy có trọng lượng 2.1 kg và dày 21.6 mm giúp bạn dễ dàng khi di chuyển máy mọi lúc, mọi nơi.</p><p><strong>Cấu hình thế hệ thứ 7</strong></p><p>Mẫu <a href=\"https://www.thegioididong.com/laptop-acer?g=core-i3\">laptop Acer Core i3</a> này thuộc <a href=\"https://www.thegioididong.com/hoi-dap/bo-xu-ly-intel-core-i3-i5-i7-the-he-thu-7-952583\">CPU thế hệ thứ 7</a> của Intel cho khả năng vận hành hệ thống ổn định. Cùng <a href=\"https://www.thegioididong.com/hoi-dap/ram-ddr4-la-gi-882173\">RAM DDR4</a> 4 GB giúp máy hoạt động tốt trong các trường hợp mở nhiều ứng dụng. Ổ cứng được sử dụng ở đây là loại <a href=\"https://www.thegioididong.com/hoi-dap/hdd-la-gi-922791\">HDD</a> 1 TB thì khá thoải mái để bạn lưu trữ dữ liệu cá nhân.</p><p><strong>Màn hình lớn</strong></p><p>Đi kèm với thân máy là một màn hình tích hợp 15.6 inch to lớn, dễ nhìn và cùng với độ phân giải <a href=\"https://www.thegioididong.com/hoi-dap/man-hinh-fhd-la-gi-956294\">Full HD</a>cho bạn trải nghiệm không gian thoải mái để giải trí hay làm việc.</p><p><strong>Bàn phím kích thước to rõ</strong></p><p>Với kích thước bàn phím lớn cho bạn thoải mái nhập liệu văn bản, và cụm số quen thuộc như trên máy tính để bàn sẽ giúp bạn làm việc nhanh hơn.</p><p><strong>Multi Touchpad</strong></p><p><a href=\"https://www.thegioididong.com/hoi-dap/multi-touchpad-la-gi-920569\">Touchpad</a> thông minh chỉ nhận lệnh khi phát hiện đó là đầu ngón tay đang điều khiển và hạn chế được việc lòng bàn tay vô tình chạm vào bị tương tác sai.</p>', '2018-06-10 10:54:29'),
(2, 2, '<p><a href=\"https://www.thegioididong.com/laptop/acer-aspire-a315-51-39dj-i3-7130u-nxgnpsv030\"><strong>Laptop Acer Aspire A315 51 39DJ</strong></a><strong> là mẫu máy tính tầm trung trang bị chip Intel Core i3 Kabylake (thế hệ 7) hoạt động rất ổn định và có một thiết kế mang đậm chất mạnh mẽ, tinh tế.</strong></p><p><strong>Thiết kế góc cạnh</strong></p><p>Mẫu <a href=\"https://www.thegioididong.com/laptop-acer\">laptop Acer</a> mình muốn giới thiệu là mẫu <a href=\"https://www.thegioididong.com/laptop\">máy tính xách tay</a> nằm trong phân khúc tầm trung, có thiết kế bằng chất liệu vỏ nhựa, 4 góc cạnh vuông vức giúp máy mạnh mẽ và đầy tinh tế. Máy có trọng lượng 2.1 kg và dày 21.6 mm giúp bạn dễ dàng khi di chuyển máy mọi lúc, mọi nơi.</p><p><strong>Cấu hình thế hệ thứ 7</strong></p><p>Mẫu <a href=\"https://www.thegioididong.com/laptop-acer?g=core-i3\">laptop Acer Core i3</a> này thuộc <a href=\"https://www.thegioididong.com/hoi-dap/bo-xu-ly-intel-core-i3-i5-i7-the-he-thu-7-952583\">CPU thế hệ thứ 7</a> của Intel cho khả năng vận hành hệ thống ổn định. Cùng <a href=\"https://www.thegioididong.com/hoi-dap/ram-ddr4-la-gi-882173\">RAM DDR4</a> 4 GB giúp máy hoạt động tốt trong các trường hợp mở nhiều ứng dụng. Ổ cứng được sử dụng ở đây là loại <a href=\"https://www.thegioididong.com/hoi-dap/hdd-la-gi-922791\">HDD</a> 1 TB thì khá thoải mái để bạn lưu trữ dữ liệu cá nhân.</p><p><strong>Màn hình lớn</strong></p><p>Đi kèm với thân máy là một màn hình tích hợp 15.6 inch to lớn, dễ nhìn và cùng với độ phân giải <a href=\"https://www.thegioididong.com/hoi-dap/man-hinh-fhd-la-gi-956294\">Full HD</a>cho bạn trải nghiệm không gian thoải mái để giải trí hay làm việc.</p><p><strong>Bàn phím kích thước to rõ</strong></p><p>Với kích thước bàn phím lớn cho bạn thoải mái nhập liệu văn bản, và cụm số quen thuộc như trên máy tính để bàn sẽ giúp bạn làm việc nhanh hơn.</p><p><strong>Multi Touchpad</strong></p><p><a href=\"https://www.thegioididong.com/hoi-dap/multi-touchpad-la-gi-920569\">Touchpad</a> thông minh chỉ nhận lệnh khi phát hiện đó là đầu ngón tay đang điều khiển và hạn chế được việc lòng bàn tay vô tình chạm vào bị tương tác sai.</p>', '2018-06-10 11:14:57'),
(3, 3, '<p><a href=\"https://www.thegioididong.com/laptop/acer-aspire-a315-51-39dj-i3-7130u-nxgnpsv030\"><strong>Laptop Acer Aspire A315 51 39DJ</strong></a><strong> là mẫu máy tính tầm trung trang bị chip Intel Core i3 Kabylake (thế hệ 7) hoạt động rất ổn định và có một thiết kế mang đậm chất mạnh mẽ, tinh tế.</strong></p><p><strong>Thiết kế góc cạnh</strong></p><p>Mẫu <a href=\"https://www.thegioididong.com/laptop-acer\">laptop Acer</a> mình muốn giới thiệu là mẫu <a href=\"https://www.thegioididong.com/laptop\">máy tính xách tay</a> nằm trong phân khúc tầm trung, có thiết kế bằng chất liệu vỏ nhựa, 4 góc cạnh vuông vức giúp máy mạnh mẽ và đầy tinh tế. Máy có trọng lượng 2.1 kg và dày 21.6 mm giúp bạn dễ dàng khi di chuyển máy mọi lúc, mọi nơi.</p><p><strong>Cấu hình thế hệ thứ 7</strong></p><p>Mẫu <a href=\"https://www.thegioididong.com/laptop-acer?g=core-i3\">laptop Acer Core i3</a> này thuộc <a href=\"https://www.thegioididong.com/hoi-dap/bo-xu-ly-intel-core-i3-i5-i7-the-he-thu-7-952583\">CPU thế hệ thứ 7</a> của Intel cho khả năng vận hành hệ thống ổn định. Cùng <a href=\"https://www.thegioididong.com/hoi-dap/ram-ddr4-la-gi-882173\">RAM DDR4</a> 4 GB giúp máy hoạt động tốt trong các trường hợp mở nhiều ứng dụng. Ổ cứng được sử dụng ở đây là loại <a href=\"https://www.thegioididong.com/hoi-dap/hdd-la-gi-922791\">HDD</a> 1 TB thì khá thoải mái để bạn lưu trữ dữ liệu cá nhân.</p><p><strong>Màn hình lớn</strong></p><p>Đi kèm với thân máy là một màn hình tích hợp 15.6 inch to lớn, dễ nhìn và cùng với độ phân giải <a href=\"https://www.thegioididong.com/hoi-dap/man-hinh-fhd-la-gi-956294\">Full HD</a>cho bạn trải nghiệm không gian thoải mái để giải trí hay làm việc.</p><p><strong>Bàn phím kích thước to rõ</strong></p><p>Với kích thước bàn phím lớn cho bạn thoải mái nhập liệu văn bản, và cụm số quen thuộc như trên máy tính để bàn sẽ giúp bạn làm việc nhanh hơn.</p><p><strong>Multi Touchpad</strong></p><p><a href=\"https://www.thegioididong.com/hoi-dap/multi-touchpad-la-gi-920569\">Touchpad</a> thông minh chỉ nhận lệnh khi phát hiện đó là đầu ngón tay đang điều khiển và hạn chế được việc lòng bàn tay vô tình chạm vào bị tương tác sai.</p>', '2018-06-10 11:15:18'),
(4, 1, '<p>Mô tả 2 </p>', '2018-06-10 20:29:16');

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
  `TrangThai` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(1, 'Laptop acer', '13000000', '19000000', '2018-06-10 10:54:29', '2018-06-12 00:00:00', 1, 1, 0, 2, '2000', 0),
(2, 'Laptop acer', '13000000', '19000000', '2018-06-10 11:14:57', '2018-06-12 00:00:00', 1, 1, 0, 2, '2000', 0),
(3, 'Laptop acer', '13000000', '19000000', '2018-06-10 11:15:18', '2018-06-12 00:00:00', 1, 2, 0, 2, '2000', 0);

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
(1, 'Nguyễn Quang Huy', '145 HB', 'huyqn@gmail.com', '0123456789', 0, 1, 1),
(2, 'Nguyễn Văn Hòa', 'djsahd', 'hjhh', '54545', 0, 0, 1),
(3, 'Nguyễn Xuân Hiếu', '455', '54', '545', 0, 0, 1),
(4, 'Nguyễn Văn Hòa', 'ew', 'cotinhtoan@gmail.com', '0906150150', 0, 1, 1);

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
(1, 1, '2018-05-25 14:56:18', '2018-06-07 00:00:00', 1),
(4, 2, '2018-05-25 15:00:31', '2018-05-25 15:02:06', 1);

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
  ADD KEY `FK_NhanXet_NguoiDung` (`NguoiNhanXet`),
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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `danhsachyeuthich`
--
ALTER TABLE `danhsachyeuthich`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `daugia`
--
ALTER TABLE `daugia`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `login`
--
ALTER TABLE `login`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `mota`
--
ALTER TABLE `mota`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `nhanxet`
--
ALTER TABLE `nhanxet`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `xinduocban`
--
ALTER TABLE `xinduocban`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
