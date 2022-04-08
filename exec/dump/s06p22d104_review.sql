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
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `p_id` bigint(20) NOT NULL,
  `u_seq` bigint(20) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `r_content` varchar(255) NOT NULL,
  `r_score` float NOT NULL,
  PRIMARY KEY (`p_id`,`u_seq`),
  KEY `FKqgjxu2rmokxx23jsajbot9dup` (`u_seq`),
  CONSTRAINT `FK9dn80uo3uidyviphs09uikuh` FOREIGN KEY (`p_id`) REFERENCES `perfume` (`p_id`),
  CONSTRAINT `FKqgjxu2rmokxx23jsajbot9dup` FOREIGN KEY (`u_seq`) REFERENCES `user` (`u_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,2,'2022-04-06 09:56:19','dfasdfasdfasdfasdf',5),(1,4,'2022-04-06 13:06:52','꼭 사고 싶어요',5),(2,4,'2022-04-06 13:06:14','\":)',5),(27,8,'2022-04-07 08:53:39','향수가 맛있어요',4),(30,16,'2022-04-08 00:54:40','향이 정말 여성스럽고, 과하게 달지 않으면서도 무겁지 않은 파우더리함이 실크 한 겹을 걸친 듯 부드러워서 데일리 향수',5),(182,16,'2022-04-08 01:00:53','달달하고 로맨틱한 향입니다.',4),(220,4,'2022-04-07 04:23:47','good ',4),(256,2,'2022-04-06 09:57:56','ue',5),(256,3,'2022-04-06 10:05:33','asdf',5),(256,4,'2022-04-06 13:05:21','Cool ',4),(260,2,'2022-04-07 08:38:55','dfasdfasdf',5),(260,4,'2022-04-06 13:08:11','좋아요',2),(260,6,'2022-04-07 08:40:26','여름이랑 잘 어울리는 향수입니다!',5),(260,12,'2022-04-08 01:07:20','ggg',5),(260,14,'2022-04-07 08:39:11','ddf',5),(293,16,'2022-04-08 01:07:11','자신감 있지만 섬세한 남성의 향.\n배의 상큼함으로 시작해 카더멈과 라벤더로\n부드럽게 감싸져 스파이시한 우아함을 줍니다.',4),(490,4,'2022-04-07 04:22:37','good ',5),(491,4,'2022-04-07 04:22:05','요즘 계절에 딱 어울려요 >< ',4),(492,4,'2022-04-07 04:22:50','i love it',2),(503,4,'2022-04-07 04:23:38','dance',4),(504,4,'2022-04-07 04:24:04','요정이 된 것 같아요',3),(504,14,'2022-04-07 08:37:49','bbbbbbbbbbbbbbbbbbbb',5),(512,2,'2022-04-07 08:38:42','dfasdf',5),(512,5,'2022-04-06 13:06:33','냄새 너무 좋아요ㅎㅎ',5),(512,12,'2022-04-07 08:40:35','goodddd',4),(513,2,'2022-04-07 02:07:57','굿 굿 굿 굿 굿 굿 굿 굿',5),(513,3,'2022-04-06 10:05:59','1111111111111111',5),(513,4,'2022-04-06 13:07:02','별로예요...내 마음의 별로 ❤',5),(513,11,'2022-04-07 05:05:51','good~!!!',4),(516,6,'2022-04-07 09:26:09','쏘쏘',2),(516,12,'2022-04-07 11:21:41','good!!!',3),(768,3,'2022-04-06 10:05:49','asdf',5),(768,12,'2022-04-07 08:40:54','gggzzzz',3),(770,12,'2022-04-07 08:39:41','ㅎㅎㅎㅎ',5),(877,8,'2022-04-07 11:41:09','그린티와 메디테리언 스파이스가 블랜딩되어 이국적이고 독특한 향취를 나타내며 지속성이 우수한 시트러스 계열향수',4),(1024,4,'2022-04-06 13:07:45',':) ',1),(1024,6,'2022-04-07 11:24:25',':)',4),(1025,2,'2022-04-07 08:39:19','dfasdf',5),(1025,4,'2022-04-06 13:08:45','모든 사람에게, 모든 상황에, 모든 무드에 어울린다니 신기하네요.\n꼭 향기를 맡아보고 싶어요',2),(1026,8,'2022-04-06 17:31:06','어디든 잘 어울리는 만능 향수입니다~',5),(1035,12,'2022-04-07 08:41:30','ffff',5),(1037,6,'2022-04-07 11:22:09','향이 진해서 좋아요',4),(1037,12,'2022-04-07 11:22:25','good!!!',3),(1077,8,'2022-04-07 08:43:38','담배가 향수아니야?',1);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
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
