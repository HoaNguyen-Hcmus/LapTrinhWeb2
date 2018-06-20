-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 20, 2018 lúc 08:23 PM
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
(1, 'Điện thoại', 1, '2018-06-21 00:26:40', NULL),
(2, 'Máy tính xách tay', 1, '2018-06-21 00:26:51', NULL),
(3, 'Ti vi', 1, '2018-06-21 00:27:22', NULL);

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
  `GiaDauTuDong` decimal(10,0) NOT NULL DEFAULT '0',
  `TrangThaiKick` tinyint(1) NOT NULL DEFAULT '0',
  `CoThangCuoc` tinyint(1) NOT NULL DEFAULT '0',
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
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', '2018-05-17 13:54:00', 0, 101),
(2, 'nqhuy', 'e10adc3949ba59abbe56e057f20f883e', '2018-06-21 00:24:50', 0, 1),
(3, 'nxhieu', 'e10adc3949ba59abbe56e057f20f883e', '2018-06-21 00:25:39', 0, 2),
(4, 'nvhoa', 'e10adc3949ba59abbe56e057f20f883e', '2018-06-21 00:25:57', 0, 3);

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
(1, 1, '<h2><a href=\"https://www.thegioididong.com/dtdd/samsung-galaxy-s9-plus-128gb-vang-dong\">Samsung Galaxy S9 Plus 128GB Hoàng Kim</a>, siêu phẩm smartphone hàng đầu trong thế giới Android đã ra mắt với màn hình vô cực, camera chuyên nghiệp như máy ảnh và hàng loạt những tính năng cao cấp đầy hấp dẫn.</h2><h3><strong>Thiết kế hoàn thiện hơn</strong></h3><p>Không có một sự lột xác về thiết kế,&nbsp;<a href=\"https://www.thegioididong.com/dtdd/samsung-galaxy-s9-plus-128gb-vang-dong\">Samsung Galaxy S9 Plus</a>&nbsp;năm nay chỉ cải tiến một vài điểm thiết kế đã quá hoàn hảo từ thế hệ Galaxy S8 trước đây. Vẫn là khung kim loại kết hợp 2 mặt kính cường lực được bo cong các cạnh đầy \"quyến rũ\" và hiện đại.</p><p>\"Màn hình vô cực\" trên Samsung S9 Plus được làm mỏng hơn ở các cạnh viền cho trải nghiệm sử dụng ấn tượng hơn, kích thước máy thu gọn lại giúp cầm nắm sử dụng thuận tiện.</p><h3>Màn hình siêu nét</h3><p>Đặc trưng là màn hình lớn nên chiếc Samsung Galaxy S9 Plus sẽ sở hữu màn hình có kích thước 6.2 inch với độ phân giải&nbsp;<a href=\"https://www.thegioididong.com/tin-tuc/do-phan-giai-man-hinh-qhd-hd-fullhd-2k-4k-la-gi--592178#2k\">2K+ (1440 x 2960 Pixels)</a>&nbsp;cho chất lượng hiển thị siêu sắc nét.</p><p>Máy vẫn sẽ trung thành với tấm nền&nbsp;<a href=\"https://www.thegioididong.com/hoi-dap/man-hinh-super-amoled-la-gi-905770\">Super AMOLED</a>&nbsp;và được bảo vệ bởi tấm kính cường lực&nbsp;Corning Gorilla Glass 5 cao cấp.</p><p>&nbsp;</p><p>&nbsp;</p>', '2018-06-21 00:31:41'),
(2, 2, '<h3><strong>Nokia 9</strong></h3><p>Nokia 9 is a rumored smartphone and the following mentioned specs are based on leaks, rumors and latest reports.</p><p>Nokia 9&nbsp;comes with Android 8.0&nbsp;(Oreo) OS, 5.5&nbsp;inches&nbsp; AMOLED&nbsp;LCD and&nbsp;1440 x 2560 pixels resolution. It has Tempered Blue, Polished Blue, Steel, Polished Copper colors,&nbsp;Single SIM (Nano-SIM) or Hybrid Dual SIM (Nano-SIM, dual stand-by) Slot supports 2G, 3G and 4G LTE network.</p><p>The smartphone has Dual 13MP rear camera having&nbsp;Geo-tagging, touch focus, face detection, HDR&nbsp;and panorama features and Dual 5MP + 5MP&nbsp;front camera for selfie experience.</p><p>Nokia 9 has&nbsp;Octa-core (4x2.45 GHz Kryo &amp; 4x1.9 GHz Kryo) processor,&nbsp;Qualcomm MSM8998 Snapdragon 835 chipset and Adreno 540&nbsp;GPU.</p><p>It has 4GB&nbsp;RAM and 64/128 GB internal Storage, microSD, up to 256 GB (uses SIM 2 slot)&nbsp;. It brings Bluetooth 5.0, A2DP, LE&nbsp;+ v3.1, Type-C reversible connector USB and 3.5 mm Audio jack.</p><p>It has Li-lon, 3250 mAh Non-removable&nbsp;battery with fast charging.</p><p>The smartphone has Fingerprint, accelerometer, gyro, proximity, compass, heart rate&nbsp;Sensors.</p>', '2018-06-21 00:34:33'),
(3, 3, '<p>A mid-range pride</p><p><strong>Display and Configuration</strong></p><p>The Sony Xperia R1 flaunts a 5.2-inch LED touchscreen display, which exhibits an HD resolution of 720 x 1,280 pixel. The capacitive touchscreen display responds well to multi-touch. At the heart, the smartphone features an octa-core Cortex A53 processor, which is capable of clocking a speed of 1.4GHz. It is further aided by a 2GB RAM and an inbuilt Adreno 505 graphics unit to provide seamless performance during multi-tasking.</p><p><strong>Camera and Storage</strong></p><p>The Sony Xperia R1 is equipped with a good quality 13MP primary camera that is further enhanced with the help of Hybrid autofocus, LED flash, ISO control, High Dynamic Range mode which can together process images of 4128 x 3096 pixels and shoots 30fps videos. At the front-end of the device stacked is the 8MP selfie camera, which aids good selfies and useful to make video calls. The smartphone is equipped with an internal storage memory of 16GB, which can be further expanded up to a massive 256GB capacity with the help of an external microSD card.</p><p><strong>Battery and Connectivity</strong></p><p>The Sony Xperia R1 is fuelled by a Li-Ion battery, which has a capacity of 2,620mAh to render some good amount of backup for hours to keep you engaged with your entertainment device. In the connectivity and networking department, the smartphone offers dual SIM slots, 4G voice over LTE support, Wi-Fi 802.11, b/g/n with hotspot feature, a GPS, Bluetooth v4.2, and a type-C USB port. The sensors onboard include a Light sensor, a Proximity sensor and an Accelerometer.</p>', '2018-06-21 00:37:26'),
(4, 4, '<h3><strong>Camera trước tăng lên 7 MP</strong></h3><p>Một sự cải thiện đáng kể so với iPhone 6s trước đó, những tấm ảnh chụp selfie của bạn càng thêm độ chi tiết và sắc nét, bộ nhớ lớn 32 GB cũng giúp bạn thoải mái chụp và lưu trữ ảnh mà không lo hết dung lượng để lưu.</p><p>Cùng với đó là tính năng chụp Retina Flash giúp bạn chụp ảnh tốt hơn ở điều kiện thiếu sáng.</p><p>Ngoài ra, camera phía sau đã được thiết kế gọn gàng với đường bo mềm mại hơn, hạn chế tối đa trầy xước cho ống kính.</p><h3><strong>Chuẩn chống nước mới</strong></h3><p>Cuối cùng thì&nbsp;<a href=\"https://www.thegioididong.com/dtdd-apple-iphone\">iPhone</a>&nbsp;7 cũng được trang bị chuẩn chống nước cao cấp, mang tới sự an tâm lớn cho người dùng khi vô tình để máy dính nước mưa hay làm đổ nước.</p>', '2018-06-21 00:41:32'),
(5, 5, '<h3><a href=\"https://didongthongminh.vn/tin-moi-nhat/iphone-4s-trang-chua-kich-hoat-cuc-hut-khach-voi-gia-3590000d-n969\">iPhone 4S Chưa Kích Hoạt cực Hút khách</a></h3><p>Iphone 4S chưa kích hoạt, trôi bảo hành mới 100% có điểm gì khác với iphone 4S thông thường? cùng Di Động Thông Minh đi tìm hiểu chi tiết nhé! Sau&nbsp;cơn bão iphone 5C,5, 5s lock với mức giá rẻ hấp dẫn đã càn quét thị trường di động, thì một cơn bão mới nữa mang tên táo khuyết lại bắt đầu hình thành và thu hút không ít người dùng dù chỉ mới cập bến didongthongmih mang tên iphone…</p>', '2018-06-21 00:44:54'),
(6, 6, '<p><strong>Bundle </strong>: W5651107RTHW10-3567-Grey-Win10</p><p><strong>Color Option </strong>: Grey</p><p><strong>Speed </strong>: 3M Cache, up to 3.10 GHz</p><p><strong>Optical Drive </strong>: DVD RW</p><p><strong>OS </strong>: Windows 10 Home 64bit + McAfee® MultiDevice 15 month subscription</p><p><strong>Bluetooth </strong>: 802.11ac + Bluetooth 4.1, Dual Band 2.4&amp;5 GHz</p><p><strong>Webcam </strong>: Integrated Widescreen HD 720P Webcam with Dual digital microphone array</p><p><strong>Batterry </strong>: 40 WHr, 4-Cell Battery (removable)</p><p><strong>Warranty </strong>: 1Yr Premium Support: Onsite Service - Retail</p><p><strong>Carrying Case </strong>: Dell Essential Backpack 15</p>', '2018-06-21 00:48:49'),
(7, 7, '<h3>Mô tả chi tiết</h3><p><strong>ASUS ZENBOOK 3 MÁY TÍNH XÁCH TAY HÀNG ĐẦU THẾ GIỚI VỚI HIỆU NĂNG KHÔNG ĐỐI THỦ.</strong></p><p>Nếu nói rằng ZenBook 3 chỉ là thế hệ mới nhất của ZenBook thì đó sẽ là đánh giá quá thấp về sản phẩm này — đây thật sự là thế hệ ZenBook được sáng tạo cho kỷ nguyên mới của điện toán di động. Mỗi linh kiện chính xác và chi tiết gia công tinh xảo đều đã được thiết kế và chế tác lại hoàn toàn, để ZenBook 3 là chiếc máy tính ZenBook tinh tế nhất từ trước đến nay. Chiếc máy nhẹ hơn, mỏng hơn, bền hơn, mạnh mẽ vượt trội với Intel® Core™ i7 processor — cùng thiết kế vô cùng đẹp mắt. Nói một cách đơn giản, đây là chiếc máy tính xách tay tuyệt vời nhất trên thế giới. Hãy cùng làm quen với ZenBook 3.</p>', '2018-06-21 00:50:32'),
(8, 8, '<p>Asus ra mắt ZenBook 3 Deluxe UX490UA , 14″ nhưng viền siêu mỏng nên kích thướt bằng 13″</p><p>ZenBook 3 Deluxe (UX490UA) vẫn có thiết kế mỏng nhỏ nhẹ giống như <a href=\"http://maytinhxachtaymy.us/danh-muc/laptop/asus/zenbook/\">ZenBook</a> 3 nhưng màn hình tăng lên thành 14″ thay vì 12,5″, độ phân giải là Full-HD và được phủ kính Corning Gorilla Glass 5. Nhờ viền mỏng nên kích thước của sản phẩm chỉ tương đương một chiếc máy tính 13″ mà thôi. Cấu hình của ZenBook 3 Deluxe bao gồm CPU Core i7-7500U, RAM 16GB, SSD tối đa 1TB, 3 cổng USB-C trong đó có 2 cổng hỗ trợ Thunderbolt 3. Máy vẫn duy trì cảm biến vân tay nằm ngay trackpad giống như người anh em nhỏ hơn. Tất cả được gói gọn trong thân hình bằng nhôm mỏng chỉ 12,9mm và nhẹ 1,09kg, rất ấn tượng. Giá bán của máy là 1699$, có hai màu xanh dương-vàng hoặc xám, bắt đầu bán ra trong tháng 5 năm nay.</p>', '2018-06-21 00:54:26'),
(9, 9, '<h2>Descripción del producto</h2><ul><li>CPU : INTEL I7 – 3,3GHZ TURBO</li><li>MEM. RAM. : 4GB</li><li>DISCO DURO: 128GB SSD</li><li>PANTALLA : 13,3″ 1440X900</li><li>TACTIL : NO</li><li>UNIDAD OPTICA: NO</li><li>BLUETOOTH: SI</li><li>OTROS : USB 3,0</li><li>GARANTÍA 1 AÑO</li></ul>', '2018-06-21 01:00:40'),
(10, 10, '<p>Spesifikasi Acer E5-475 :</p><ul><li>Operating Sistem : Windows 10 Home</li><li>Prosesor : Intel Core i3-6006U (3MB cache, 2.0GHz)</li><li>HDD 1TB</li><li>RAM 4GB DDR4</li><li>Intel HD Graphics 520</li><li>ODD</li><li>Bluetooth 4.0</li><li>Wifi</li><li>Webcam</li><li>Display 14” HD</li></ul>', '2018-06-21 01:03:25'),
(11, 11, '<h2>Lenovo ThinkPad X1 Carbon Brief Description</h2><p>Lenovo ThinkPad X1 Carbon is a stylish and powerful Everyday Laptop and is powered by Intel Core i7 processor clocked at a speed of 2.1 Ghz and a 8 DDR3 RAM,thereby making it possible to store ample amount of data.All the above features ensure that you breeze through all your tasks throughout the day.The connectivity options available on the device are WiFi,Bluetooth,2xUSB 3.0 Ports,HDMI,Digital Media Reader.It supports an optical Drive, comes with Adaptive Keyboard.It is backed up by a Li-Ion 6 Cell battery that keeps the device running for upto 9 hours or a considerable amount of time.It is loaded with Stereo Speakers and Dolby Home Theater v4 for a great audio experience.</p>', '2018-06-21 01:05:05'),
(12, 12, '<h3>Mẫu thiết kế đẹp, sang trọng</h3><p><a href=\"http://mayvitinhcu.net/laptop\"><strong>Laptop</strong></a><strong> HP Pavilion 14 AL115TU</strong> được thiết kế theo phong cách đơn giản nhưng hiện đại, cụ thể là các góc cạnh được bo tròn nhẹ, logo được thiết kế nổi trên mặt lưng nắp máy, mang đến vẻ đẹp dịu dàng nhưng không kém phần sang trọng và năng động. Bản lề của chiếc <a href=\"http://mayvitinhcu.net/laptop/laptop-hp/\"><strong>laptop HP</strong></a><strong> Pavilion 14</strong> AL115TU được đúc kết một cách chắc chắn, tinh tế và cứng cáp, giúp người dùng hoàn toàn an tâm về độ bền của nó.</p>', '2018-06-21 01:06:49'),
(13, 13, '<p>Máy được trang bị cấu hình:</p><ul><li>CPU: Intel Core i7 \"Sandy Bridge\" with vPro technology 2640M 2.8Ghz 4x2.8ghz Turbo Boost 3.5. Ghz-(Cache 3MB - Bus 1333Mhz.)</li><li>Chipset: Intel QM67 Express Chipsets</li><li>Memory: 4GB DDR3 (Bus 1333MHz) (Hổ trợ nâng cấp ram giá rẻ)</li><li>SSD: 128GB (Hàng zin theo máy, truy xuất dữ liệu cực nhanh)</li><li>Optical Drive: DVD-SuperMulti Drive</li><li>VGA: Intel HD Graphics 3000.Display: 14” chống chói Anti-glare LED backlit High Definition HD+ (1600x900) &amp; Ambient light sensor.</li><li>Network: Integrated Intel® 802.11 a/g/n . Lan Integrated 1GBit TX Ethernet + Active Management Technology (AMT) 7.0</li><li>Battery: 6 cell High Capacity sử dụng rất lâu.Weight: 1.99kg.</li><li>Thông tin thêm: Microphone, Speak, Bluetooth, VGA, Display port, USB 3.0, VGA port, eSata.</li><li>Đánh Giá Ngoại Hình: Laptop nhập khẩu từ USA, còn mới 97-98%</li><li>OS: Windows 7 bản quyền setup chuẩn UEFI + Và các ứng dụng theo yêu cầu.</li><li><strong>Bảo hành: Đối với khách hàng EndUsers bảo hành 06 tháng (Bao test đổi-trả không cần lý do trong 03 ngày đầu tiên)</strong></li></ul>', '2018-06-21 01:10:10'),
(14, 14, '<p>MSI GV72 7RD 874XVN (GeForce® GTX 1050, 4GB GDDR5) - CPU : Kaby lake - Intel Core i7 7700HQ(2.8Ghz, 6MB Cache, Up to 3.8Ghz), Chipset : Intel HM175 - Bàn phím : Keyboard by SteelSeries, single backlight KB - OS : PC DOS - RAM : 8GB DDR4(2 khe, nâng cấp tối đa lên 32GB) - Màn hình : 17.3\" Full HD (1920*1080), Anti-Glare - VGA : nVidia Geforce GTX 1050 4GB DDR5 - HDD : 1TB SATA 7200rpm - Wireless + Bluetooth : Intel 3168 Sandy Peak 1 (1x1)+ Bluetooth v4.0 - Pin : 6-cell - Cân nặng : 2.3Kg</p>', '2018-06-21 01:11:48'),
(15, 15, '<p><strong>Descoperiti detaliile cu 4K HDR</strong>Interval dinamic ridicat 4KPentru cea mai buna calitate a imaginii, acest televizor combina stralucirea claritatii 4K cu luminozitatea, culoarea si detaliile intervalului dinamic ridicat (HDR). Zonele care erau anterior ascunse de umbre intunecate si lumina soarelui sunt acum pline de claritate si de detaliu.</p>', '2018-06-21 01:13:32'),
(16, 16, '<h2>Téléviseur&nbsp;Plasma&nbsp;32 Pouces -1366 x 768 px</h2><ul><li>Smart TV :O*</li><li>Curved :-1*</li><li>Désolution:&nbsp;1366 x 768 px</li><li>Définition :HD TV</li></ul><h2>Prix <strong>&nbsp;conseillé (en algerie)</strong>:49200 DA **</h2><p>*&nbsp; O pour Oui, X pour Non</p>', '2018-06-21 01:14:43'),
(17, 17, '<h4>Description:</h4><p>Nokia 1280 versatile was propelled in Walk 2010. The telephone accompanies a 1.36-inch show with a determination of 68 pixels by 98 pixels at a PPI of 87 pixels for each inch.</p><p>that can’t be extended. To the extent the cameras are concerned, the Nokia 1280 packs a No essential camera on the back</p><p>It gauges 107.20 x 45.10 x 15.30 (tallness x width x thickness) and weigh 81.90 grams.</p><p>The Nokia 1280 is a solitary SIM (GSM) versatile that acknowledges a Consistent SIM. Availability choices incorporate FM.</p>', '2018-06-21 01:17:08'),
(18, 18, '<h2><strong>Philips E103 là chiếc điện thoại có mức giá rẻ nhất của hãng Philips có dung lượng pin lớn cho bạn thời gian sử dụng được kéo dài.</strong></h2><h3><strong>Năng lượng dài hơn với pin của Philips E103</strong></h3><p>Dù không thuộc dòng sản phẩm có dung lượng pin khủng, nhưng với dung lượng 1050 mAh <a href=\"https://www.thegioididong.com/dtdd/philips-e103\">Philips E103</a>vẫn dư sức cho bạn thời gian sử dụng kéo dài từ 3 đến 6 ngày (tuỳ vào nhu cầu sử dụng của mỗi người).</p>', '2018-06-21 01:18:35'),
(19, 19, '<p>Chính hãng, nguyên seal, mới 100%</p><p>Miễn phí giao hàng toàn quốc</p><p>Thiết kế: Nguyên khối</p><p>Màn hình: IPS LCD 5.5\" HD (2.5D,Gorilla Glass 4)</p><p>Camera Trước/Sau: 16MP / 13MP</p><p>RAM: 3GB; ROM: 32GB</p><p>Dung lượng pin: 3.075mAh</p><p>Số SIM: 2 SIM</p>', '2018-06-21 01:20:06'),
(20, 20, '<h2>ĐẶC ĐIỂM</h2><p>Cảm biến</p><p>Gia tốc, ánh sáng, con quay hồi chuyển, la bàn số, vân tay</p><p>Tin nhắn</p><p>SMS (threaded view), MMS, Email, Push Email, IM</p><p>Trình duyệt</p><p>HTML5</p><p>Java</p><p>Không</p><p>- Fast battery charging (Quick Charge 3.0)- XviD/MP4/H.264/WMV player- MP3/eAAC+/WMA/WAV/FLAC player- Document editor- Photo/video editor</p>', '2018-06-21 01:21:51');

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
(1, 'Samsung Galaxy S9', '22000000', '25000000', '2018-06-21 00:31:41', '2018-06-21 16:00:00', 1, 1, 0, 1, '100000', 1),
(2, ' Nokia 9', '12000000', '15000000', '2018-06-21 00:34:33', '2018-06-21 17:00:00', 1, 1, 0, 1, '100000', 1),
(3, 'Sany Xperia ', '15000000', '18000000', '2018-06-21 00:37:26', '2018-06-21 17:15:00', 1, 1, 0, 1, '100000', 1),
(4, 'Iphone 7', '19000000', '21000000', '2018-06-21 00:41:32', '2018-06-21 17:20:00', 1, 1, 0, 1, '100000', 1),
(5, 'Iphone 4s', '2290000', '3290000', '2018-06-21 00:44:54', '2018-06-21 17:25:00', 1, 1, 0, 1, '100000', 1),
(6, 'Dell 3567', '1390000', '1690000', '2018-06-21 00:48:49', '2018-06-21 17:26:00', 1, 1, 0, 2, '100000', 1),
(7, 'ASUS ZENBOOK 3', '35690000', '38690000', '2018-06-21 00:50:32', '2018-06-21 17:30:00', 1, 1, 0, 2, '100000', 1),
(8, 'ASUS ZENBOOK 3 DELUX', '34690000', '36690000', '2018-06-21 00:54:26', '2018-06-21 17:30:00', 1, 1, 0, 2, '100000', 1),
(9, 'Macbook Air', '20000000', '30000000', '2018-06-21 01:00:40', '2018-06-21 19:50:00', 1, 3, 0, 2, '100000', 1),
(10, 'Laptop acer', '20000000', '25000000', '2018-06-21 01:03:25', '2018-06-21 19:52:00', 1, 3, 0, 2, '100000', 1),
(11, 'Laptop lenovo', '11000000', '15000000', '2018-06-21 01:05:05', '2018-06-21 19:54:00', 1, 3, 0, 2, '100000', 1),
(12, 'Laptop hp', '6000000', '8000000', '2018-06-21 01:06:49', '2018-06-21 19:55:00', 1, 3, 0, 2, '100000', 1),
(13, 'Laptop Toshiba', '6800000', '8000000', '2018-06-21 01:10:10', '2018-06-21 19:57:00', 1, 3, 0, 2, '100000', 1),
(14, 'Laptop MSI', '23000000', '25000000', '2018-06-21 01:11:48', '2018-06-21 20:50:00', 1, 3, 0, 2, '100000', 1),
(15, 'Ti vi Sony', '13000000', '15000000', '2018-06-21 01:13:32', '2018-06-21 20:51:00', 1, 3, 0, 3, '100000', 1),
(16, 'Ti vi Sámung', '14000000', '16000000', '2018-06-21 01:14:43', '2018-06-21 20:51:00', 1, 3, 0, 3, '100000', 1),
(17, 'Nokia 1280', '200000', '400000', '2018-06-21 01:17:08', '2018-06-21 20:51:00', 1, 3, 0, 1, '50000', 1),
(18, 'Điện thoại Philip', '250000', '300000', '2018-06-21 01:18:35', '2018-06-21 20:53:00', 1, 3, 0, 1, '50000', 1),
(19, 'Điện thoại Oppo', '5000000', '6000000', '2018-06-21 01:20:06', '2018-06-21 20:55:00', 1, 3, 0, 1, '50000', 1),
(20, 'Điện thoại HTC', '17000000', '20000000', '2018-06-21 01:21:50', '2018-06-21 20:57:00', 1, 3, 0, 1, '100000', 1);

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
(1, 'Nguyễn Quang Huy', '123 HB P1 Q11', 'huynvp@gmail.com', '0963852741', 0, 1, 1),
(2, 'Nguyễn Xuân Hiếu', '123 HB P1 Q11', 'nxhieu@gmail.com', '0963852741', 0, 1, 1),
(3, 'Nguyễn Văn Hòa', '123 HB P1 Q11', 'nvhoa@gmail.com', '0963852741', 0, 1, 1);

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
(1, 1, '2018-06-21 00:27:48', '2018-06-21 00:27:54', 1),
(2, 3, '2018-06-21 00:57:55', '2018-06-21 00:58:02', 1);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `mota`
--
ALTER TABLE `mota`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `nhanxet`
--
ALTER TABLE `nhanxet`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `xinduocban`
--
ALTER TABLE `xinduocban`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
