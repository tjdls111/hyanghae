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
-- Table structure for table `survey3`
--

DROP TABLE IF EXISTS `survey3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `survey3` (
  `s_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `c_url` varchar(255) NOT NULL,
  `s_title` varchar(255) NOT NULL,
  `st_id` bigint(20) NOT NULL,
  `u_seq` bigint(20) NOT NULL,
  PRIMARY KEY (`s_id`),
  KEY `FKcq5st6oe93qqroax0nyru8drr` (`st_id`),
  KEY `FKsxr097bcvp1ovmhclhu1j0l68` (`u_seq`),
  CONSTRAINT `FKcq5st6oe93qqroax0nyru8drr` FOREIGN KEY (`st_id`) REFERENCES `style` (`st_id`),
  CONSTRAINT `FKsxr097bcvp1ovmhclhu1j0l68` FOREIGN KEY (`u_seq`) REFERENCES `user` (`u_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey3`
--

LOCK TABLES `survey3` WRITE;
/*!40000 ALTER TABLE `survey3` DISABLE KEYS */;
INSERT INTO `survey3` VALUES (1,'2022-04-07 09:25:37','\"https://firebasestorage.googleapis.com/v0/b/hyang-b007d.appspot.com/o/images%2Fffffff.png?alt=media&token=167eddf4-25ac-468f-ac34-51d94698755e\"','\"제목없음\"',5,6),(2,'2022-04-07 09:39:45','\"https://firebasestorage.googleapis.com/v0/b/hyang-b007d.appspot.com/o/images%2Fimages.png?alt=media&token=51109aac-d97b-4462-baae-50ea3e98ce53\"','\"제목없음\"',8,5),(3,'2022-04-07 11:17:47','\"https://firebasestorage.googleapis.com/v0/b/hyang-b007d.appspot.com/o/images%2Fffffff.png?alt=media&token=c7e1064c-b5ca-4b8f-9ad7-b26af012b1e5\"','\"제목없음\"',10,6),(4,'2022-04-07 20:02:40','\"https://firebasestorage.googleapis.com/v0/b/hyang-b007d.appspot.com/o/images%2Fboard%20%ED%8E%98%EC%9D%B4%EC%A7%80.png?alt=media&token=63667c05-157b-4bdf-82b2-cc78f2763fae\"','\"제목없음\"',7,14),(5,'2022-04-08 00:56:42','\"https://firebasestorage.googleapis.com/v0/b/hyang-b007d.appspot.com/o/images%2F%EC%9A%B0%EC%A3%BC.jpg?alt=media&token=1d1ee959-681f-41c6-ac2d-13ec429d46e0\"','\"제목없음\"',1,14),(6,'2022-04-08 00:58:03','\"https://firebasestorage.googleapis.com/v0/b/hyang-b007d.appspot.com/o/images%2Fffffff.png?alt=media&token=7616f4a2-11b9-4716-90d8-a7f9a382e15d\"','\"제목없음4\"',12,16);
/*!40000 ALTER TABLE `survey3` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 10:13:37
