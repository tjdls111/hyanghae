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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `u_seq` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `u_email` varchar(255) NOT NULL,
  `u_id` varchar(255) DEFAULT NULL,
  `u_nickname` varchar(255) NOT NULL,
  `u_pw` varchar(255) NOT NULL,
  `u_type` varchar(255) NOT NULL,
  PRIMARY KEY (`u_seq`),
  UNIQUE KEY `UK_eltbn9tkept140ug95ymg61ad` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2022-04-06 08:25:32','getbra1n777@gmail.com','getbra1n777@gmail.com','문관필','social','social'),(2,'2022-04-06 09:54:44','pcg0537@gmail.com','pcg0537@gmail.com','박창건','social','social'),(3,'2022-04-06 10:05:19','pcg0527@naver.com','changchang','스칼렛','$2a$10$2R2iVr5UcJplSakyT8eqqeVQCD3VWGIXixVSzflzeAzpZH0d2k0Jq','local'),(4,'2022-04-06 13:03:30','seoin1222@gmail.com','seoin1222@gmail.com','[구미_1반_김서인]','social','social'),(5,'2022-04-06 13:04:08','ekdms42132@gmail.com','ekdms42132@gmail.com','pre pare','social','social'),(6,'2022-04-06 13:07:39','wnsd2494@naver.com','wnsdl2494','기믄준','$2a$10$T0steqH2cisEM7fWmBkxieoDwv4oCnmEMldJafHoziYTVwO8HMck.','local'),(7,'2022-04-06 13:18:50','rnsqka9924@gmail.com','rnsqka9924@gmail.com','김영훈','social','social'),(8,'2022-04-06 17:28:41','wnsdl2494@gmail.com','wnsdl2494@gmail.com','김은준','social','social'),(9,'2022-04-07 04:51:41','tjdls111@naver.com','seoin123','seoin','$2a$10$u9b4kcfxup1ocD8FG8MdhOYEee2WeJ.Cc2F.QfxWmrvDkgvPptz5a','local'),(10,'2022-04-07 04:54:04','tjdls111@naver.com','seoin321','서이니','$2a$10$ZifhyyENOhbvWtupg0YgIuv3PaK8Qt/VOaqu4gWc9mTIUgfgPXYLy','local'),(11,'2022-04-07 05:00:46','tjdls111@naver.com','seoin111','seoseo','$2a$10$BsXaQ3VHDzqh9J/df57m4.vhV0YfEYF9MAmeqvQyHlXXa5c8mal6W','local'),(12,'2022-04-07 05:50:39','tjdls111@naver.com','seoin222','seoinnu','$2a$10$NwxXgqDh2Dr5Kve8bbAthuO15RNWo0xqXzNGmJrOJyFSyxFZhRUtG','local'),(13,'2022-04-07 08:32:50','qres3408@gmail.com','qres3408@gmail.com','조준영','social','social'),(14,'2022-04-07 08:37:41','now20412041@gmail.com','now20412041@gmail.com','Kim Jio','social','social'),(15,'2022-04-07 21:03:10','ekdms4213@naver.com','alice123','단짱','$2a$10$gqE4l3.pYjcnBYsN8LSRRu7bgIqu4.CDVn9HW1Twd1inOHB0iRdM.','local'),(16,'2022-04-08 00:42:48','wnsdl2494@gmail.com','i3onnuri','Basenote','$2a$10$kV0OhQ7gx4uqYjnGUjkkNuf01Jhfi9LKkZ2BZGBWT4RwHu1QEwIiO','local');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
