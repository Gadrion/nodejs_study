-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.2.10-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 테이블 pythondb.tbl_epl 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_epl` (
  `rank` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `winPoint` int(11) DEFAULT NULL,
  `win` int(11) DEFAULT NULL,
  `draw` int(11) DEFAULT NULL,
  `lose` int(11) DEFAULT NULL,
  `goals` int(11) DEFAULT NULL,
  `eat` int(11) DEFAULT NULL,
  `diff` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 pythondb.tbl_epl:~20 rows (대략적) 내보내기
/*!40000 ALTER TABLE `tbl_epl` DISABLE KEYS */;
INSERT INTO `tbl_epl` (`rank`, `name`, `total`, `winPoint`, `win`, `draw`, `lose`, `goals`, `eat`, `diff`) VALUES
	(1, '맨체스터 시티 FC', 12, 34, 11, 1, 0, 40, 7, 33),
	(2, '맨체스터 유나이티드 FC', 12, 26, 8, 2, 2, 27, 6, 21),
	(3, '첼시 FC', 12, 25, 8, 1, 3, 23, 10, 13),
	(4, '토트넘 핫스퍼 FC', 12, 23, 7, 2, 3, 20, 9, 11),
	(5, '리버풀 FC', 12, 22, 6, 4, 2, 24, 17, 7),
	(6, '아스널 FC', 12, 22, 7, 1, 4, 22, 16, 6),
	(7, '번리 FC', 12, 22, 6, 4, 2, 12, 9, 3),
	(8, '왓포드 FC', 12, 18, 5, 3, 4, 19, 21, -2),
	(9, '브라이튼 앤 호브 알비온 FC', 12, 16, 4, 4, 4, 13, 13, 0),
	(10, '허더즈필드 타운 FC', 12, 15, 4, 3, 5, 8, 17, -9),
	(11, '뉴캐슬 유나이티드 FC', 12, 14, 4, 2, 6, 11, 14, -3),
	(12, '레스터 시티 FC', 12, 13, 3, 4, 5, 16, 18, -2),
	(13, 'AFC 본머스', 12, 13, 4, 1, 7, 11, 14, -3),
	(14, '사우샘프턴 FC', 12, 13, 3, 4, 5, 9, 14, -5),
	(15, '스토크 시티 FC', 12, 13, 3, 4, 5, 15, 24, -9),
	(16, '에버턴 FC', 12, 12, 3, 3, 6, 12, 24, -12),
	(17, '웨스트 브로미치 알비온 FC', 12, 10, 2, 4, 6, 9, 18, -9),
	(18, '웨스트햄 유나이티드 FC', 12, 9, 2, 3, 7, 11, 25, -14),
	(19, '스완지 시티 AFC', 12, 8, 2, 2, 8, 7, 15, -8),
	(20, '크리스탈 팰리스 FC', 12, 5, 1, 2, 9, 6, 24, -18);
/*!40000 ALTER TABLE `tbl_epl` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
