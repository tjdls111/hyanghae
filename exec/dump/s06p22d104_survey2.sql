-- MySQL dump 10.17  Distrib 10.3.24-MariaDB, for Win64 (AMD64)
--
-- Host: stg-yswa-kr-practice-db-master.mariadb.database.azure.com    Database: s06p22d104
-- ------------------------------------------------------
-- Server version	5.6.47.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `survey2`
--

DROP TABLE IF EXISTS `survey2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `survey2` (
  `s_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `s_title` varchar(255) NOT NULL,
  `p_id` bigint(20) NOT NULL,
  `u_seq` bigint(20) NOT NULL,
  PRIMARY KEY (`s_id`),
  KEY `FK3ukuj30kq1s68x57106ys3091` (`p_id`),
  KEY `FKt7qs2dvkd3jrg8xhmyo39mpht` (`u_seq`),
  CONSTRAINT `FK3ukuj30kq1s68x57106ys3091` FOREIGN KEY (`p_id`) REFERENCES `perfume` (`p_id`),
  CONSTRAINT `FKt7qs2dvkd3jrg8xhmyo39mpht` FOREIGN KEY (`u_seq`) REFERENCES `user` (`u_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey2`
--

LOCK TABLES `survey2` WRITE;
/*!40000 ALTER TABLE `survey2` DISABLE KEYS */;
INSERT INTO `survey2` VALUES (9,'2022-04-06 10:11:18','제목없음',439,3),(10,'2022-04-06 10:11:18','제목없음',439,3),(11,'2022-04-06 10:11:28','제목없음',439,3),(24,'2022-04-07 02:04:01','제목없음',447,8),(25,'2022-04-07 02:08:24','제목없음',827,8),(29,'2022-04-07 02:09:16','ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄹ',710,2),(30,'2022-04-07 02:09:16','ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄹ',710,2),(33,'2022-04-07 02:25:59','aaaa',84,8),(53,'2022-04-07 04:50:40','제목없음',873,4),(61,'2022-04-07 04:53:15','우디 생일',216,9),(62,'2022-04-07 04:53:15','우디 생일',216,9),(64,'2022-04-07 04:53:15','우디 생일',216,9),(66,'2022-04-07 05:29:06','제목없음2',1050,6),(67,'2022-04-07 05:30:39','제목없음2',705,6),(68,'2022-04-07 05:47:13','제목없음',710,11),(69,'2022-04-07 06:16:22','제목없음',41,4),(70,'2022-04-07 06:39:53','제목없음',434,4),(71,'2022-04-07 08:27:02','제목없음',484,2),(75,'2022-04-07 09:51:48','엄마 향수',114,5),(76,'2022-04-07 11:17:05','제목없음',705,6),(77,'2022-04-07 21:26:57','설문조사 2',114,5),(78,'2022-04-08 00:46:09','제목없음',710,14),(79,'2022-04-08 00:54:51','제목없음',902,14),(80,'2022-04-08 00:57:26','제목없음',1006,16),(81,'2022-04-08 01:02:10','제목없음',435,14);
/*!40000 ALTER TABLE `survey2` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 10:13:39
