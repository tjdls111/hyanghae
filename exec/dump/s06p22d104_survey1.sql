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
-- Table structure for table `survey1`
--

DROP TABLE IF EXISTS `survey1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `survey1` (
  `s_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `gender` int(11) NOT NULL,
  `mood` int(11) NOT NULL,
  `season` int(11) NOT NULL,
  `s_title` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  `tpo` int(11) NOT NULL,
  `u_seq` bigint(20) NOT NULL,
  PRIMARY KEY (`s_id`),
  KEY `FKcm261e432ybugjwe3dn1di299` (`u_seq`),
  CONSTRAINT `FKcm261e432ybugjwe3dn1di299` FOREIGN KEY (`u_seq`) REFERENCES `user` (`u_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey1`
--

LOCK TABLES `survey1` WRITE;
/*!40000 ALTER TABLE `survey1` DISABLE KEYS */;
INSERT INTO `survey1` VALUES (1,'2022-04-06 10:12:10',0,0,0,'123123',0,0,3),(2,'2022-04-06 13:08:49',1,2,0,'단이의 향수',0,2,5),(10,'2022-04-07 01:15:50',0,1,0,'제목없음',0,1,6),(11,'2022-04-07 02:28:44',0,4,1,'22',0,3,8),(12,'2022-04-07 04:42:02',1,2,4,'제목없음',0,2,4),(13,'2022-04-07 04:52:14',0,0,0,'잭슨 생일',0,0,9),(14,'2022-04-07 04:54:19',0,0,0,'잭슨 생일',0,0,10),(15,'2022-04-07 04:55:08',0,0,0,'스칼렛 생일',0,0,10),(16,'2022-04-07 05:08:04',0,4,0,'jackson present',2,3,11),(17,'2022-04-07 05:27:34',1,1,0,'제목없음123',0,1,6),(18,'2022-04-07 05:47:00',0,0,0,'제목없음',0,0,11),(19,'2022-04-07 06:32:11',0,0,0,'.',0,0,4),(20,'2022-04-07 06:36:16',0,0,0,'제목없음',0,0,4),(21,'2022-04-07 08:33:41',0,3,0,'마 추천 한번 해바라',1,1,13),(22,'2022-04-07 08:42:51',0,0,0,'제목없음',2,0,14),(23,'2022-04-07 09:36:25',0,0,0,'제목없음',0,0,12),(24,'2022-04-07 10:05:50',0,0,0,'제목없음',0,0,5),(25,'2022-04-07 11:17:31',0,0,0,'제목없음',0,0,6),(26,'2022-04-07 11:22:50',1,3,0,'제목없음',1,1,12),(27,'2022-04-07 20:03:06',0,0,0,'제목없음',0,0,14),(28,'2022-04-07 21:18:16',1,3,0,'설문조사 1',0,2,5),(29,'2022-04-08 00:54:20',0,1,0,'제목없음',0,1,14),(30,'2022-04-08 00:57:09',0,0,0,'제목없음',0,0,16);
/*!40000 ALTER TABLE `survey1` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 10:13:38
