-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema islab_bookstore
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema islab_bookstore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `islab_bookstore` DEFAULT CHARACTER SET utf8 ;
USE `islab_bookstore` ;

-- -----------------------------------------------------
-- Table `islab_bookstore`.`t_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `islab_bookstore`.`t_user` (
  `user_id` VARCHAR(45) NOT NULL COMMENT '회원 고유번호\n',
  `user_pw` VARCHAR(45) NULL COMMENT '회원 비밀번호\n',
  `user_nm` VARCHAR(45) NULL COMMENT '회원 이름\n',
  `user_grade` VARCHAR(45) NULL COMMENT '회원 등급\n',
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `islab_bookstore`.`t_book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `islab_bookstore`.`t_book` (
  `book_id` INT NOT NULL COMMENT '도서 고유 번호\n',
  `book_title` VARCHAR(255) NULL COMMENT '도서명\n',
  `book_qty` INT NULL COMMENT '도서 재고량\n',
  `book_price` INT NULL COMMENT '도서 가격\n',
  `book_desc` TEXT NULL COMMENT '도서 설명\n',
  `book_img` VARCHAR(255) NULL COMMENT '도서 이미지\n',
  `book_col` VARCHAR(45) NULL COMMENT '도서 분류\n',
  PRIMARY KEY (`book_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `islab_bookstore`.`t_order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `islab_bookstore`.`t_order` (
  `order_id` INT NOT NULL COMMENT '주문 고유번호\n' AUTO_INCREMENT,
  `user_id` VARCHAR(45) NOT NULL COMMENT '회원 고유번호\n',
  `order_date` DATETIME NULL COMMENT '주문 일자\n',
  `order_total` INT NULL COMMENT '주문 총액\n',
  INDEX `fk_t_order_t_user_idx` (`user_id` ASC) VISIBLE,
  PRIMARY KEY (`order_id`),
  CONSTRAINT `fk_t_order_t_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `islab_bookstore`.`t_user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `islab_bookstore`.`t_card`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `islab_bookstore`.`t_card` (
  `card_id` VARCHAR(20) NOT NULL COMMENT '카드 고유번호\n',
  `user_id` VARCHAR(45) NOT NULL COMMENT '회원 고유번호\n',
  `card_date` VARCHAR(45) NULL COMMENT '카드 유효기간\n',
  `card_kind` VARCHAR(45) NULL COMMENT '카드 종류\n',
  PRIMARY KEY (`card_id`),
  INDEX `fk_t_card_t_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_t_card_t_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `islab_bookstore`.`t_user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `islab_bookstore`.`t_order_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `islab_bookstore`.`t_order_detail` (
  `book_id` INT NOT NULL COMMENT '도서 고유번호\n',
  `order_id` INT NOT NULL COMMENT '주문 고유번호\n',
  `order_qty` INT NULL COMMENT '물품 수량\n',
  PRIMARY KEY (`book_id`, `order_id`),
  INDEX `fk_t_book_has_t_order_t_order1_idx` (`order_id` ASC) VISIBLE,
  INDEX `fk_t_book_has_t_order_t_book1_idx` (`book_id` ASC) VISIBLE,
  CONSTRAINT `fk_t_book_has_t_order_t_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `islab_bookstore`.`t_book` (`book_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_book_has_t_order_t_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `islab_bookstore`.`t_order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `islab_bookstore`.`t_address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `islab_bookstore`.`t_address` (
  `address_id` VARCHAR(45) NOT NULL COMMENT '주소 고유번호\n',
  `user_id` VARCHAR(45) NOT NULL COMMENT '회원 고유번호\n',
  `adress_base` VARCHAR(255) NULL COMMENT '주소\n',
  `address_detail` VARCHAR(255) NULL COMMENT '상세주소\n',
  PRIMARY KEY (`address_id`, `user_id`),
  INDEX `fk_t_address_t_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_t_address_t_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `islab_bookstore`.`t_user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `islab_bookstore`.`t_cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `islab_bookstore`.`t_cart` (
  `cart_id` INT NOT NULL COMMENT '장바구니 고유번호\n',
  `user_id` VARCHAR(45) NOT NULL COMMENT '회원 고유번호\n',
  PRIMARY KEY (`cart_id`),
  INDEX `fk_t_cart_t_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_t_cart_t_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `islab_bookstore`.`t_user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `islab_bookstore`.`t_cart_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `islab_bookstore`.`t_cart_detail` (
  `cart_id` INT NOT NULL COMMENT '장바구니 고유번호\n',
  `book_id` INT NOT NULL COMMENT '도서 고유번호\n',
  `cart_qty` INT NULL COMMENT '물품 수량\n',
  PRIMARY KEY (`cart_id`, `book_id`),
  INDEX `fk_t_cart_has_t_book_t_book1_idx` (`book_id` ASC) VISIBLE,
  INDEX `fk_t_cart_has_t_book_t_cart1_idx` (`cart_id` ASC) VISIBLE,
  CONSTRAINT `fk_t_cart_has_t_book_t_cart1`
    FOREIGN KEY (`cart_id`)
    REFERENCES `islab_bookstore`.`t_cart` (`cart_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_cart_has_t_book_t_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `islab_bookstore`.`t_book` (`book_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;