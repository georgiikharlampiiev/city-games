DROP DATABASE IF EXISTS `citygames`;
CREATE DATABASE IF NOT EXISTS `citygames`;
USE `citygames`;


-- Dumping structure for table citygames.game_user
DROP TABLE IF EXISTS `game_user`;
CREATE TABLE IF NOT EXISTS `game_user` (
  `id` bigint(20) unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(300) NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  `role_team_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `game_user_user_role_id_fk` (`role_id`),
  KEY `game_user_role_team__fk` (`role_team_id`),
  CONSTRAINT `game_user_role_team__fk` FOREIGN KEY (`role_team_id`) REFERENCES `role_team` (`id`),
  CONSTRAINT `game_user_user_role_id_fk` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`id`)
) DEFAULT CHARSET=utf8;

-- Dumping data for table citygames.game_user: ~2 rows (approximately)
INSERT INTO `game_user` (`id`, `name`, `password`, `role_id`, `role_team_id`) VALUES
	(1, 'admin', '$2a$10$EblZqNptyYvcLm/VwDCVAuBjzZOI7khzdyGPBr08PpIi0na624b8.', 1, 1),
	(2, 'user', '$2a$10$EblZqNptyYvcLm/VwDCVAuBjzZOI7khzdyGPBr08PpIi0na624b8.', 2, 2);



-- Dumping structure for table citygames.role_team
DROP TABLE IF EXISTS `role_team`;
CREATE TABLE IF NOT EXISTS `role_team` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

-- Dumping data for table citygames.role_team: ~2 rows (approximately)
INSERT INTO `role_team` (`id`, `name`) VALUES
	(1, 'ADMIN'),
	(2, 'PLAYER');


-- Dumping structure for table citygames.user_role
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) DEFAULT CHARSET=utf8;

-- Dumping data for table citygames.user_role: ~2 rows (approximately)
INSERT INTO `user_role` (`id`, `name`) VALUES
	(1, 'ADMIN'),
	(2, 'USER');