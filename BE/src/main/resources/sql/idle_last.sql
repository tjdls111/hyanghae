-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema s06p22d104
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema s06p22d104
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `s06p22d104` DEFAULT CHARACTER SET utf8 ;
USE `s06p22d104` ;

-- -----------------------------------------------------
-- Table `s06p22d104`.`brand`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s06p22d104`.`brand` (
  `b_name` VARCHAR(255) NOT NULL,
  `kor_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`b_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `s06p22d104`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s06p22d104`.`user` (
  `u_seq` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `create_date` DATETIME(6) NULL DEFAULT NULL,
  `u_email` VARCHAR(255) NOT NULL,
  `u_id` VARCHAR(255) NULL DEFAULT NULL,
  `u_nickname` VARCHAR(255) NOT NULL,
  `u_pw` VARCHAR(255) NOT NULL,
  `u_type` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`u_seq`),
  UNIQUE INDEX `UK_eltbn9tkept140ug95ymg61ad` (`u_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `s06p22d104`.`perfume`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s06p22d104`.`perfume` (
  `p_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `gender` INT(11) NOT NULL,
  `p_group` VARCHAR(255) NOT NULL,
  `p_url` VARCHAR(255) NOT NULL,
  `like_cnt` INT(11) NOT NULL,
  `mood` INT(11) NOT NULL,
  `note1` VARCHAR(255) NOT NULL,
  `note2` VARCHAR(255) NOT NULL,
  `note3` VARCHAR(255) NOT NULL,
  `p_name` VARCHAR(255) NOT NULL,
  `p_score` FLOAT NOT NULL,
  `review_cnt` INT(11) NOT NULL,
  `season` INT(11) NOT NULL,
  `time` INT(11) NOT NULL,
  `tpo` INT(11) NOT NULL,
  `p_brand` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`p_id`),
  INDEX `FKjt7b462bo4533ioffeeodp6lj` (`p_brand` ASC) VISIBLE,
  CONSTRAINT `FKjt7b462bo4533ioffeeodp6lj`
    FOREIGN KEY (`p_brand`)
    REFERENCES `s06p22d104`.`brand` (`b_name`))
ENGINE = InnoDB
AUTO_INCREMENT = 1112
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `s06p22d104`.`likeperfume`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s06p22d104`.`likeperfume` (
  `p_id` BIGINT(20) NOT NULL,
  `u_seq` BIGINT(20) NOT NULL,
  PRIMARY KEY (`p_id`, `u_seq`),
  INDEX `FK2quur8ob2a4ylw0agipoi7v18` (`u_seq` ASC) VISIBLE,
  CONSTRAINT `FK2quur8ob2a4ylw0agipoi7v18`
    FOREIGN KEY (`u_seq`)
    REFERENCES `s06p22d104`.`user` (`u_seq`),
  CONSTRAINT `FKde2qy49knpi9ee2cktqf9lfri`
    FOREIGN KEY (`p_id`)
    REFERENCES `s06p22d104`.`perfume` (`p_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `s06p22d104`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s06p22d104`.`review` (
  `p_id` BIGINT(20) NOT NULL,
  `u_seq` BIGINT(20) NOT NULL,
  `create_date` DATETIME(6) NULL DEFAULT NULL,
  `r_content` VARCHAR(255) NOT NULL,
  `r_score` FLOAT NOT NULL,
  PRIMARY KEY (`p_id`, `u_seq`),
  INDEX `FKqgjxu2rmokxx23jsajbot9dup` (`u_seq` ASC) VISIBLE,
  CONSTRAINT `FK9dn80uo3uidyviphs09uikuh`
    FOREIGN KEY (`p_id`)
    REFERENCES `s06p22d104`.`perfume` (`p_id`),
  CONSTRAINT `FKqgjxu2rmokxx23jsajbot9dup`
    FOREIGN KEY (`u_seq`)
    REFERENCES `s06p22d104`.`user` (`u_seq`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `s06p22d104`.`style`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s06p22d104`.`style` (
  `st_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `gender` INT(11) NOT NULL,
  `mood` INT(11) NOT NULL,
  `season` INT(11) NOT NULL,
  `time` INT(11) NOT NULL,
  `tpo` INT(11) NOT NULL,
  PRIMARY KEY (`st_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `s06p22d104`.`survey1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s06p22d104`.`survey1` (
  `s_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `create_date` DATETIME(6) NULL DEFAULT NULL,
  `gender` INT(11) NOT NULL,
  `mood` INT(11) NOT NULL,
  `season` INT(11) NOT NULL,
  `s_title` VARCHAR(255) NOT NULL,
  `time` INT(11) NOT NULL,
  `tpo` INT(11) NOT NULL,
  `u_seq` BIGINT(20) NOT NULL,
  PRIMARY KEY (`s_id`),
  INDEX `FKcm261e432ybugjwe3dn1di299` (`u_seq` ASC) VISIBLE,
  CONSTRAINT `FKcm261e432ybugjwe3dn1di299`
    FOREIGN KEY (`u_seq`)
    REFERENCES `s06p22d104`.`user` (`u_seq`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `s06p22d104`.`survey2`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s06p22d104`.`survey2` (
  `s_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `create_date` DATETIME(6) NULL DEFAULT NULL,
  `s_title` VARCHAR(255) NOT NULL,
  `p_id` BIGINT(20) NOT NULL,
  `u_seq` BIGINT(20) NOT NULL,
  PRIMARY KEY (`s_id`),
  INDEX `FK3ukuj30kq1s68x57106ys3091` (`p_id` ASC) VISIBLE,
  INDEX `FKt7qs2dvkd3jrg8xhmyo39mpht` (`u_seq` ASC) VISIBLE,
  CONSTRAINT `FK3ukuj30kq1s68x57106ys3091`
    FOREIGN KEY (`p_id`)
    REFERENCES `s06p22d104`.`perfume` (`p_id`),
  CONSTRAINT `FKt7qs2dvkd3jrg8xhmyo39mpht`
    FOREIGN KEY (`u_seq`)
    REFERENCES `s06p22d104`.`user` (`u_seq`))
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `s06p22d104`.`survey3`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `s06p22d104`.`survey3` (
  `s_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `create_date` DATETIME(6) NULL DEFAULT NULL,
  `c_url` VARCHAR(255) NOT NULL,
  `s_title` VARCHAR(255) NOT NULL,
  `st_id` BIGINT(20) NOT NULL,
  `u_seq` BIGINT(20) NOT NULL,
  PRIMARY KEY (`s_id`),
  INDEX `FKcq5st6oe93qqroax0nyru8drr` (`st_id` ASC) VISIBLE,
  INDEX `FKsxr097bcvp1ovmhclhu1j0l68` (`u_seq` ASC) VISIBLE,
  CONSTRAINT `FKcq5st6oe93qqroax0nyru8drr`
    FOREIGN KEY (`st_id`)
    REFERENCES `s06p22d104`.`style` (`st_id`),
  CONSTRAINT `FKsxr097bcvp1ovmhclhu1j0l68`
    FOREIGN KEY (`u_seq`)
    REFERENCES `s06p22d104`.`user` (`u_seq`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;