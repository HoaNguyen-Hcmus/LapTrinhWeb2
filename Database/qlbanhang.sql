-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 20, 2018 lúc 06:30 PM
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
(1, 'Nguyễn Quang Huy', '748/16/6 Hồng Bàng Quận 11', 'huydeptrai@ahihi.com', '0123456789');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `caplaimatkhau`
--

CREATE TABLE `caplaimatkhau` (
  `ID` int(11) NOT NULL,
  `NguoiDung` int(11) NOT NULL,
  `ThoiGian` datetime NOT NULL,
  `TrangThai` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhmuc`
--

CREATE TABLE `danhmuc` (
  `ID` int(11) NOT NULL,
  `Ten` varchar(200) NOT NULL,
  `TrangThai` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhsachyeuthich`
--

CREATE TABLE `danhsachyeuthich` (
  `ID` int(11) NOT NULL,
  `NguoiDung` int(11) NOT NULL,
  `SanPham` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `TrangThaiKick` tinyint(1) NOT NULL,
  `CoThangCuoc` tinyint(1) NOT NULL,
  `ThoiGianDuaRa` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', '2018-05-16 13:54:26', 0, 1),
(2, 'huynvp', 'e10adc3949ba59abbe56e057f20f883e', '2018-05-19 20:58:33', 0, 0),
(3, 'huynvp', 'e10adc3949ba59abbe56e057f20f883e', '2018-05-19 20:58:42', 0, 2);

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
  `DiemDanhGia` int(11) NOT NULL DEFAULT '100',
  `TYPE` tinyint(1) NOT NULL COMMENT 'Người mua và người bán'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `xinduocban`
--

CREATE TABLE `xinduocban` (
  `ID` int(11) NOT NULL,
  `NguoiDung` int(11) NOT NULL,
  `ThoiGian` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TrangThai` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  ADD KEY `FK_CapMatKhau_NguoiDung` (`NguoiDung`);

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
  ADD KEY `FK_YeuThich_SanPham` (`SanPham`),
  ADD KEY `FK_YeuThich_NguoiDung` (`NguoiDung`);

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
  ADD KEY `FK_XinBan_NguoiDung` (`NguoiDung`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `caplaimatkhau`
--
ALTER TABLE `caplaimatkhau`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `danhmuc`
--
ALTER TABLE `danhmuc`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `danhsachyeuthich`
--
ALTER TABLE `danhsachyeuthich`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `daugia`
--
ALTER TABLE `daugia`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `login`
--
ALTER TABLE `login`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `mota`
--
ALTER TABLE `mota`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `nhanxet`
--
ALTER TABLE `nhanxet`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `xinduocban`
--
ALTER TABLE `xinduocban`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

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
